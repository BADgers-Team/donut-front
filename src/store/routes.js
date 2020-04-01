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
        visible_types: '/visible_types',
        search: '/search'
    },
    pages: {
        user: {
            login: '/login',
            register: '/registration',
            profile: '/profile'
        },
        main: '/',
        posts: {
            new: '/posts/new',
            my: '/posts/my'
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
