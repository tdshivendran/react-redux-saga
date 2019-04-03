import * as actions from "../actions";

const initialState = {
    loading: null,
    drone_data: {},
    current_data: {},
    error:false
};

const startFetch = (state, action) => {
    if (state.loading !== false) {
        return {...state, loading: true};
    }
};

const droneDataReceived = (state, action) => {
    const {data} = action.data;
    return {
        ...state,
        loading: false,
        drone_data: data,
        current_data: data[data.length - 1],
        error: false

    };
};

const droneApiError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
    };
};

const handlers = {
    [actions.FETCH_WEATHER]: startFetch,
    [actions.DRONE_DATA_RECEIVED]: droneDataReceived,
    [actions.DRONE_API_ERROR]: droneApiError,
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
};
