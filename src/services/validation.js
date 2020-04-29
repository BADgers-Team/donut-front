const ERROR_TYPES = {
    REQUIRED: 'Это обязательное поле',
    LENGTH: 'Длина поля должна быть от :min до :max символов',
    TYPE: 'Тип файла не допустим. ',
    SIZE: 'Размер файла должен быть до :max',
    SUM: 'Сумма может быть от :min до :max ₽',
    VALIDATION_FAILED: 'Произошла ошибка проверки поля',
    CUSTOM: ':text'
};

export const FIELDS_TYPES = {
    TITLE: 'title',
    CONTENT: 'content',
    FILE: 'file',
    SUM: 'sum',
    SHORT_CONTENT: 'short-content',
};

export const FILES_TYPES = [
    '.jpg', '.png', '.gif', '.heic'
];

/** Функция валидации вводимых данных
 * @param {string|object} field - поле, которое нужно проверить
 * @param {string} type - тип проверяемого поля из FIELDS_TYPES
 * @returns {string|null}
 */
export const validate = (field, type) => {
    switch (type) {
    case(FIELDS_TYPES.TITLE):
        return checkTitle(field);
    case(FIELDS_TYPES.CONTENT):
        return checkContent(field);
    case(FIELDS_TYPES.SHORT_CONTENT):
        return checkShortContent(field);
    case(FIELDS_TYPES.FILE):
        return checkFile(field);
    case(FIELDS_TYPES.SUM):
        return checkSum(field);
    default:
        return ERROR_TYPES.VALIDATION_FAILED;
    }
};

/** Функция проверки заголовка
 * @param {string} field - поле, которое нужно проверить
 * @returns {string|null}
 */
const checkTitle = (field) => {
    if (!field || field.length === 0) {
        return ERROR_TYPES.REQUIRED;
    }
    const titleMaxLength = 70;
    const titleMinLength = 5;
    if (field.length > titleMaxLength || field.length < titleMinLength) {
        return ERROR_TYPES.LENGTH
            .replace(':min', titleMinLength)
            .replace(':max', titleMaxLength);
    }
    return null;
};

/** Функция проверки контента (содержимого)
 * @param {string} field - поле, которое нужно проверить
 * @returns {string|null}
 */
const checkContent = (field) => {
    if (!field || field.length === 0) {
        return ERROR_TYPES.REQUIRED;
    }
    return null;
};

/** Функция проверки контента (содержимого), ограниченного по длине
 * @param {string} field - поле, которое нужно проверить
 * @returns {string|null}
 */
const checkShortContent = (field) => {
    const maxLength = 270;
    const minLength = 1;
    if (!field || field.length === 0) {
        return ERROR_TYPES.REQUIRED;
    }
    if (field.length > maxLength || field.length < minLength) {
        return ERROR_TYPES.LENGTH
            .replace(':min', minLength)
            .replace(':max', maxLength);
    }
    return null;
};

/** Функция проверки файла
 * @param {object} field - поле файла input file
 * @returns {string|null}
 */
const checkFile = (field) => {
    const maxFileSize = 5 * 1024 * 1024; // 5 Мб
    const mimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/heic',
        'image/heif',
        'image/webp',
    ];
    if (!field) {
        return ERROR_TYPES.CUSTOM.replace(':text', 'Не удалось загрузить файл');
    }
    if (field.size > maxFileSize) {
        return ERROR_TYPES.SIZE.replace(':max', '5 Мб');
    }
    if (!mimeTypes.includes(field.type)) {
        const formats = FILES_TYPES.join(', ');
        return ERROR_TYPES.TYPE.concat(`Допустимые форматы: ${formats}`);
    }
    return null;
};

/** Функция проверки стоимости
 * @param {string} field - поле, которое нужно проверить
 * @returns {string|null}
 */
const checkSum = (field) => {
    if (!field) {
        return ERROR_TYPES.CUSTOM.replace(':text', 'Не удалось установить стоимость');
    }
    const maxPrice = 2147483647;
    const minPrice = 16;
    if (+field < minPrice || +field > maxPrice) {
        return ERROR_TYPES.SUM
            .replace(':min', minPrice)
            .replace(':max', maxPrice);
    }
};
