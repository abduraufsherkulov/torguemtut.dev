import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Avatar } from 'antd';
import MainBreadcrumbs from '../MainBreadcrumbs';
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import WishList from './WishList';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function SideBar(props) {
    console.log(props.location.pathname)
    return (
        <Router>
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
                            <Avatar size={64} icon="user" />
                            <div>John Doe</div>
                            <a className="signup-btn" onClick={() => { console.log('ok') }}> Редактировать </a>
                            <Menu theme="light" mode="inline" selectedKeys={[props.location.pathname]}>
                                <Menu.Item key="1">
                                    <Icon type="user" />
                                    <span className="nav-text">Объявления</span>
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
                                <Menu.Item key="5">
                                    <Icon type="user" />
                                    <span className="nav-text">Настройки</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            {/* <Route exact path="/" component={Dashboard} /> */}
                            <Route path="/wishlist" component={WishList} />
                        </Content>
                    </Layout>
                </div>
            </div>
        </Router>
    )
}
export default withRouter(SideBar);
