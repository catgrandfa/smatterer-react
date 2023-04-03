import { FC } from 'react'

type HeaderProps = {
    title: string
}

const Header: FC<HeaderProps> = HeaderProps => {
    const { title } = HeaderProps
    return <div>{title}</div>
}
export default Header
