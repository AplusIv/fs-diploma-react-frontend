import { createContext } from "react";

export const isLoggedContext = createContext();

// sessionStorage.setItem('loggedIn', false);
// const loggedIn = sessionStorage.getItem('loggedIn');
// export const isLoggedContext = createContext({loggedIn});