/**
 * Функция-дебаунсер. Добавляем задержку простаивания перед срабатыванием функции
 * @param {function} callback
 * @param {number} wait Задержка в милисекундах
 * @returns {function}
 */
export const debounce = (callback, wait) => {
    let timeout = null;
    return (...args) => {
        const next = () => callback(...args);
        clearTimeout(timeout);
        timeout = setTimeout(next, wait);
    };
};
