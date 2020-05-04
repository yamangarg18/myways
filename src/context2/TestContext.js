
import createTestContext from './createTestContext';
import someapi from '../api/someapi';

const testReducer = (state, action) => {
    switch (action.type) {
        case 'get_tests':
            return action.payload;
        default:
            return state;
    }
};

const getTests = dispatch => {
    return async () => {
        const response = await someapi.get('/tests');

        dispatch({ type: 'get_tests', payload: response.data});
    };
};

export const { Context, Provider } = createTestContext(
    testReducer, 
    { getTests },
    []
);
