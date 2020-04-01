// Все необходимые урлы для запросов на бек и переходов
export default {
    api: {
        login: '/login',
        posts: {
            all: '/posts',
            new: '/posts',
            id: '/posts/:id',
            file: {
                new: '/posts/file',
            },
        },
        subscriptions: {
            my: '/subscriptions/my',
            new: '/subscriptions'
        },
        me: '/me',
        activities: '/activities',
        users: {
            login: '/users/:id'
        },
        visible_types: '/visible_types',
        search: '/search'
    },
    pages: {
        user: {
            login: '/login',
            register: '/registration',
            profile: '/users/:id'
        },
        main: '/',
        posts: {
            new: '/posts/new',
            my: '/posts/my',
            id: '/posts/:id',
        },
        subscriptions: {
            new: '/subscriptions'
        },
        podcasts: {
            all: '/podcasts'
        },
        search: '/search'
    }
};
