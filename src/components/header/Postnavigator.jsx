import React from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1336473_o9j4z07c5lo.js',
});

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                EN
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                UZ
        </a>
        </Menu.Item>
    </Menu>
);


function Postnavigator() {
    return (
        <Header style={{ background: "white", padding: "0px" }}>
            <div className="container">
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: "left" }}
                >
                    <Menu.Item key="2" disabled style={{ paddingLeft: "0px" }}>
                        Местоположение:
                </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/other" >
                            <IconFont type="icon-NAVIGATION" />
                            Выбрать регион
                    </Link>
                    </Menu.Item>
                </Menu>
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: "right" }}
                >
                    <Menu.Item key="1">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                RU <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/other" >
                            <Icon type="mail" />
                            Сообщения
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/other" >
                            <Icon type="heart" />
                            Избранное </Link>
                    </Menu.Item>
                </Menu>
            </div>
        </Header>
    )
}
export default Postnavigator;