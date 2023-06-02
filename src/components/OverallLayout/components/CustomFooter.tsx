import React, { FC, ReactNode } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

type CustomFooterProps = {
    footerContent?: string | ReactNode
}

const CustomFooter: FC<CustomFooterProps> = props => {
    const { footerContent } = props
    return footerContent ? <Footer style={{ textAlign: 'center' }}>{footerContent}</Footer> : null
}

export default CustomFooter
