import { createStore } from 'redux';

const reducer = (state = true) => {
    return false;
};

const store = createStore(reducer);

export default store;