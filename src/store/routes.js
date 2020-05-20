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
            avatar: '/me/avatar',
        },
        visible_types: '/visible_types',
        search: '/search',
        payment: {
            pay: '/pay',
            authorize: '/oauth/money', // Ручка для авторизации через Яндекс.Деньги
        },
        goals: '/goals',
        feed: '/feed',
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
        feed: '/feed',
        collections: '/collections',
        search: '/search',
        pay: '/money/confirm',
    }
};
