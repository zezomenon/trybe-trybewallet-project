// Coloque aqui suas actions
export const USERLOGIN = 'USERLOGIN';

export const userLogin = (email) => ({
  type: USERLOGIN,
  email,
});
