import { createSlice } from '@reduxjs/toolkit'

const counterStore = createSlice({
    name: 'counter', // 独一无二不重复的名字语义化
    // 定义初始化的数据
    initialState: {
        taskList: ['react']
    },
    reducers: {
        // action为一个对象 对象中有一个固定的属性叫做payload 为传递过来的参数
        addTaskList(state, action) {
            state.taskList.push(action.payload)
        }
    }
})

// 生成修改数据的方法导出
const { addTaskList } = counterStore.actions
export { addTaskList }
// 生成reducer 导出 供index.js做组合模块
const { reducer } = counterStore

export default reducer
