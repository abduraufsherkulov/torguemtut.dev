import React, { useEffect } from 'react'
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import MainBreadcrumbs from '../MainBreadcrumbs';
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, withRouter, useParams } from "react-router-dom";
import VendorProducts from './products/VendorProducts';
import VendorRatings from './ratings/VendorRatings';
import VendorStatistics from './statistics/VendorStatistics';
import VendorInfo from './info/VendorInfo';
import { ContainerOutlined, MessageOutlined, HeartOutlined } from '@ant-design/icons';


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
                        width={260}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <VendorInfo id={id} />
                        <Menu theme="light" mode="inline" selectedKeys={[location.pathname]}>
                            <Menu.Item key={`/vendorproducts/${id}`}>
                                <Link to={`/vendorproducts/${id}`} >
                                    <ContainerOutlined />
                                    <span className="nav-text">Продукты</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={`/vendorratings/${id}`}>
                                <Link to={`/vendorratings/${id}`} >
                                    <MessageOutlined />
                                    <span className="nav-text">Рейтинг</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key={`/vendorstatistics/${id}`}>
                                <Link to={`/vendorstatistics/${id}`} >
                                    <HeartOutlined />
                                    <span className="nav-text">Статистика</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Route path="/vendorproducts" render={() => <VendorProducts id={id} />} />
                        <Route path="/vendorratings" render={() => <VendorRatings id={id} />} />
                        <Route path="/vendorstatistics" component={VendorStatistics} />
                    </Content>
                </Layout>
            </div>
        </div>
    )
}
export default withRouter(VendorSideBar);
