import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
  cardDatas: [],
};

interface stateStore {
  type: string;
}

const changeState = (state = initialState, { type, ...rest }: stateStore) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = configureStore({ reducer: changeState });
export default store;
