import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate('/about')}>go about</button>
        </div>
    )
}

export default Login
