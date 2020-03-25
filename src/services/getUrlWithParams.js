/**
 * Функция для генерации урла с гет-параметрами
 * @param {string} url - базовый урл
 * @param {object} [params] - гет-параметры в формате key-value
 * @returns {string}
 */
export const getUrlWithParams = (url, params = {}) => {
    if (Object.keys(params).length === 0) {
        return url;
    }

    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
        queryParams.append(key, params[key]);
    });

    return `${url}?${queryParams}`;
};
