// Все необходимые урлы для запросов на бек и переходов
export const RouteStore = {
    api: {
        login: '/login',
        posts: {
            all: '/posts',
            new: '/posts',
            id: '/posts/:id',
            like: '/posts/:id/like',
            file: {
                new: '/posts/file',
            },
        },
        me: '/me',
        activities: '/activities',

        //TODO for debug
        search: '/search',
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
            id: '/posts/:id',
        },
        subscriptions: {
            my: '/subscriptions/my'
        },
        podcasts: {
            all: '/podcasts'
        }
    }
};
