import { createStore } from 'redux';

const reducer = (state = {}, action) => {
    switch (action.type){
        case 'update': return {count: state.count + 1};
        case 'clear': return {};
        default: return state;
    }
};

const store = createStore(reducer);

export default store;