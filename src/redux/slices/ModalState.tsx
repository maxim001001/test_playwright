import { RootState } from "../../redux/store";
import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "ModalState",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const isOpenModalState = (state: RootState) => state.ModalState.isOpen;

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
