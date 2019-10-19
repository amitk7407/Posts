import axios from 'axios';
import { begin, error, success } from './actions';

const fetchContent = (options) => {
    const requestOptions = Object.assign({}, {
        baseURL: 'https://post-service-fe827.firebaseapp.com/api/v1',
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }, options);

    return dispatch => {
        dispatch(begin(requestOptions.method));
        return axios.request(requestOptions)
            .then(res => {
                return dispatch(success(requestOptions.method, res.data));
            })
            .catch(err => {
                return dispatch(error(requestOptions.method, err));
            });
    };
}

const get = () => {
    return fetchContent({
        method: 'get',
        url: '/feeds'
    });
};

const post = (data) => {
    return fetchContent({
        method: 'post',
        url: '/feeds',
        data
    });
};

const upvote = (id, data) => {
    return fetchContent({
        method: 'put',
        url: `/feeds/upvote/${id}`,
        data
    });
};

export default {
    get,
    post,
    upvote
}
