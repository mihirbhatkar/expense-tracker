// expensesApiSlice.js
import { apiSlice } from "./apiSlice";

const EXPENSES_URL = "/api/expenses";

export const expensesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all expenses for a specific wallet
    // ! DOESN'T EXIST YET
    getAllExpenses: builder.query({
      query: (walletId) => ({
        url: `${EXPENSES_URL}/wallet/${walletId}`,
        method: "GET",
      }),
    }),

    // Add a new expense
    addExpense: builder.mutation({
      query: ({ data, walletId }) => ({
        url: `${EXPENSES_URL}/${walletId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Update an existing expense
    updateExpense: builder.mutation({
      query: ({ expenseId, data }) => ({
        url: `${EXPENSES_URL}/${expenseId}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete an expense
    deleteExpense: builder.mutation({
      query: (expenseId) => ({
        url: `${EXPENSES_URL}/${expenseId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApiSlice;
