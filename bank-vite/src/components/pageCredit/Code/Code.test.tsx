import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { vi } from 'vitest';
import Code from './Code';
import { getStore, store } from '@/redux/store/store';

vi.mock('axios');
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useParams: vi.fn().mockReturnValue({ applicationId: '123' }),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Компонент Code', () => {
  const storeTest = getStore();

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('должен отображать поля для ввода кода при статусе SIGN_PENDING', () => {
    localStorage.setItem(
      `reduxState__123`,
      JSON.stringify({
        application: { status: 'SIGN_PENDING' },
      }),
    );

    render(
      <Provider store={storeTest}>
        <BrowserRouter>
          <Code />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Please enter confirmation code')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });

  it('должен показывать ошибку при неверном коде', async () => {
    localStorage.setItem(
      `reduxState__123`,
      JSON.stringify({
        application: { status: 'SIGN_PENDING' },
      }),
    );

    mockedAxios.post.mockRejectedValueOnce(new Error('Invalid code'));

    render(
      <Provider store={storeTest}>
        <BrowserRouter>
          <Code />
        </BrowserRouter>
      </Provider>,
    );

    const inputs = screen.getAllByRole('textbox');

    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: (index + 1).toString() } });
    });

    await waitFor(() => {
      expect(screen.getByText('Invalid confirmation code')).toBeInTheDocument();
    });
  });

  it('должен показывать COMPLETED при успешном вводе кода', async () => {
    const correctCode = '1234';
    localStorage.setItem(
      `reduxState__123`,
      JSON.stringify({
        application: { status: 'SIGN_PENDING' },
      }),
    );

    mockedAxios.post.mockImplementationOnce((url, code) => {
      expect(code).toBe(Number(correctCode));
      return Promise.resolve({});
    });

    render(
      <Provider store={storeTest}>
        <BrowserRouter>
          <Code />
        </BrowserRouter>
      </Provider>,
    );

    const inputs = screen.getAllByRole('textbox');

    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: correctCode[index] } });
    });

    await waitFor(() => {
      const storedData = localStorage.getItem('reduxState__123');
      expect(storedData).toBeDefined();

      if (storedData) {
        const state = JSON.parse(storedData);
        expect(state.application.status).toBe('COMPLETED');
      }

      expect(mockedAxios.post).toHaveBeenCalledTimes(1);

      expect(
        screen.getByText('Congratulations! You have completed your new credit card.'),
      ).toBeInTheDocument();
    });
  });
});
