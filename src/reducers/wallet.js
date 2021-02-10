// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_CURRENCIES,
  ADD_EXPENSES,
  DEL_EXPENSES,
  EDIT_ITEM,
  UPDATE_ITEM } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editItemID: '',
  editItem: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.addCurrencies,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.addExpenses],
    };
  case DEL_EXPENSES:
    return {
      ...state,
      expenses: action.deleteExpenses,
    };
  case EDIT_ITEM:
    return {
      ...state,
      editItem: true,
      editItemID: action.itemID,
    };
  case UPDATE_ITEM:
    return {
      ...state,
      editItem: false,
      expenses: state.expenses.map((item) => {
        if (item.id === action.itemID) {
          return action.updateItemExpense;
        }
        return item;
      }),
      // Nessa parte de edicao fui auxiliado pelo Anderson
    };
  default:
    return state;
  }
};

export default wallet;
