const backendUrl = 'http://localhost:8080/api';
// const backendUrl = 'http://donat.emdobro.ru/api';
import { getUrlWithParams } from 'services/getUrlWithParams';

export default class AjaxModule {
    static get(path, params) {
        const url = `${backendUrl}${getUrlWithParams(path, params)}`;
        return fetch(url, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            body: null
        }).then((response) => response.json());
    }

    static post(path = '/', body, contentType = null) {
        const url = `${backendUrl}${path}`;
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        };
        if (body) {
            if (contentType === null) {
                options.headers = { 'Content-Type': 'application/json; charset=utf-8' };
                options.body = JSON.stringify(body);
            } else {
                options.body = body;
            }
        }

        return fetch(url, options).then((response) => response.json());
    }
}
