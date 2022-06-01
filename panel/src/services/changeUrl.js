import request from '../utils/request';

export function changeUrl(url) {
    const data = JSON.stringify({
        url
    });
    const options = {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return request('changeURL', options, true);
}