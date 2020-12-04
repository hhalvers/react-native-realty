import * as ActionTypes from './ActionTypes';

export const allProperties = (state = { isLoading: true,
                                    errMess: null,
                                    allProperties: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROPERTIES:
            return {...state, isLoading: false, errMess: null, allProperties: action.payload};

        case ActionTypes.PROPERTIES_LOADING:
            return {...state, isLoading: true, errMess: null, allProperties: []}

        case ActionTypes.PROPERTIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};