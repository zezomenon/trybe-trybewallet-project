// Coloque aqui suas actions
export const USERLOGIN = 'USERLOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DEL_EXPENSES = 'DEL_EXPENSES';
export const EDIT_ITEM = 'EDIT_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export const userLogin = (email) => ({
  type: USERLOGIN,
  email,
});

export const walletAddCurrencies = (addCurrencies) => ({
  type: ADD_CURRENCIES,
  addCurrencies,
});

export const walletAddExpenses = (addExpenses) => ({
  type: ADD_EXPENSES,
  addExpenses,
});

export const walletDelExpenses = (deleteExpenses) => ({
  type: DEL_EXPENSES,
  deleteExpenses,
});

export const walletInitalEditExpenses = (initialEditExpenses, itemID) => ({
  type: EDIT_ITEM,
  initialEditExpenses,
  itemID,
});

export const walletUpdateItemExpense = (updateItemExpense, itemID) => ({
  type: UPDATE_ITEM,
  updateItemExpense,
  itemID,
});
