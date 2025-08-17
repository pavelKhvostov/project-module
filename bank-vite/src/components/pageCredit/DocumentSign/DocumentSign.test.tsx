import { render, screen, waitFor } from '@testing-library/react';
import DocumentSign from './DocumentSign';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

vi.mock('@/assets/pdf/credit-card-offer.pdf', () => ({
  default: 'mock-pdf-url',
}));

vi.mock('react-router-dom', () => ({
  useParams: () => ({ applicationId: '123' }),
  Navigate: () => null,
}));

describe('Компонент DocumentSign', () => {
  beforeEach(() => {
    localStorage.setItem(
      'reduxState__123',
      JSON.stringify({
        application: {
          status: 'DOCS_FORMED',
        },
      }),
    );

    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useParams: () => ({ applicationId: '123' }),
        Navigate: ({ to }: { to: string }) => <div>Перенаправлено на {to}</div>,
        useNavigate: () => vi.fn(),
      };
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('должен отображать текст документа и кнопку скачивания', () => {
    render(
      <BrowserRouter>
        <DocumentSign />
      </BrowserRouter>,
    );

    expect(screen.getByText('Signing of documents')).toBeInTheDocument();

    const textContent = [
      'Information on interest rates',
      'Center for Corporate Information Disclosure',
      'policy regarding the processing of personal data',
    ];

    textContent.forEach((text) => {
      expect(screen.getByText(new RegExp(text, 'i'))).toBeInTheDocument();
    });

    const downloadButton = screen.getByRole('button', { name: /Information on your card/i });
    expect(downloadButton).toBeInTheDocument();

    expect(downloadButton.querySelector('img')).toHaveAttribute('alt', 'иконка файла');
  });

  it('должен скачивать файл при клике на кнопку', async () => {
    const mockClick = vi.fn();

    const originalCreateElement = document.createElement;

    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        const a = originalCreateElement.call(document, 'a');
        a.click = mockClick;

        Object.defineProperty(a, 'href', {
          value: 'mock-pdf-url',
          writable: true,
        });
        return a;
      }
      return originalCreateElement.call(document, tagName);
    });

    render(
      <BrowserRouter>
        <DocumentSign />
      </BrowserRouter>,
    );

    const downloadButton = screen.getByRole('button', { name: /Information on your card/i });

    userEvent.click(downloadButton);

    expect(createElementSpy).toHaveBeenCalledWith('a');

    expect(mockClick).toHaveBeenCalled();

    const createdAnchor = createElementSpy.mock.results.find(
      (result) => result.value.tagName === 'A',
    )?.value;

    expect(createdAnchor).toBeDefined();
    expect(createdAnchor.href).toBe('mock-pdf-url');
    expect(createdAnchor.download).toBe('credit-card-offer.pdf');
  });
  it('при нажатии на кнопку Send меняет статус на SIGN_PENDING и показывает сообщение', async () => {
    const axiosPostMock = vi.spyOn(axios, 'post').mockResolvedValue({});

    render(
      <BrowserRouter>
        <DocumentSign />
      </BrowserRouter>,
    );

    expect(
      screen.queryByText('Documents have been successfully signed and sent for approval'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        'Within 10 minutes you will be sent a PIN code to your email for confirmation',
      ),
    ).not.toBeInTheDocument();

    const sendButton = screen.getByText('Send');
    userEvent.click(sendButton);

    await waitFor(() => {
      expect(axiosPostMock).toHaveBeenCalledWith(`http://localhost:8080/document/123/sign`);
    });

    await waitFor(() => {
      const storedData = localStorage.getItem('reduxState__123');
      expect(storedData).toBeDefined();

      if (storedData) {
        const state = JSON.parse(storedData);
        expect(state.application.status).toBe('SIGN_PENDING');
      }
    });

    await waitFor(() => {
      expect(
        screen.getByText('Documents have been successfully signed and sent for approval'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Within 10 minutes you will be sent a PIN code to your email for confirmation',
        ),
      ).toBeInTheDocument();
    });
  });
});
