import React, { useState, useContext } from 'react';
import { Layout, Menu, Icon, Dropdown, Select, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const { Header } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1336473_uzl8ge6437g.js',
});

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                EN
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                UZ
        </a>
        </Menu.Item>
    </Menu>
);


const sellers = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                Регистрация
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                Авторизация
        </a>
        </Menu.Item>
        <Menu.Item>
            <Link to="/tariff">Тарифы</Link>
        </Menu.Item>
    </Menu>
);
const help = (
    <Menu>
        <Menu.Item>
            <Link to="/support">
                Служба поддержки
           </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/disputes">
                Споры и жалобы
            </Link>
        </Menu.Item>
    </Menu >
);


const getMenu = () => (
    <div className="dropdown-container">
        <h2 className="switch-lan">Language</h2>
        <Select defaultValue="English" placeholder="Select..." style={{ width: '100%' }}>
            <Option value="Russian">Russian</Option>
            <Option value="Uzbek">Uzbek</Option>
            <Option value="English">English</Option>
        </Select>
        <h2 className="switch-cur">Currency</h2>
        <Select defaultValue="USD" placeholder="Select..." style={{ width: '100%' }}>
            <Option value="USD">USD</Option>
            <Option value="UZS">UZS</Option>
            <Option value="RUB">RUB</Option>
        </Select>
        <Button className="switch-btn" type="primary">Save</Button>
    </div>
)

const loggedUser = (userData, dispatch) => (
    <div className="log-wrapper">
        <div className="d-flex-space-evenly">
            <Avatar style={{ backgroundColor: '#4a3a8a', verticalAlign: 'middle' }}>tt</Avatar>
            <h2 className="log-text">Добро пожаловать, <br /> {userData.id}</h2>
        </div>
    </div>
);
// localStorage.removeItem('username'); window.location.reload()
const defaultText = (
    <div className="log-wrapper">
        <h2 className="log-text">Добро пожаловать в tt.uz</h2>
        <Link className="signin-btn" to="/signup"><Button type="danger">Регистрация</Button></Link>
        <Link className="signup-btn" to="/login" > <Button style={{ backgroundColor: "#ebebeb" }}>Войти</Button> </Link>
    </div>
);

const getAccount = (authContext) => {
    const { userData, dispatch } = authContext;
    // console.log(userData, 'postnav');
    return (
        <Menu style={{ width: "260px" }}>
            {userData ? loggedUser(userData, dispatch) : defaultText}
            <Menu.Divider />
            <Menu.Item>
                <Link to="/myads">
                    <Icon type="container" /> Мои Объявлении
        </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/messages">
                    <Icon type="message" />    Сообщения
        </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/wishlist">
                    <Icon type="heart" />    Избранное
        </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/wallet">
                    <Icon type="wallet" />    Кошелок
        </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/settings">
                    <Icon type="setting" />    Настройки
        </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <a className="signup-btn" onClick={() => { dispatch({ type: 'SIGN_IN' }) }} >
                    <Icon type="poweroff" />  Выход
                    </a>
            </Menu.Item>
        </Menu>
    )
}

function Postnavigator() {
    const authContext = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [visiblelog, setVisiblelog] = useState(false);

    const handleDropdownVisibility = (val) => {
        setVisible(val);
    }
    const handleDropdownVisibilitylog = (val) => {
        setVisiblelog(val);
    }
    // console.log(authContext);
    return (
        <Header style={{ background: "white", padding: "0px", height: "40px" }}>
            <div className="container">
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: '40px', float: "left" }}
                    className="postnavmenu"
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
                    style={{ lineHeight: '40px', float: "right" }}
                    inlineIndent={1}
                >
                    <Menu.Item key="1">
                        <Dropdown overlay={sellers}>
                            <a className="ant-dropdown-link" href="#">
                                Продавцам <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Dropdown overlay={help}>
                            <a className="ant-dropdown-link" href="#">
                                Помощь <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link className="ant-dropdown-link" to="/application">
                            Приложение <Icon type="mobile" />
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <Dropdown overlay={getMenu()} trigger={['click']} placement="bottomRight"
                            onVisibleChange={val => handleDropdownVisibility(val)}
                            visible={visible}
                        >
                            <a className="ant-dropdown-link" href="#">
                                Уз / Русский / RUB<Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to="/add-news-ad" >
                            <Icon type="plus" />
                            Подать объявление </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Dropdown overlay={getAccount(authContext)} placement="bottomRight">
                            <a className="ant-dropdown-link">
                                <Icon type="user" />
                                Мой профиль <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </div>
        </Header>
    )
}
export default Postnavigator;