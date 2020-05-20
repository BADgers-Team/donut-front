import { observable, action } from 'mobx';

class PostModel {
    @observable id = 0;
    @observable title = null;
    @observable description = null;
    @observable description_length = 0;
    @observable visible_type = null;
    @observable activity = null;
    @observable full_files = [];
    @observable files = [];
    @observable file_ids = [];
    @observable files_count = 0;
    @observable user_id = 0;
    @observable author = null;
    @observable teaser = null;
    @observable paid = false;
    @observable follows = false;
    @observable liked = false;
    @observable created_at = null;
    @observable likes_count = 0;
    @observable views_count = 0;
    @observable payment_type = null;
    @observable sum = 0;
    @observable message = null;

    @action
    update(data) {
        console.log('Приветики Новый постик');
        console.log(data);
        console.log('---------');
        const allowedFields = [
            'id',
            'title',
            'description',
            'description_length',
            'visible_type',
            'activity',
            'full_files',
            'files',
            'file_ids',
            'files_count',
            'user_id',
            'author',
            'teaser',
            'paid',
            'follows',
            'liked',
            'created_at',
            'likes_count',
            'views_count',
            'payment_type',
            'message',
            'sum',
        ];
        const fields = Object.keys(data).filter((field) => allowedFields.includes(field));
        fields.forEach((field) => {
            this[field] = data[field];
        });
    }

    @action
    delete() {
        let allowedFields = [
            'title',
            'description',
            'visible_type',
            'activity',
            'author',
            'teaser',
            'created_at',
            'payment_type',
            'message',
        ];
        allowedFields.forEach((field) => {
            this[field] = null;
        });
        allowedFields = [
            'description_length',
            'files_count',
            'user_id',
            'likes_count',
            'views_count',
            'sum',
        ];
        allowedFields.forEach((field) => {
            this[field] = 0;
        });
        allowedFields = [
            'paid',
            'follows',
            'liked'
        ];
        allowedFields.forEach((field) => {
            this[field] = false;
        });
        allowedFields = [
            'file_ids',            
            'full_files',
            'files'
        ];
        allowedFields.forEach((field) => {
            this[field] = [];
        });
    }

    @action
    updateDonate(sum, message, payment_type) {
        this.sum = sum;
        this.message = message;
        this.payment_type = payment_type;
    }
}

export { PostModel };
