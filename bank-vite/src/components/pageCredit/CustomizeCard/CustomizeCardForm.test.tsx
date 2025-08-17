import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CustomizeCardForm from './CastomizeCardForm';
import { Provider } from 'react-redux';
import { getStore } from '@/redux/store/store';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>;
};

describe('CustomizeCardForm — Prescoring', () => {
  it('рендерит форму и все поля', () => {
    const storeTest = getStore();

    render(
      <Provider store={storeTest}>
        <CustomizeCardForm />
      </Provider>,
    );

    expect(screen.getByLabelText(/Your last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your patronymic/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select term/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your passport series/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your passport number/i)).toBeInTheDocument();
  });

  it('показывает ошибки при сабмите пустой формы', async () => {
    const storeTest = getStore();

    render(
      <Provider store={storeTest}>
        <CustomizeCardForm />
      </Provider>,
    );

    const submitButton = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Enter your last name/i)).toBeInTheDocument();
    expect(await screen.findByText(/Enter your first name/i)).toBeInTheDocument();
    expect(await screen.findByText(/Incorrect email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Incorrect date of birth/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/The series must be/i)).toHaveLength(2);
  });

  it('рендерит офферы после успешной отправки формы', async () => {
    const mockOffers = [
      {
        applicationId: 129,
        isInsuranceEnabled: false,
        isSalaryClient: false,
        monthlyPayment: 9357.65,
        rate: 15,
        requestedAmount: 150000,
        term: 18,
        totalAmount: 150000,
      },
    ];

    mockedAxios.post.mockResolvedValueOnce({ data: mockOffers });

    const storeTest = getStore();

    render(
      <Provider store={storeTest}>
        <CustomizeCardForm />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText(/Your last name/i), {
      target: { value: 'ivanov' },
    });
    fireEvent.change(screen.getByLabelText(/Your first name/i), {
      target: { value: 'ivan' },
    });
    fireEvent.change(screen.getByLabelText(/Your email/i), {
      target: { value: 'ivan@iv.ru' },
    });
    fireEvent.change(screen.getByLabelText(/Your date of birth/i), {
      target: { value: '1990-01-01' },
    });
    fireEvent.change(screen.getByLabelText(/Your passport series/i), {
      target: { value: '1234' },
    });
    fireEvent.change(screen.getByLabelText(/Select term/i), {
      target: { value: '18' },
    });
    fireEvent.change(screen.getByLabelText(/Your passport number/i), {
      target: { value: '123456' },
    });

    const submitButton = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('offers-container')).toBeInTheDocument();
    });
  });

  it('отображает Success после выбора оффера', async () => {
    const mockOffers = [
      {
        applicationId: 129,
        isInsuranceEnabled: false,
        isSalaryClient: false,
        monthlyPayment: 9357.65,
        rate: 15,
        requestedAmount: 150000,
        term: 18,
        totalAmount: 150000,
      },
    ];

    mockedAxios.post.mockResolvedValueOnce({ data: mockOffers });

    mockedAxios.post.mockResolvedValueOnce({});

    const storeTest = getStore();

    render(
      <Provider store={storeTest}>
        <CustomizeCardForm />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText(/Your last name/i), {
      target: { value: 'Ivanov' },
    });
    fireEvent.change(screen.getByLabelText(/Your first name/i), {
      target: { value: 'Ivan' },
    });
    fireEvent.change(screen.getByLabelText(/Your email/i), {
      target: { value: 'ivan@iv.ru' },
    });
    fireEvent.change(screen.getByLabelText(/Your date of birth/i), {
      target: { value: '1990-01-01' },
    });
    fireEvent.change(screen.getByLabelText(/Your passport series/i), {
      target: { value: '1234' },
    });
    fireEvent.change(screen.getByLabelText(/Select term/i), {
      target: { value: '18' },
    });
    fireEvent.change(screen.getByLabelText(/Your passport number/i), {
      target: { value: '123456' },
    });

    const submitButton = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(submitButton);

    const selectButton = await screen.findByRole('button', { name: /select/i });
    expect(screen.getByTestId('offers-container')).toBeInTheDocument();

    fireEvent.click(selectButton);

    await waitFor(() => {
      expect(
        screen.getByText(/The preliminary decision has been sent to your email/i),
      ).toBeInTheDocument();
    });

    expect(screen.queryByTestId('offers-container')).not.toBeInTheDocument();
  });
});
