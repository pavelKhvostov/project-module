import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Offer {
  applicationId: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  monthlyPayment: number;
  rate: number;
  requestedAmount: number;
  term: number;
  totalAmount: number;
}

interface OffersState {
  offers: Offer[];
}

const initialState: OffersState = {
  offers: [],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    },
    clearOffers(state) {
      state.offers = [];
    },
  },
});

export const { setOffers, clearOffers } = offersSlice.actions;
export default offersSlice.reducer;
