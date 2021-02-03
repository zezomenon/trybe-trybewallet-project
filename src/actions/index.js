// Coloque aqui suas actions
export const USERLOGIN = 'USERLOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
// export const FETCHDATA = 'FETCHDATA';

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
