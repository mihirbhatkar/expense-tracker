import { apiSlice } from "./apiSlice";

const WALLETS_URL = "/api/wallet";

export const walletsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWallet: builder.mutation({
      query: (data) => ({
        url: `${WALLETS_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
    // updateWallet: builder.mutation({
    //   query: (data) => ({
    //     url: `${WALLETS_URL}/update`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
    getAllWallets: builder.mutation({
      query: () => ({
        url: `${WALLETS_URL}/all`,
        method: "GET",
      }),
    }),
    deleteWallet: builder.mutation({
      query: (data) => ({
        url: `${WALLETS_URL}/delete`,
        method: "POST",
        body: data,
      }),
    }),
    // Add more wallet-related mutations as needed
  }),
});

export const {
  useCreateWalletMutation,
  useUpdateWalletMutation,
  useGetAllWalletsMutation,
  // Add more exported hooks for other wallet-related mutations
} = walletsApiSlice;
