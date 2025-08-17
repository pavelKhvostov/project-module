import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import axios from 'axios';
import Application from './Application';
import { getStore } from '@/redux/store/store';
import { setScoringResult } from '@/redux/slices/scoringSlice';

vi.mock('axios');
const mockedAxios = axios as unknown as jest.Mocked<typeof axios>;

const renderApplication = () => {
  const store = getStore();

  const utils = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/loan/123']}>
        <Routes>
          <Route path='/loan/:applicationId' element={<Application />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  return { store, ...utils };
};

describe('Компонент Application', () => {
  beforeEach(() => {
    localStorage.setItem(
      'reduxState__123',
      JSON.stringify({
        application: {
          status: 'OFFER_SELECTED',
          applicationId: 123,
        },
        scoring: {
          result: {
            client: { birthdate: '2000-01-01' },
          },
        },
      }),
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('отображает все поля формы', () => {
    renderApplication();

    const normalFields = [
      { label: /What's your gender/i, id: 'gender' },
      { label: /Your marital status/i, id: 'maritalStatus' },
      { label: /Your number of dependents/i, id: 'dependentAmount' },
      { label: /Division code/i, id: 'passportIssueBranch' },
      { label: /Your employment status/i, id: 'employmentStatus' },
      { label: /Your employer INN/i, id: 'employerINN' },
      { label: /Your salary/i, id: 'salary' },
      { label: /Your position/i, id: 'position' },
      { label: /Your work experience total/i, id: 'workExperienceTotal' },
      { label: /Your work experience current/i, id: 'workExperienceCurrent' },
    ];

    normalFields.forEach(({ label, id }) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
      expect(screen.getByLabelText(label)).toHaveAttribute('id', id);
    });

    const dateLabel = screen.getByText(/Date of issue of the passport/i);
    const dateInput = dateLabel.closest('.application__field')?.querySelector('input');
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute('name', 'passportIssueDate');
  });

  it('показывает ошибки при отправке пустой формы', async () => {
    renderApplication();

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      const selectErrors = screen.getAllByText(/Select one of the options/i);
      expect(selectErrors.length).toBeGreaterThan(4);

      expect(screen.getByText(/Enter your salary/i)).toBeInTheDocument();
      expect(screen.getByText(/Enter your work experience total/i)).toBeInTheDocument();
      expect(screen.getByText(/Enter your work experience current/i)).toBeInTheDocument();
      expect(screen.getByText(/Department code must be 12 digits/i)).toBeInTheDocument();

      expect(screen.getByText(/Incorrect date of passport issue date/i)).toBeInTheDocument();
      expect(screen.getByText(/The series must be 6 digits/i)).toBeInTheDocument();
    });
  });

  it('отправляет форму и показывает сообщение при APPROVED', async () => {
    mockedAxios.put.mockResolvedValue({ data: {} });

    mockedAxios.get.mockImplementation(async () => {
      localStorage.setItem(
        'reduxState__123',
        JSON.stringify({
          application: { status: 'APPROVED', applicationId: 123 },
          scoring: { result: { client: { birthdate: '2000-01-01' } } },
        }),
      );
      return { data: { status: 'APPROVED' } };
    });

    const { store } = renderApplication();

    store.dispatch(setScoringResult({ client: { birthdate: '2000-01-01' } } as any));

    fireEvent.change(screen.getByLabelText(/What's your gender/i), { target: { value: 'MALE' } });
    fireEvent.change(screen.getByLabelText(/Your marital status/i), {
      target: { value: 'SINGLE' },
    });
    fireEvent.change(screen.getByLabelText(/Your number of dependents/i), {
      target: { value: '1' },
    });

    const dateLabel = screen.getByText(/Date of issue of the passport/i);
    const dateInput = dateLabel
      .closest('.application__field')!
      .querySelector('input[name="passportIssueDate"]') as HTMLInputElement;
    fireEvent.focus(dateInput);
    fireEvent.change(dateInput, { target: { value: '2020-01-01' } });

    fireEvent.change(screen.getByLabelText(/Division code/i), { target: { value: '123-456' } });
    fireEvent.change(screen.getByLabelText(/Your employment status/i), {
      target: { value: 'EMPLOYED' },
    });
    fireEvent.change(screen.getByLabelText(/Your employer INN/i), {
      target: { value: '123456789012' },
    });
    fireEvent.change(screen.getByLabelText(/Your salary/i), { target: { value: '150000' } });
    fireEvent.change(screen.getByLabelText(/Your position/i), { target: { value: 'TOP_MANAGER' } });
    fireEvent.change(screen.getByLabelText(/Your work experience total/i), {
      target: { value: '5' },
    });
    fireEvent.change(screen.getByLabelText(/Your work experience current/i), {
      target: { value: '2' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => expect(mockedAxios.put).toHaveBeenCalled());
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalled());

    await waitFor(() => {
      expect(store.getState().application.status).toBe('APPROVED');
    });

    expect(await screen.findByText(/Wait for a decision on the application/i)).toBeInTheDocument();
  });
});
