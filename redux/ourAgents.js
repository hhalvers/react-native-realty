import * as ActionTypes from './ActionTypes';

export const ourAgents = (state = { isLoading: true,
                                    errMess: null,
                                    ourAgents: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_OURAGENTS:
            return {...state, isLoading: false, errMess: null, ourAgents: action.payload};

        case ActionTypes.OURAGENTS_LOADING:
            return {...state, isLoading: true, errMess: null, partners: []}

        case ActionTypes.OURAGENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};