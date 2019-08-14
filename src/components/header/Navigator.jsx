import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import Logo from "../../images/mainlogo.png";

const { Header } = Layout;

function Navigator() {
    return (
        <Header style={{ background: "white", padding: "0px" }}>
            <div className="container">

                <Link to="/"><img style={logo} src={Logo} className="logo" alt="torguemtut.uz logo" /></Link>
                <Menu
                    theme="light"
                    mode="horizontal"
                    // defaultSelectedKeys={['1']}
                    style={{ lineHeight: '62px', float: "left" }}
                >
                    <Menu.Item key="1"><Link to="/tariff" > Тарифы </Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/other" > Мобильное приложение </Link></Menu.Item>
                    <Menu.Item key="3">О проекте</Menu.Item>
                </Menu>
                <Menu
                    theme="light"
                    mode="horizontal"
                    // defaultSelectedKeys={['1']}
                    style={{ lineHeight: '62px', float: "right" }}
                >
                    <Menu.Item key="1"><Link to="/" > <Button type="primary">Добавить объявление</Button> </Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/" > <Button style={{ backgroundColor: "#ebebeb" }}>Войти</Button> </Link></Menu.Item>
                </Menu></div>
        </Header>
    )
}
const logo = {
    margin: "14px 24px 14px 0",
    float: "left"
}
export default Navigator;