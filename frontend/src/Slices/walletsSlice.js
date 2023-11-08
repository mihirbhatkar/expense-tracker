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
			if (state.wallets.length === 0) {
				localStorage.setItem("userWallets", []);
				localStorage.setItem("selectedWallet", null);
			} else {
				// Save updated wallets to local storage
				localStorage.setItem(
					"userWallets",
					JSON.stringify(action.payload)
				);
				localStorage.setItem(
					"selectedWallet",
					JSON.stringify(state.selectedWallet)
				);
			}
		},

		setSelectedWallet: (state, action) => {
			state.selectedWallet = action.payload;
			localStorage.setItem(
				"selectedWallet",
				JSON.stringify(state.selectedWallet)
			);
		},

		clearWalletsData: (state, action) => {
			state.wallets = [];
			state.selectedWallet = null;
			localStorage.removeItem("userWallets");
			localStorage.removeItem("selectedWallet");

			// other data
			if (localStorage.getItem("carouselCounter")) {
				localStorage.removeItem("carouselCounter");
			}
		},
	},
});

export const { setUserWallets, setSelectedWallet, clearWalletsData } =
	walletsSlice.actions;
export default walletsSlice.reducer;
