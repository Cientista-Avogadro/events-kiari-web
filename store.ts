import {configureStore} from '@reduxjs/toolkit';
import {ICardProps} from './services/Card';

export interface IinitialProps {
    isOpen?: boolean
    cardDatas?: [],
    currentCard?: ICardProps | null
    rememberMe: boolean,
    loading?: boolean
}

const initialState: IinitialProps = {
    isOpen: true,
    cardDatas: [],
    currentCard: null,
    rememberMe: false,
    loading: false
};

interface stateStore {
    type: string;
}

const changeState = (state = initialState, {type, ...rest}: stateStore) => {
    switch (type) {
        case 'set':
            return {...state, ...rest};
        default:
            return state;
    }
};

const store = configureStore({reducer: changeState});
export default store;
