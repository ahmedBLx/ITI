import { createSlice } from "@reduxjs/toolkit";

// Load cart state from localStorage if available
const loadInitialState = () => {
  try {
    const saved = localStorage.getItem("coffeely_redux_cart");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Unable to load cart from storage", e);
  }
  return {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  };
};

// Helper function to update totals and persist state
const updateCartTotals = (state) => {
  state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalAmount = parseFloat(
    state.items
      .reduce((sum, item) => sum + item.priceNumber * item.quantity, 0)
      .toFixed(2)
  );

  try {
    localStorage.setItem("coffeely_redux_cart", JSON.stringify(state));
  } catch (e) {
    console.warn("Unable to persist cart", e);
  }
};

const initialState = loadInitialState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const priceNumber = typeof newItem.price === "number"
        ? newItem.price
        : parseFloat(String(newItem.price).replace("$", "")) || 0;

      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          priceNumber: priceNumber,
          category: newItem.category,
          emoji: newItem.emoji,
          quantity: 1,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      }

      updateCartTotals(state);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      updateCartTotals(state);
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
      updateCartTotals(state);
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
      updateCartTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      updateCartTotals(state);
    },
  },
});

// Action creators
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectIsItemInCart = (id) => (state) =>
  state.cart.items.some((item) => item.id === id);

export default cartSlice.reducer;
