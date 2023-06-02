import React, { FC } from 'react'
import { Layout } from 'antd'

const { Header } = Layout

type HeaderProps = {
    colorBgContainer: string
}

const CustomHeader: FC<HeaderProps> = props => {
    const { colorBgContainer } = props
    return <Header style={{ padding: 0, background: colorBgContainer }}>Header</Header>
}

export default CustomHeader
