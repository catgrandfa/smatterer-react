import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Root from '../router/root'
// const root = document.getElementById('root');

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />
    }
])

const root = document.querySelector('#root')

if (root) {
    createRoot(root).render(
        <StrictMode>
            <RouterProvider router={router} />
            <App />
        </StrictMode>
    )
}
