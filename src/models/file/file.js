import { observable, action } from 'mobx';

class FileModel {
    @observable id = 0;
    @observable link = null;
    @observable mimetype = null;
    @observable file_name = null;

    @action
    update(data) {
        const allowedFields = [
            'id',
            'link',
            'mimetype',
            'file_name'
        ];
        const fields = Object.keys(data).filter((field) => allowedFields.includes(field));
        fields.forEach((field) => {
            this[field] = data[field];
        });
    }

    @action
    delete() {
        let allowedFields = [
            'link',
            'mimetype',
            'file_name'
        ];
        allowedFields.forEach((field) => {
            this[field] = null;
        });
        allowedFields = [
            'id'
        ];
        allowedFields.forEach((field) => {
            this[field] = 0;
        });
    }
}

export { FileModel };
