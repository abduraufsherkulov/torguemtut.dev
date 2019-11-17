import React, { useEffect } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Avatar } from 'antd';
import MainBreadcrumbs from '../MainBreadcrumbs';
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, withRouter, useParams } from "react-router-dom";
import VendorProducts from './products/VendorProducts';
import VendorRatings from './ratings/VendorRatings';
import VendorStatistics from './statistics/VendorStatistics';


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function VendorSideBar({ location }) {
    let { id } = useParams(id);
    console.log(id)
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
                            <Menu.Item key={`/vendorproducts/${id}`}>
                                <Link to={`/vendorproducts/${id}`} >
                                    <Icon type="container" />
                                    <span className="nav-text">Продукты</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={`/vendorratings/${id}`}>
                                <Link to={`/vendorratings/${id}`} >
                                    <Icon type="message" />
                                    <span className="nav-text">Рейтинг</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={`/vendorstatistics/${id}`}>
                                <Link to={`/vendorstatistics/${id}`} >
                                    <Icon type="heart" />
                                    <span className="nav-text">Статистика</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Route path="/vendorproducts" component={VendorProducts} id={id} />
                        <Route path="/vendorratings" component={VendorRatings} />
                        <Route path="/vendorstatistics" component={VendorStatistics} />
                    </Content>
                </Layout>
            </div>
        </div>
    )
}
export default withRouter(VendorSideBar);
