import { UserModel } from './user/user';
import { PostModel } from './post/post';

export const models = () => {
    return {
        user: new UserModel(),
        post: new PostModel(),
    };
};
