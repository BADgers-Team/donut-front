// Все необходимые урлы для запросов на бек и переходов
export default {
    api: {
        login: '/login',
        posts: {
            all: '/posts',
            new: '/posts',
            all: '/posts',
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
        visible_types: '/visible_types'
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
            my: '/subscriptions/my'
        },
        podcasts: {
            all: '/podcasts'
        }
    }
};
