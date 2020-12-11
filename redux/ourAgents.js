import * as ActionTypes from './ActionTypes';

export const ourAgents = (state = { isLoading: true,
                                    errMess: null,
                                    ourAgents: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_AGENTS:
            return {...state, isLoading: false, errMess: null, ourAgents: action.payload};

        case ActionTypes.AGENTS_LOADING:
            return {...state, isLoading: true, errMess: null, partners: []}

        case ActionTypes.AGENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};