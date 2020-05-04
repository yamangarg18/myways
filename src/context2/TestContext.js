
import createTestContext from './createTestContext';
import someapi from '../api/someapi';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_tests':
            return action.payload;
        default:
            return state;
    }
};

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/tests');

        dispatch({ type: 'get_tests', payload: response.data});
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { getTests },
    []
);
