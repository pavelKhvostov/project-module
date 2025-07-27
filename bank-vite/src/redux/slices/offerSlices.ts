import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOffer {
  applicationId: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  monthlyPayment: number;
  rate: number;
  requestedAmount: number;
  term: number;
  totalAmount: number;
}

interface IOffersState {
  offers: IOffer[];
  isSubmitted: boolean;
  selectedApplicationId: number | null;
}

const initialState: IOffersState = {
  offers: [],
  isSubmitted: localStorage.getItem('Submitted') === 'true',
  selectedApplicationId: localStorage.getItem('SelectedAppId')
    ? Number(localStorage.getItem('SelectedAppId'))
    : null,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<IOffer[]>) {
      state.offers = action.payload;
    },
    clearOffers(state) {
      state.offers = [];
    },
    setIsFlagSubmitted(state, action: PayloadAction<boolean>) {
      state.isSubmitted = action.payload;
    },
    setSelectedApplicationId(state, action: PayloadAction<number>) {
      state.selectedApplicationId = action.payload;
    },
  },
});

export const { setOffers, clearOffers, setIsFlagSubmitted, setSelectedApplicationId } =
  offersSlice.actions;
export default offersSlice.reducer;
