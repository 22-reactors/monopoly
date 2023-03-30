import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IBuyingCardInfo {
  showModal: boolean;
  cardName: string;
  cardPrice: number;
  cardIndex: number;
  indexChip: number;
}

const initialState: IBuyingCardInfo = {
  showModal: false,
  cardName: '',
  cardPrice: 0,
  cardIndex: 0,
  indexChip: 0,
};

const buyingCardInfoSlice = createSlice({
  name: 'buyingCardInfo',
  initialState,
  reducers: {
    addBuyingCardInfoAction(state, action: PayloadAction<IBuyingCardInfo>) {
      state.showModal = action.payload['showModal'];
      state.cardName = action.payload['cardName'];
      state.cardPrice = action.payload['cardPrice'];
      state.cardIndex = action.payload['cardIndex'];
      state.indexChip = action.payload['indexChip'];
    },
    resetBuyingCardInfoAction: () => initialState,
  },
});

export const { addBuyingCardInfoAction } = buyingCardInfoSlice.actions;
export const { resetBuyingCardInfoAction } = buyingCardInfoSlice.actions;

export default buyingCardInfoSlice.reducer;
