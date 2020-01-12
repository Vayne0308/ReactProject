import { combineReducers } from 'redux';

function aa(prevState = 11,action){
    switch (action.type) {
        default:
            return prevState;
    }
}

function bb(prevState = 22 , action){
    switch (action.type) {
        default:
            return prevState;
    }
}

export default combineReducers({
    aa,
    bb
})