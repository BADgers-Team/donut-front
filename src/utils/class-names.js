/**
 * Функция для склейки строк в имя класса
 * Можно делать `condition && 'className'`, 'className' применится только в случае, если condition == true
 * Например, const primary = false; classNames([ 'text', primary && 'text_primary' ]) === 'text'
 * Например, const primary = true; classNames([ 'text', primary && 'text_primary' ]) === 'text text_primary'
 * @param {string[]} classes
 * @returns {string}
 */
export function classNames(classes) {
    return classes.filter((item) => item).join(' ');
}
