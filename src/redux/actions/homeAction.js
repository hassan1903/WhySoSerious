import { homeConstant } from '../constants/homeConstant.js';
import "isomorphic-fetch";

export const homeAction = {
    fetchShowsList
};

function fetchShowsList() {
    return (dispatch, getState) => {
        dispatch(request());
        return fetch("http://api.tvmaze.com/search/shows?q=batman")
            .then(response => response.json())
            .then(showsList => dispatch(success(showsList)))
            .catch(err => dispatch(failure(err)));
    };
    function request() { return { type: homeConstant.SHOWS_LIST_REQUEST } }
    function success(showsList) { return { type: homeConstant.SHOWS_LIST_RESPONSE, payload: showsList } }
    function failure(error) { return { type: homeConstant.SHOWS_LIST_ERROR } }
}