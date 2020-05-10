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

/**
 * Функция для перевода чисел к сокращенному виду
 * @param {number} number Число, которое нужно привести к сокращенному виду
 * @returns {number}
 */
export const abbrNumber = (number) => {
    if (!number) {
        return 0;
    }

    const intlFormat = (num) => {
      return new Intl.NumberFormat().format(Math.round(num*10)/10);
    }

    if (number >= 1000000000000)
        return intlFormat(number/1000000000000)+'T';
    if (number >= 1000000000)
        return intlFormat(number/1000000000)+'B';
    if (number >= 1000000)
        return intlFormat(number/1000000)+'M';
    if (number >= 1000)
        return intlFormat(number/1000)+'K';
    
    return intlFormat(number);
}

