import React, { useState, useContext } from 'react';
import { Layout, Menu, Dropdown, Select, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { IconFont } from '../Icons/Icons';
import {
    PoweroffOutlined,
    ContainerOutlined,
    ShopOutlined,
    HeartOutlined,
    WalletOutlined,
    SettingOutlined,
    DownOutlined,
    PlusOutlined,
    UserOutlined,
    MobileOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

const menu = (
    <Menu>
        <Menu.Item>
            <a rel="noopener noreferrer" href="#">
                EN
        </a>
        </Menu.Item>
        <Menu.Item>
            <a rel="noopener noreferrer" href="#">
                UZ
        </a>
        </Menu.Item>
    </Menu>
);


const sellers = (
    <Menu>
        <Menu.Item>
            <a rel="noopener noreferrer" href="#">
                Регистрация
        </a>
        </Menu.Item>
        <Menu.Item>
            <a rel="noopener noreferrer" href="#">
                Авторизация
        </a>
        </Menu.Item>
        <Menu.Item>
            <Link to="/tariff">Тарифы</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/ratings">Рейтинг продавцов</Link>
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
        <Menu.Item>
            <Link to="/newsdetails">
                News details
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
        <div className="d-flex-vertical">
            <Avatar icon={<UserOutlined />} size="large" style={{ backgroundColor: '#4a3a8a', verticalAlign: 'middle' }} />
            <Link to="/settings"><h2 className="log-text">Добро пожаловать, <br /> {userData.id}</h2></Link>
        </div>
    </div>
);
// localStorage.removeItem('username'); window.location.reload()
const defaultText = (
    <div className="log-wrapper">
        <Link to="/settings"><h2 className="log-text">Добро пожаловать в tt.uz</h2></Link>
        <Link className="signin-btn" to="/signup"><Button type="danger">Регистрация</Button></Link>
        <Link className="signup-btn" to="/login" > <Button style={{ backgroundColor: "#ebebeb" }}>Войти</Button> </Link>
    </div>
);

const getAccount = (authContext) => {
    const { userData, dispatch } = authContext;
    // console.log(userData, 'postnav');
    const logOut = () => {
        return (
            <Menu.Item>
                <a className="signup-btn" onClick={() => { dispatch({ type: 'SIGN_IN' }) }} >
                    <PoweroffOutlined />  Выход
                    </a>
            </Menu.Item>
        )
    }
    console.log(userData);
    return (
        <Menu style={{ width: "260px" }}>
            {userData.token ? loggedUser(userData, dispatch) : defaultText}
            <Menu.Divider />
            <Menu.Item>
                <Link to="/myads">
                    <ContainerOutlined /> Мои Объявлении
        </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/business">
                    <ShopOutlined />    Бизнес
        </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/wishlist">
                    <HeartOutlined />    Избранное
        </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/wallet">
                    <WalletOutlined />    Баланс
        </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/settings">
                    <SettingOutlined />    Настройки
        </Link>
            </Menu.Item>
            {userData.token ? <Menu.Divider /> : null}
            {userData.token ? logOut() : null}
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
                {/* <Menu
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
                </Menu> */}
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: '40px', float: "right" }}
                    inlineIndent={1}
                    className="post-nav-li"
                >
                    <Menu.Item key="1">
                        <Dropdown overlay={sellers}>
                            <a className="ant-dropdown-link" href="#">
                                Продавцам <DownOutlined />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Dropdown overlay={help}>
                            <a className="ant-dropdown-link" href="#">
                                Помощь <DownOutlined />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link className="ant-dropdown-link" to="/application">
                            Приложение <MobileOutlined />
                        </Link>
                    </Menu.Item>

                    {/* <Menu.Item key="4">
                        <Dropdown overlay={getMenu()} trigger={['click']} placement="bottomRight"
                            onVisibleChange={val => handleDropdownVisibility(val)}
                            visible={visible}
                        >
                            <a className="ant-dropdown-link" href="#">
                                Уз / Русский / RUB<DownOutlined />
                            </a>
                        </Dropdown>
                    </Menu.Item> */}
                    <Menu.Item key="7">
                        <Link to="/add-news-ad" >
                            <PlusOutlined />
                            Подать объявление </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Dropdown overlay={getAccount(authContext)} placement="bottomRight">
                            <a className="ant-dropdown-link">
                                <UserOutlined />
                                Мой профиль <DownOutlined />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </div>
        </Header>
    )
}
export default Postnavigator;