import { getUrlWithParams } from 'services/getUrlWithParams';

// eslint-disable-next-line no-undef
const API_URL = BASE_BACKEND_URL;

export class AjaxModule {
    /**
     * Статический метод для выполнения GET-запроса (асинхронный)
     * @param {string} path - относительный URL, на который сделать запрос
     * @param {object} [params] - query-параметры для запроса
     * @returns {Promise} JSON-данные
     */
    static get(path, params) {
        const url = `${API_URL}${getUrlWithParams(path, params)}`;
        return fetch(url, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            body: null
        }).then((response) => response.json());
    }

    /**
     * Статический метод для выполнения POST-запроса (асинхронный)
     * @param {string} path - относительный URL, на который сделать запрос
     * @param {object} [body] - тело запроса
     * @param {object} [contentType] - заголовок типа контента
     * @returns {Promise} JSON-данные
     */
    static post(path = '/', body, contentType = null) {
        const url = `${API_URL}${path}`;
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
