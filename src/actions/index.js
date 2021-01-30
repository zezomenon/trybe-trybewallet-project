// Coloque aqui suas actions
export const USERLOGIN = 'USERLOGIN';
export const WALLET = 'WALLET';
export const FETCHDATA = 'FETCHDATA';

export const userLogin = (email) => ({
  type: USERLOGIN,
  email,
});

export const wallet = (data) => ({
  type: WALLET,
  data,
});

export const fetchData = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  // dispatch(wallet(data));
  return data;
};
