import { useState } from 'react'
import '@/App.css'
import lessStyles from '@/app.less'
import scssStyles from '@/app.scss'
import stylStyles from '@/app.styl'

function App() {
    const [ count, setCounts ] = useState('')
    const onChange = (e: any) => {
        setCounts(e.target.value)
    }

    return <div>
        <h2>webpack5-react-ts</h2>
        <div className={lessStyles['lessBox']}>
            <div className={lessStyles['box']}>lessBox（天下无敌）
                <div className={lessStyles['smallImg']}>小图片背景</div>
                <div className={lessStyles['bigImg']}>大图片背景</div>
            </div>
        </div>
        <div className={scssStyles['scssBox']}>
            <div className={scssStyles['box']}>scssBox</div>
        </div>
        <div className={stylStyles['stylBox']}>
            <div className={stylStyles['box']}>stylBox</div>
        </div>
        <div>
            <p>受控组件11</p>
            <input type="text" value={count} onChange={onChange} />
            <br />
            <p>非受控组件11</p>
            <input type="text" />
        </div>
    </div>
}

export default App