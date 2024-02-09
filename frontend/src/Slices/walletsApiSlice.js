import { apiSlice } from "./apiSlice";

const WALLETS_URL = "https://stack-sense-api/api/wallets";

export const walletsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createWallet: builder.mutation({
			query: (data) => ({
				url: `${WALLETS_URL}`,
				method: "POST",
				body: data,
			}),
		}),
		updateWallet: builder.mutation({
			query: (data) => ({
				url: `${WALLETS_URL}/${data.id}`,
				method: "PUT",
				body: data,
			}),
		}),
		getAllWallets: builder.mutation({
			query: () => ({
				url: `${WALLETS_URL}/all`,
				method: "GET",
			}),
		}),
		deleteWallet: builder.mutation({
			query: (deleteId) => ({
				url: `${WALLETS_URL}/${deleteId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useCreateWalletMutation,
	useUpdateWalletMutation,
	useGetAllWalletsMutation,
	useDeleteWalletMutation,
} = walletsApiSlice;
