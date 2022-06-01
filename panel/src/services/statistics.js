import request from '../utils/request';

export function getStats() {
    const options = {
        method: 'GET',
    }
    const path = `statistics/general`
    return request(path, options, true);
}