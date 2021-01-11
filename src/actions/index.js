// Coloque aqui suas actions
export const USERLOGIN = 'USERLOGIN';
export const WALLET = 'WALLET';

export const userLogin = (email) => ({
  type: USERLOGIN,
  email,
});
