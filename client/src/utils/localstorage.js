export const setItem = (key, payload) =>
  localStorage.setItem(key, JSON.stringify(payload));

export const getItem = (key) => JSON.parse(localStorage.getItem(key));

export const removeItem = (key) => localStorage.removeItem(key);
