import _ from 'lodash';
import { CREATE_STREAM,
            FETCH_STREAMS,
            FETCH_STREAM,
            DELETE_STREAM,
            EDIT_STREAM
        } from '../actions/types';

        // it exports the name of the file
export default ( state = {}, action) => {
    switch (action.type)
    {
        case CREATE_STREAM:
        case FETCH_STREAM:
        case EDIT_STREAM:
        // key interpolation
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            // the payload IS the id in this case
            return _.omit(state, action.payload);
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        default:
            return state;
    }
};