// Все необходимые урлы для запросов на бек и переходов
export const RouteStore = {
    api: {
        login: '/login',
        posts: {
            all: '/posts',
            new: '/posts',
            file: {
                new: '/posts/file',
            },
        },
        me: '/me',
        activities: '/activities',
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
