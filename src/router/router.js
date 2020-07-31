import Test from '../view/Test';

let router = [
    {
        path: '/',
        redict: '/test'
    },
    {
        path: '/test',
        component: Test,
    },
];

export default router;