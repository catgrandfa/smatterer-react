export const routeConfig = [
    {
        path: '/',
        name: '首页',
        element: '@/app'
    },
    { path: '/about', name: '关于', element: '@/page/about', hidden: true },
    {
        path: '/system',
        name: '系统管理',
        element: '@/page/system',
        children: [
            { path: '/system/menuManager', name: '菜单管理', element: '@/page/system/menuManager' }
        ]
    },
    { path: '/login', name: '登录', element: '@/page/login', hidden: true }
]
