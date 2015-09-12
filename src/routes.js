import App from './components/App';
import Hello from './components/Hello';

export default [
    {
        path: '/',
        component: App,
        indexRoute: {
            component: Hello,
        },
        childRoutes: [
            {
                path: '/test',
                component: Hello,
            },
            {
                path: '/hello',
                component: Hello,
            },
        ],
    },
];
