// action creator
import streams from '../apis/streams';
import history from '../history';
import { SIGN_IN, 
        SIGN_OUT, 
        CREATE_STREAM,
        FETCH_STREAMS,
        FETCH_STREAM,
        DELETE_STREAM,
        EDIT_STREAM
        } from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = (formValues) => async (dispatch, getState) => {
    // extract the google userId from the global state
    const { userId } = getState().auth;

    // append userId tto the form values
    const response = await streams.post('/streams', { ...formValues, userId });

    // let's dispatch an action placing the response we got from the server in the payload.
    dispatch({ type: CREATE_STREAM, payload: response.data });

    // navigate back to the root path
    history.push('/');
};

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get('/streams');

    // let's dispatch an action placing the response we got from the server in the payload.
    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);

    // let's dispatch an action placing the response we got from the server in the payload.
    dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    // let's dispatch an action placing the response we got from the server in the payload.
    dispatch({ type: EDIT_STREAM, payload: response.data });

    // navigate back to the root path
    history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });

    // navigate back to the root path
    history.push('/');
};