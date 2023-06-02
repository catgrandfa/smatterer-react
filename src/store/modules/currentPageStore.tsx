import { createSlice } from '@reduxjs/toolkit'

const currentPageStore = createSlice({
    name: 'currentPage', // 独一无二不重复的名字语义化
    // 定义初始化的数据
    initialState: {
        page: null
    },
    reducers: {
        // action为一个对象 对象中有一个固定的属性叫做payload 为传递过来的参数
        setCurrentPage(state, action) {
            state.page = action.payload
        }
    }
})

// 生成修改数据的方法导出
const { setCurrentPage } = currentPageStore.actions
export { setCurrentPage }
// 生成reducer 导出 供index.js做组合模块
const currentPageReducer = currentPageStore.reducer

export default currentPageReducer
