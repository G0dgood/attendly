import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AttendanceState {
  selectedEmployeeId: string | null;
  modalOpen: boolean;
  dateFilter: string | null;
  errorAttendance: any;
  successAttendance: boolean | null;
  isLoadingAttendanceSummary: boolean;
}

const initialState: AttendanceState = {
  selectedEmployeeId: null,
  modalOpen: false,
  dateFilter: null,
  errorAttendance: null,
  successAttendance: null,
  isLoadingAttendanceSummary: false,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setSelectedEmployee: (state, action: PayloadAction<string | null>) => {
      state.selectedEmployeeId = action.payload;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    setDateFilter: (state, action: PayloadAction<string | null>) => {
      state.dateFilter = action.payload;
    },
    setErrorAttendance: (state, action: PayloadAction<any>) => {
      state.errorAttendance = action.payload;
    },
    setSuccessAttendance: (state, action: PayloadAction<boolean | null>) => {
      state.successAttendance = action.payload;
    },
    setIsLoadingAttendanceSummary: (state, action: PayloadAction<boolean>) => {
      state.isLoadingAttendanceSummary = action.payload;
    },
  },
});

export const {
  setSelectedEmployee,
  setModalOpen,
  setDateFilter,
  setErrorAttendance,
  setSuccessAttendance,
  setIsLoadingAttendanceSummary,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;

