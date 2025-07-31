import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TApplicationStatus =
  | 'IDLE'
  | 'PRESCORING_PENDING'
  | 'PRESCORING_SUCCESS'
  | 'OFFER_SELECTED'
  | 'WAITING_RESULT'
  | 'APPROVED'
  | 'CC_DENIED'
  | 'DOCS_FORMED'
  | 'SIGN_PENDING'
  | 'COMPLETED';

export interface IApplicationState {
  applicationId: number | null;
  status: TApplicationStatus;
}

const initialState: IApplicationState = {
  applicationId: null,
  status: 'IDLE',
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setApplicationId(state, action: PayloadAction<number>) {
      state.applicationId = action.payload;
    },
    setStatus(state, action: PayloadAction<TApplicationStatus>) {
      state.status = action.payload;
    },
    resetApplication(state) {
      state.applicationId = null;
      state.status = 'IDLE';
    },
  },
});

export const { setApplicationId, setStatus, resetApplication } = applicationSlice.actions;

export default applicationSlice.reducer;
