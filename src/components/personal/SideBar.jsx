import React, { useEffect, useState, useContext } from 'react'
import { Layout, Menu, Breadcrumb, Avatar, Input, Button } from 'antd';
import MainBreadcrumbs from '../MainBreadcrumbs';
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import WishList from './wishlist/WishList';
import MyAds from './myads/MyAds';
import Settings from './settings/Settings';
import MainWallet from './wallet/MainWallet';
import {
    ContainerOutlined,
    ShopOutlined,
    HeartOutlined,
    WalletOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons';
import MainBusiness from './business/MainBusiness';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function SideBar({ location }) {
    const { userData } = useContext(AuthContext)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const endpoint = "https://ttuz.azurewebsites.net/api/users/update-profile";

        const data = JSON.stringify({
            Name: firstName,
            Surname: setLastName
        });

        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            if (response.data.status) {
                // setterUserInfo(info)
                setLoading(false)
            }
        }).catch(error => {

        })
    }
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
                            <Avatar size={125} icon={<UserOutlined />} />
                            <div className="auth-section">
                                {edit ? <div>
                                    <Input
                                        name="firstName"
                                        placeholder="Имя"
                                        value={firstName}
                                        onChange={(val) => setFirstName(val)}
                                    />
                                    <br />
                                    <Input
                                        name="lastName"
                                        placeholder="Фамилия"
                                        value={lastName}
                                        onChange={(val) => setLastName(val)}
                                    />
                                </div> :
                                    <div>
                                        <span className="firstname">John</span>
                                        <br />
                                        <span className="lastname">Doe</span>
                                    </div>}
                            </div>
                            <div>
                                <Button type="link" onClick={() => edit ? handleSubmit() : setEdit(true)}> {edit ? "Отправить" : "Редактировать"}</Button>
                            </div>
                        </div>
                        <Menu theme="light" mode="inline" selectedKeys={[location.pathname]}>
                            <Menu.Item key="/myads">
                                <Link to="/myads" >
                                    <ContainerOutlined />
                                    <span className="nav-text">Объявления</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/business">
                                <Link to="/business" >
                                    <ShopOutlined />
                                    <span className="nav-text">Бизнес</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/wishlist">
                                <Link to="/wishlist" >
                                    <HeartOutlined />
                                    <span className="nav-text">Избранное</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/wallet">
                                <Link to="/wallet" >
                                    <WalletOutlined />
                                    <span className="nav-text">Кошелек</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/settings">
                                <Link to="/settings" >
                                    <SettingOutlined />
                                    <span className="nav-text">Настройки</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {/* <Route exact path="/" component={Dashboard} /> */}
                        <Route path="/wallet" component={MainWallet} />
                        <Route path="/business" component={MainBusiness} />
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
