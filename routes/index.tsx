import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import About from '@/page/about'
import OverallLayout from '@/components/OverallLayout'
import Login from '@/page/login'
import MenuManage from '@/page/system/menuManage'
import NotFound from '@/page/NotFound'

const router = createBrowserRouter([
    {
        path: '/',
        element: <OverallLayout />,
        children: [
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'system',
                element: <MenuManage />
                // meta: {
                //     title: '系统管理',
                //     icon: ''
                // }
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
    {
        path: 'login',
        element: <Login />
    }
])

export default router
