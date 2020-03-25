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
            my: '/posts/my',
        },
        subscriptions: {
            my: '/subscriptions/my'
        },
        podcasts: {
            all: '/podcasts'
        }
    }
};
