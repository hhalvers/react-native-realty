import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import { favorites } from './favorites';
import { allProperties } from './allProperties';
import { ourAgents } from './ourAgents';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites,
            comments,
            partners,
            promotions,
            favorites,
            allProperties
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}