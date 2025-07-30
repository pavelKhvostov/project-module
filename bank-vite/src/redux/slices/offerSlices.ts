import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IOffer {
  applicationId: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  monthlyPayment: number;
  rate: number;
  requestedAmount: number;
  term: number;
  totalAmount: number;
}

export interface IOffersState {
  offers: IOffer[];
  selectedOffer: IOffer | null;
  loading: boolean;
  error: string | null;
}

const initialState: IOffersState = {
  offers: [],
  selectedOffer: null,
  loading: false,
  error: null,
};

const offerSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<IOffer[]>) {
      state.offers = action.payload;
      state.loading = false;
    },
    selectOffer(state, action: PayloadAction<IOffer>) {
      state.selectedOffer = action.payload;
    },
    clearOffers(state) {
      state.offers = [];
      state.selectedOffer = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setOffers, selectOffer, clearOffers, setLoading, setError } = offerSlice.actions;
export default offerSlice.reducer;
