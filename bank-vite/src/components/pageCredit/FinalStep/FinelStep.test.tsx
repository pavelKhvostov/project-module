import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getStore, store } from '@/redux/store/store';
import FinalStep from './FinalStep';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ applicationId: '123' }),
  };
});

describe('Компонент FinalStep', () => {
  const storeTest = getStore();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    localStorage.setItem(
      'reduxState__123',
      JSON.stringify({
        application: {
          status: 'COMPLETED',
        },
      }),
    );
  });

  const renderComponent = () => {
    return render(
      <Provider store={storeTest}>
        <MemoryRouter>
          <FinalStep />
        </MemoryRouter>
      </Provider>,
    );
  };

  it('отображает основные элементы', () => {
    renderComponent();

    expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /View other offers of our bank/i }),
    ).toBeInTheDocument();
  });

  it('очищает localStorage и redux перенаправляет при клике', () => {
    localStorage.setItem('reduxState__123', 'test');
    localStorage.setItem('SelectedAppIds', JSON.stringify([123, 456]));

    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /View other offers of our bank/i }));

    expect(localStorage.getItem('reduxState__123')).toBeNull();
    expect(JSON.parse(localStorage.getItem('SelectedAppIds')!)).toEqual([456]);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');

    const state = store.getState();
    expect(state.application.status).toBe('IDLE');
  });
});
