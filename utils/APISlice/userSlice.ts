import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  selectedUserId: string | null;
  modalOpen: boolean;
  searchQuery: string;
  dataQR: any | null;
  successQR: boolean | null;
  createSuccess: boolean;
  error: any;
  success: boolean;
  isLoadingCreate: boolean;
  isLoadingQR: boolean;
}

const initialState: UserState = {
  selectedUserId: null,
  modalOpen: false,
  searchQuery: '',
  dataQR: null,
  successQR: null,
  createSuccess: false,
  error: null,
  success: false,
  isLoadingCreate: false,
  isLoadingQR: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setDataQR: (state, action: PayloadAction<any | null>) => {
      state.dataQR = action.payload;
    },
    setSuccessQR: (state, action: PayloadAction<boolean | null>) => {
      state.successQR = action.payload;
    },
    setCreateSuccess: (state, action: PayloadAction<boolean>) => {
      state.createSuccess = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setIsLoadingCreate: (state, action: PayloadAction<boolean>) => {
      state.isLoadingCreate = action.payload;
    },
    setIsLoadingQR: (state, action: PayloadAction<boolean>) => {
      state.isLoadingQR = action.payload;
    },
  },
});

export const {
  setSelectedUserId,
  setModalOpen,
  setSearchQuery,
  setDataQR,
  setSuccessQR,
  setCreateSuccess,
  setError,
  setSuccess,
  setIsLoadingCreate,
  setIsLoadingQR,
} = userSlice.actions;

export default userSlice.reducer;

