import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import styles from './index.less'
import CustomHeader from '@/components/OverallLayout/components/CustomHeader'
import CustomFooter from '@/components/OverallLayout/components/CustomFooter'
import titleImg from '@/assets/imgs/smatterer.png'
import HomePage from '@/page/homePage'
import { routeConfig } from '../../../routes/config'

const { Content, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}

function getMenu(routes: any[]) {
    const tempRoutes = _.cloneDeep(routes)
    const menuArr: MenuItem[] = []
    for (let i = 0; i < tempRoutes.length; i++) {
        const routesEle = tempRoutes[i]
        if (!routesEle.hidden) {
            if (routesEle.children) {
                routesEle.children = getMenu(routesEle.children)
            }
            menuArr.push(
                getItem(routesEle.name, routesEle.path, routesEle.icon, routesEle.children)
            )
        }
    }
    return menuArr
}

const OverallLayout: React.FC = () => {
    const currentPage = useSelector((state: any) => state.currentPageStore.page || <HomePage />)
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer }
    } = theme.useToken()

    function menuClick(MenuProps) {
        navigate(MenuProps.key)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className={styles.systemName}>
                    <img
                        src={titleImg}
                        className={collapsed ? styles.titleImgCollapsed : styles.titleImg}
                    />
                    <span className={collapsed ? styles.titleCollapsed : styles.title}>
                        smatterer
                    </span>
                </div>
                <Menu
                    theme='dark'
                    defaultSelectedKeys={['1']}
                    mode='inline'
                    items={getMenu(routeConfig)}
                    onClick={menuClick}
                />
            </Sider>
            <Layout>
                <CustomHeader colorBgContainer={colorBgContainer} />
                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 24, height: '100%', background: colorBgContainer }}>
                        {currentPage}
                    </div>
                </Content>
                <CustomFooter footerContent={'smatterer-react'} />
            </Layout>
        </Layout>
    )
}

export default OverallLayout
