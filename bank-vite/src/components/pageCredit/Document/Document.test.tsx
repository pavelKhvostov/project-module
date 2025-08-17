import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Document from './Document';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

vi.mock('axios');

describe('Компонент Document', () => {
  const mockPaymentSchedule = [
    {
      number: 1,
      date: '2025-09-08',
      totalPayment: 29248.34,
      interestPayment: 1558.34,
      debtPayment: 27690,
      remainingDebt: 142310,
    },
    {
      number: 2,
      date: '2025-10-08',
      totalPayment: 29248.34,
      interestPayment: 1304.51,
      debtPayment: 27943.83,
      remainingDebt: 114366.17,
    },
  ];

  const mockState = {
    application: {
      status: 'APPROVED',
    },
    scoring: {
      result: {
        credit: {
          paymentSchedule: mockPaymentSchedule,
        },
      },
    },
  };

  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'reduxState__123') return JSON.stringify(mockState);
      if (key === 'SelectedAppIds') return JSON.stringify([123, 456]);
      return null;
    });

    vi.spyOn(Storage.prototype, 'removeItem');
    vi.spyOn(Storage.prototype, 'setItem');

    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useParams: () => ({ applicationId: '123' }),
        Navigate: ({ to }: { to: string }) => <div>Перенаправлено на {to}</div>,
        useNavigate: () => vi.fn(),
      };
    });

    (axios.post as jest.Mock).mockResolvedValue({ status: 200 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('должен отображать таблицу платежного графика при наличии данных', async () => {
    render(
      <BrowserRouter>
        <Document />
      </BrowserRouter>,
    );

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(6);
    expect(headers[0]).toHaveTextContent('Number');
    expect(headers[1]).toHaveTextContent('Date');
    expect(headers[2]).toHaveTextContent('Total payment');
    expect(headers[3]).toHaveTextContent('Interest payment');
    expect(headers[4]).toHaveTextContent('Debt payment');
    expect(headers[5]).toHaveTextContent('Remaining debt');

    const rows = screen.getAllByRole('row').slice(1);
    expect(rows).toHaveLength(mockPaymentSchedule.length);

    const firstRow = rows[0];
    const firstCells = within(firstRow).getAllByRole('cell');
    expect(firstCells[0]).toHaveTextContent('1');
    expect(firstCells[1]).toHaveTextContent(new Date('2025-09-08').toLocaleDateString());
    expect(firstCells[2]).toHaveTextContent('29248.34');
    expect(firstCells[3]).toHaveTextContent('1558.34');
    expect(firstCells[4]).toHaveTextContent('27690.00');
    expect(firstCells[5]).toHaveTextContent('142310.00');

    const secondRow = rows[1];
    const secondCells = within(secondRow).getAllByRole('cell');
    expect(secondCells[0]).toHaveTextContent('2');
    expect(secondCells[1]).toHaveTextContent(new Date('2025-10-08').toLocaleDateString());
    expect(secondCells[2]).toHaveTextContent('29248.34');
    expect(secondCells[3]).toHaveTextContent('1304.51');
    expect(secondCells[4]).toHaveTextContent('27943.83');
    expect(secondCells[5]).toHaveTextContent('114366.17');
  });

  it('должен открывать модальное окно при клике на кнопку Deny', async () => {
    render(
      <BrowserRouter>
        <Document />
      </BrowserRouter>,
    );

    const denyButton = screen.getByText('Deny');

    expect(screen.queryByTestId('deny-modal')).toBeNull();

    fireEvent.click(denyButton);

    const modal = await screen.findByTestId('deny-modal');
    expect(modal).toBeInTheDocument();

    expect(
      within(modal).getByText(/You exactly sure, you want to cancel this application?/i),
    ).toBeInTheDocument();
    expect(within(modal).getByText('Deny')).toBeInTheDocument();
    expect(within(modal).getByText('Cancel')).toBeInTheDocument();
  });
  it('модальное окно закрываеться при нажатии на Cancel', async () => {
    render(
      <BrowserRouter>
        <Document />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText('Deny'));
    await screen.findByTestId('deny-modal');

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByTestId('deny-modal')).not.toBeInTheDocument();

    expect(localStorage.getItem('reduxState__123')).not.toBeNull();
  });
  it('модальное окно закрываеться при нажатии на крестик', async () => {
    render(
      <BrowserRouter>
        <Document />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText('Deny'));
    await screen.findByTestId('deny-modal');

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('deny-modal')).not.toBeInTheDocument();

    expect(localStorage.getItem('reduxState__123')).not.toBeNull();
  });
  it('выполняет все шаги при отказе от заявки', async () => {
    (axios.post as jest.Mock).mockClear();
    (axios.post as jest.Mock).mockResolvedValueOnce({ status: 200 });

    render(
      <BrowserRouter>
        <Document />
      </BrowserRouter>,
    );

    const denyButton = screen.getByText('Deny');
    fireEvent.click(denyButton);

    const modal = await screen.findByTestId('deny-modal');
    expect(modal).toBeInTheDocument();

    const confirmButton = within(modal).getByText('Deny', { selector: '.modal__btn--deny' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText('Your application has been deny!')).toBeInTheDocument();
    });

    const goHomeButton = screen.getByText('Go home');
    fireEvent.click(goHomeButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/application/123/deny');
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith('reduxState__123');
    expect(localStorage.setItem).toHaveBeenCalledWith('SelectedAppIds', JSON.stringify([456]));
  });
  it('кнопка Send должна быть заблокирована, когда чекбокс не отмечен', async () => {
    render(
      <BrowserRouter>
        <Document />
      </BrowserRouter>,
    );

    const sendButton = screen.getByText('Send');
    expect(sendButton).toBeDisabled();

    const checkbox = screen.getByLabelText('I agree with the payment schedule');
    expect(checkbox).not.toBeChecked();
  });

  it('кнопка Send должна разблокироваться при отметке чекбокса', async () => {
    render(
      <BrowserRouter>
        <Document />
      </BrowserRouter>,
    );

    const checkbox = screen.getByLabelText('I agree with the payment schedule');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
      const sendButton = screen.getByText('Send');
      expect(sendButton).not.toBeDisabled();
    });
  });

  it('кнопка Send должна блокироваться при снятии отметки с чекбокса', async () => {
    render(
      <BrowserRouter>
        <Document />
      </BrowserRouter>,
    );

    const checkbox = screen.getByLabelText('I agree with the payment schedule');

    fireEvent.click(checkbox);
    await waitFor(() => expect(checkbox).toBeChecked());

    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
      const sendButton = screen.getByText('Send');
      expect(sendButton).toBeDisabled();
    });
  });
  it('при активации чекбокса и нажатии на Send показывает сообщение и меняет статус на DOCS_FORMED', async () => {
    render(
      <BrowserRouter>
        <Document />
      </BrowserRouter>,
    );

    expect(screen.queryByText('Documents are formed')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Documents for signing will be sent to your email'),
    ).not.toBeInTheDocument();

    const checkbox = screen.getByLabelText('I agree with the payment schedule');
    const sendButton = screen.getByText('Send');

    expect(checkbox).not.toBeChecked();
    expect(sendButton).toBeDisabled();

    fireEvent.click(checkbox);
    await waitFor(() => expect(checkbox).toBeChecked());
    expect(sendButton).not.toBeDisabled();

    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`http://localhost:8080/document/123`);
    });

    await waitFor(() => {
      expect(screen.getByText('Documents are formed')).toBeInTheDocument();
      expect(
        screen.getByText('Documents for signing will be sent to your email'),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'reduxState__123',
        expect.stringContaining('"status":"DOCS_FORMED"'),
      );
    });
  });
});
