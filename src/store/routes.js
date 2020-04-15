// Все необходимые урлы для запросов на бек и переходов
export default {
    api: {
        oauth: '/oauth/:id',
        posts: {
            all: '/posts',
            new: '/posts',
            id: '/posts/:id',
            like: '/posts/:id/like',
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
            login: '/users/:id',
            confirm: '/confirm',
            exit: '/logout',
        },
        visible_types: '/visible_types',
        search: '/search',
        pay: '/pay',
        goals: '/goals',
    },
    pages: {
        user: {
            login: '/login',
            callback: '/callback/:service',
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
        collections: '/collections',
        search: '/search'
    }
};
