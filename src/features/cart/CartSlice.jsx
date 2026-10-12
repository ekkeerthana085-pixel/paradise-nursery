
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const product = action.payload;
      const existing = state.items.find(
        (item) => item.id === product.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      } else {
        item.quantity = quantity;
      }
    },

    clearCart(state) {
      state.items = [];
    }
  }
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
