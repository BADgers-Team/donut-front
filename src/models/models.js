import { UserModel } from './user/user';

export const models = () => {
    return {
        user: new UserModel(),
    };
};
