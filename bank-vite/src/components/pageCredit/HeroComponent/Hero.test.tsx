import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getStore, RootState } from '@/redux/store/store';
import Hero from './Hero';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Application from '../ApplicationId/Application';

const renderWithStateAndRoutes = (state: Partial<RootState>, initialEntries: string[] = ['/']) => {
  const storeTest = getStore();

  const customStore = {
    ...storeTest,
    getState: () => ({
      ...storeTest.getState(),
      ...state,
    }),
  };

  return render(
    <Provider store={customStore}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path='/' element={<Hero onApplyClick={() => {}} />} />
          <Route path='/loan/:applicationId' element={<Application />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('Hero компонент', () => {
  it('показывает "Apply for card", когда офферов нет и статус IDLE', () => {
    renderWithStateAndRoutes({
      application: { status: 'IDLE' } as any,
      offers: { offers: [] } as any,
      scoring: {} as any,
    });

    expect(screen.getByRole('button', { name: /apply for card/i })).toBeInTheDocument();
  });

  it('показывает "Choose an offer", когда офферы есть и статус PRESCORING_SUCCESS', () => {
    renderWithStateAndRoutes({
      application: { status: 'PRESCORING_SUCCESS' } as any,
      offers: {
        offers: [
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
        ],
      } as any,
      scoring: {} as any,
    });

    expect(screen.getByRole('button', { name: /choose an offer/i })).toBeInTheDocument();
  });

  it('показывает "Continue registration", если статус OFFER_SELECTED', () => {
    renderWithStateAndRoutes({
      application: { status: 'OFFER_SELECTED' } as any,
      offers: { offers: [] } as any,
      scoring: {} as any,
    });

    expect(screen.getByRole('button', { name: /continue registration/i })).toBeInTheDocument();
  });

  it('при клике на "Continue registration" происходит переход и рендерится форма', async () => {
    const appId = '131';

    localStorage.setItem(
      `reduxState__${appId}`,
      JSON.stringify({ application: { status: 'OFFER_SELECTED' } }),
    );

    renderWithStateAndRoutes({
      application: { status: 'OFFER_SELECTED', applicationId: 131 } as any,
      offers: { offers: [] } as any,
      scoring: {} as any,
    });

    const button = screen.getByRole('button', {
      name: /continue registration/i,
    });
    fireEvent.click(button);

    expect(await screen.findByTestId('application-form')).toBeInTheDocument();
    screen.debug();
  });
});
