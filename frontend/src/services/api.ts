/**
 * API service for communicating with the backend
 */

import { Category, CategoryFormData, Expense, ExpenseFormData } from "../types";

const API_BASE_URL = "http://localhost:3000/api";

/**
 * Fetch all expenses
 */
export async function fetchExpenses(): Promise<Expense[]> {
  const response = await fetch(`${API_BASE_URL}/expenses`);
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
}

/**
 * Fetch expenses for a specific year and month
 */
export async function getExpenses(
  year: number,
  month: number,
): Promise<Expense[]> {
  const response = await fetch(
    `${API_BASE_URL}/expenses?year=${year}&month=${month}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
}

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

/**
 * Create a new category
 */
export async function createCategory(data: CategoryFormData): Promise<Category> {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: data }),
  });

  if (!response.ok) {
    let message = "Failed to create category";
    try {
      const body = await response.json();
      if (Array.isArray(body.errors) && body.errors.length > 0) {
        message = body.errors.join(", ");
      }
    } catch {
      // Keep the default message when the error body is not JSON.
    }
    throw new Error(message);
  }

  return response.json();
}

/**
 * Create a new expense
 */
export async function createExpense(data: ExpenseFormData): Promise<Expense> {
  const expenseData = await toExpenseApiPayload(data);

  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ expense: expenseData }),
  });

  if (!response.ok) {
    throw new Error("Failed to create expense");
  }

  return response.json();
}

/**
 * Update an existing expense
 */
export async function updateExpense(
  id: number,
  data: Partial<ExpenseFormData>,
): Promise<Expense> {
  const expenseData = await toExpenseApiPayload(data);

  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ expense: expenseData }),
  });

  if (!response.ok) {
    throw new Error("Failed to update expense");
  }

  return response.json();
}

/**
 * Delete an expense
 */
export async function deleteExpense(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
}

/**
 * Map form fields to API expense params (category name → category_id).
 */
async function toExpenseApiPayload(
  data: Partial<ExpenseFormData>,
): Promise<{
  description?: string;
  amount?: string;
  category_id?: number;
  date?: string;
}> {
  const payload: {
    description?: string;
    amount?: string;
    category_id?: number;
    date?: string;
  } = {};

  if (data.description !== undefined) {
    payload.description = data.description;
  }
  if (data.amount !== undefined) {
    payload.amount = data.amount;
  }
  if (data.date !== undefined) {
    payload.date = data.date;
  }
  if (data.category !== undefined) {
    const categories = await fetchCategories();
    const category = categories.find((c) => c.name === data.category);
    payload.category_id = category?.id;
  }

  return payload;
}
