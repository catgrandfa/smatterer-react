import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 导入store提供组件Provider
import { Provider } from 'react-redux'
// 导入store
import { RouterProvider } from 'react-router-dom'
import store from '@/store'
// 路由导入
import router from '../routes'
import './global.less'

const root = document.querySelector('#root')

if (root) {
    createRoot(root).render(
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </StrictMode>
    )
}
