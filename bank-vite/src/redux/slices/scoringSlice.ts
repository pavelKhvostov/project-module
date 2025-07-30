import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFormValues {
  gender: 'MALE' | 'FAMALE';
  maritalStatus: 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER';
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employmentStatus: 'UNEMPLOYED' | 'SELF_EMPLOYED' | 'EMPLOYED' | 'BUSINESS_OWNER';
  employerINN: string;
  salary: number;
  position: 'WORKER' | 'MID_MANAGER' | 'TOP_MANAGER' | 'OWNER';
  workExperienceTotal: number;
  workExperienceCurrent: number;
}

export interface IScoringResult {
  status: string;
  psb?: number;
  paymentSchedule?: any[];
}

export interface IScoringState {
  data: IFormValues | null;
  result: IScoringResult | null;
  loading: boolean;
  error: string | null;
  scoringStatus: 'IDLE' | 'PENDING' | 'SUCCESS' | 'FAILED';
}

const initialState: IScoringState = {
  data: null,
  result: null,
  loading: false,
  error: null,
  scoringStatus: 'IDLE',
};

const scoringSlice = createSlice({
  name: 'scoring',
  initialState,
  reducers: {
    setScoringData(state, action: PayloadAction<IFormValues>) {
      state.data = action.payload;
      state.loading = true;
      state.error = null;
      state.scoringStatus = 'PENDING';
    },
    setScoringStatus(state, action: PayloadAction<IScoringState['scoringStatus']>) {
      state.scoringStatus = action.payload;
      state.loading = action.payload === 'PENDING';
    },
    setScoringResult(state, action: PayloadAction<IScoringResult>) {
      state.result = action.payload;
      state.scoringStatus = 'SUCCESS';
      state.loading = false;
    },
    resetScoring(state) {
      state.data = null;
      state.result = null;
      state.loading = false;
      state.error = null;
      state.scoringStatus = 'IDLE';
    },
  },
});

export const { setScoringData, setScoringStatus, setScoringResult, resetScoring } =
  scoringSlice.actions;

export default scoringSlice.reducer;
