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
        me: '/me',       
        subscriptions: {
            new: '/subscriptions'
        },
        activities: '/activities',
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
