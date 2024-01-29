// expensesApiSlice.js
import { apiSlice } from "./apiSlice";

const EXPENSES_URL = "/api/expenses";

export const expensesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all expenses for a specific wallet

    getRecentExpenses: builder.mutation({
      query: () => ({
        url: `${EXPENSES_URL}/recent`,
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

    // Search expenses
    searchExpenses: builder.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}/all`,
        method: "POST",
        body: data,
      }),
    }),
    // Search expense by name
    searchByName: builder.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}/name`,
        method: "POST",
        body: data,
      }),
    }),

    oldestExpense: builder.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}/find/oldest`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useOldestExpenseMutation,
  useSearchByNameMutation,
  useSearchExpensesMutation,
  useGetRecentExpensesMutation,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApiSlice;
