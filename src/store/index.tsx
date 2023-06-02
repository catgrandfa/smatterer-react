import { configureStore } from '@reduxjs/toolkit'
import counterStores from './modules/couterStore'
import currentPageStore from '@/store/modules/currentPageStore'

export default configureStore({
    reducer: {
        // 注册子模块
        currentPageStore,
        counterStores
    }
})
