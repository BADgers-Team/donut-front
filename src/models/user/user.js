import { observable, action } from 'mobx';

class UserModel {
    @observable login = null;
    @observable name = null;
    @observable email = null;
    @observable avatar = null;
    @observable number_of_followers = 0;
    @observable number_of_subscriptions = 0;
    @observable number_of_posts = 0;
    @observable description = null;
    @observable is_wallet = null;

    @action
    update(data) {
        const allowedFields = [
            'login',
            'name',
            'email',
            'avatar',
            'number_of_followers',
            'number_of_subscriptions',
            'number_of_posts',
            'description',
            'is_wallet',
        ];
        const fields = Object.keys(data).filter((field) => allowedFields.includes(field));
        fields.forEach((field) => {
            this[field] = data[field];
        });
    }

    @action
    delete() {
        let allowedFields = [
            'login',
            'name',
            'email',
            'avatar',
            'description',
        ];
        allowedFields.forEach((field) => {
            this[field] = null;
        });
        allowedFields = [
            'number_of_followers',
            'number_of_subscriptions',
            'number_of_posts'
        ];
        allowedFields.forEach((field) => {
            this[field] = 0;
        });
    }
}

export { UserModel };
