import { createSlice } from "@reduxjs/toolkit";

// Retrieve stored wallet data from local storage
const storedWallets = localStorage.getItem("userWallets")
  ? JSON.parse(localStorage.getItem("userWallets"))
  : [];

const storedSelectedWallet = localStorage.getItem("selectedWallet")
  ? JSON.parse(localStorage.getItem("selectedWallet"))
  : storedWallets[0];

const initialState = {
  wallets: storedWallets, // Array to store the user's wallets fetched from the database
  selectedWallet: storedSelectedWallet || null, // Holds the selected wallet
};

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    setUserWallets: (state, action) => {
      state.wallets = [...action.payload];
      state.selectedWallet = state.wallets[0];
      // Save updated wallets to local storage
      localStorage.setItem("userWallets", JSON.stringify(action.payload));
      localStorage.setItem(
        "selectedWallet",
        JSON.stringify(state.selectedWallet)
      );
    },

    setSelectedWallet: (state, action) => {
      state.selectedWallet = action.payload;
      localStorage.setItem(
        "selectedWallet",
        JSON.stringify(state.selectedWallet)
      );
    },
  },
});

export const { setUserWallets, setSelectedWallet } = walletsSlice.actions;
export default walletsSlice.reducer;
