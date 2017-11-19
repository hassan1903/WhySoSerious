import { homeConstant } from '../constants/homeConstant.js';
import assign from 'lodash/assign'

const initialState = {
    showsList: []
}

export function homeReducer(state = initialState, action) {
    switch (action.type) {
        case homeConstant.SHOWS_LIST_RESPONSE:
        return Object.assign({}, state, {
            showsList: action.payload
        });
        default:
            return state
    }
}