import React, { lazy, Suspense, useState } from 'react'
// 预加载增加webpack注释
const LazyDemo = lazy(
    () =>
        import(
            /* webpackChunkName: "PreFetchDemo" */
            /* webpackPrefetch: true */
            '@/components/LazyDemo'
        )
) // 使用import语法配合react的Lazy动态引入资源

function App() {
    const [show, setShow] = useState(false)

    // 点击事件中动态引入css, 设置show为true
    const handleOnClick = () => {
        import('@/App.css')
        setShow(true)
    }

    return (
        <>
            <h2 onClick={handleOnClick}>展示</h2>
            {/* show为true时加载LazyDemo组件 */}
            {show && (
                <Suspense fallback={null}>
                    <LazyDemo />
                </Suspense>
            )}
        </>
    )
}

export default App
