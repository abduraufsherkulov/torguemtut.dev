import React, { useEffect } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Avatar } from 'antd';
import MainBreadcrumbs from '../MainBreadcrumbs';
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, withRouter, useLocation, useHistory } from "react-router-dom";
import WishList from './wishlist/WishList';
import MyAds from './myads/MyAds';
import Settings from './settings/Settings';


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function SideBar({ location }) {
    return (
        <div className="container">
            <div id="sidebar-content">
                <MainBreadcrumbs />
                <Layout style={{ padding: '24px 0', background: '#fff' }}>

                    <Sider
                        style={{ background: '#fff' }}
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <div className="text-align-center user-section">
                            <Avatar size={125} icon="user" />
                            <div className="auth-section"><span className="firstname">John</span> <span className="lastname">Doe</span></div>
                            <div>
                                <a className="edit-link" onClick={() => { console.log('ok') }}> Редактировать </a>
                            </div>
                        </div>
                        <Menu theme="light" mode="inline" selectedKeys={[location.pathname]}>
                            <Menu.Item key="/myads">
                                <Link to="/myads" >
                                    <Icon type="user" />
                                    <span className="nav-text">Объявления</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="video-camera" />
                                <span className="nav-text">Сообщения</span>
                            </Menu.Item>
                            <Menu.Item key="/wishlist">
                                <Link to="/wishlist" >
                                    <Icon type="upload" />
                                    <span className="nav-text">Избранное</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="user" />
                                <span className="nav-text">Кошелек</span>
                            </Menu.Item>
                            <Menu.Item key="/settings">
                                <Link to="/settings" >
                                    <Icon type="setting" />
                                    <span className="nav-text">Настройки</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {/* <Route exact path="/" component={Dashboard} /> */}
                        <Route path="/wishlist" component={WishList} />
                        <Route path="/myads" component={MyAds} />
                        <Route path="/settings" component={Settings} />
                    </Content>
                </Layout>
            </div>
        </div>
    )
}
export default withRouter(SideBar);
