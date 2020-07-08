export const ERROR_TYPES = {
    REQUIRED: 'Это обязательное поле',
    LENGTH: 'Длина поля должна быть от :min до :max символов',
    TYPE: 'Тип файла не допустим. ',
    SIZE: 'Размер файла должен быть до :max',
    SUM: 'Сумма может быть от :min до :max ₽',
    COUNT: 'Количество не может быть меньше :min',
    VALIDATION_FAILED: 'Произошла ошибка проверки поля',
    CUSTOM: ':text'
};

export const FIELDS_TYPES = {
    TITLE: 'title',
    CONTENT: 'content',
    FILE: 'file',
    SUM: 'sum',
    SHORT_CONTENT: 'short-content',
    COUNT: 'count',
};

export const FILES_TYPES = [
    '.jpg', '.png', '.gif', '.heic', '.heif', '.pdf', '.rtf', '.mp4', '.mp3', '.gzip', 'zip', '.docx', '.doc'
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
    case(FIELDS_TYPES.COUNT):
        return checkCount(field);
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
    const titleMinLength = 1;
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
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/x-canon-cr2",
        "image/tiff",
        "image/bmp",
        "image/heif",
        "image/heic",
        "image/vnd.ms-photo",
        "image/vnd.adobe.photoshop",
        "image/x-icon",
        "image/vnd.dwg",
        "video/mp4",
        "video/x-m4v",
        "video/x-matroska",
        "video/webm",
        "video/quicktime",
        "video/x-msvideo",
        "video/x-ms-wmv",
        "video/mpeg",
        "video/x-flv",
        "video/3gpp",
        "audio/midi",
        "audio/mpeg",
        "audio/m4a",
        "audio/ogg",
        "audio/x-flac",
        "audio/x-wav",
        "audio/amr",
        "audio/aac",
        "application/epub+zip",
        "application/x-tar",
        "application/x-rar-compressed",
        "application/gzip",
        "application/x-bzip2",
        "application/x-7z-compressed",
        "application/x-xz",
        "application/pdf",
        "application/x-msdownload",
        "application/x-shockwave-flash",
        "application/rtf",
        "application/x-iso9660-image",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/font-woff",
        "application/font-sfnt",
        "application/x-iwork-keynote-sffkey",
        "application/x-iwork-pages-sffpages",
        "application/x-iwork-numbers-sffnumbers",
        "application/vnd.apple.pages",
        "application/vnd.apple.numbers",
        "application/vnd.apple.keynote",
    ];
    if (!field) {
        return ERROR_TYPES.CUSTOM.replace(':text', 'Не удалось загрузить файл');
    }
    if (field.size > maxFileSize) {
        return ERROR_TYPES.SIZE.replace(':max', '5 Мб');
    }

    //т.к. у некоторых .heic почему нет type, я это закостылю
    const fileName = field.name.toLowerCase().split('.')[1];
    if (field.type === '' && (fileName === 'heic' || fileName === 'heif')) {
        // имеем heic, значит ошибки типа файла нет
        return null;
    }
    // конец костыля

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

/** Функция проверки количества
 * @param {string} field - поле, которое нужно проверить
 * @returns {string|null}
 */
const checkCount = (field) => {
    if (!field) {
        return ERROR_TYPES.CUSTOM.replace(':text', 'Не удалось установить количество');
    }
    const minCount = 1;
    if (+field < minCount) {
        return ERROR_TYPES.COUNT
            .replace(':min', minCount);
    }
};
