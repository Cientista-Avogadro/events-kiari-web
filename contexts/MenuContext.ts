import React, { createContext } from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const MenuContext = createContext({ isOpen: false });

export default MenuContext;
