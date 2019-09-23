import React, { useState } from 'react';
import { Layout, Menu, Icon, Dropdown, Select } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1336473_wci8yuw8ubp.js',
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

const curlang = (
    <Menu>
        <Menu.Item key="1">
            {/* <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                EN
        </a> */}
            <Select style={{ width: '100%' }}>
                <Option value="lucy">lucy</Option>
                <Option value="asd">asdasd</Option>
                <Option value="dfssdf">lsfsdfsducy</Option>
            </Select>
        </Menu.Item>
        <Menu.Item key="2">
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                UZ
        </a>
        </Menu.Item>
    </Menu>
);


const getMenu = () => (
    <div className="dropdown-container">
        <h2>Title of Dropdown</h2>
        <Select placeholder="Select..." style={{ width: '100%' }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
        </Select>
    </div>
)


function Postnavigator() {
    const [visible, setVisible] = useState(false);

    const handleDropdownVisibility = (val) => {
        console.log('handleDropdownVisibility called', val);
        setVisible(val);
    }

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
                    paddingLeft={10}
                    inlineIndent={1}
                >
                    <Menu.Item key="1">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                Продавцам <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                Помощь <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                Приложение <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <Dropdown overlay={getMenu()} trigger={['click']}
                            onVisibleChange={val => handleDropdownVisibility(val)}
                            visible={visible}
                        >
                            <a className="ant-dropdown-link" href="#">
                                Уз / Русский / RUB<Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to="/other" >
                            <Icon type="heart" />
                            Мои желания </Link>
                    </Menu.Item>
                    {/* <Menu.Item key="8">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                            <Icon type="heart" /> 
                                Мой профиль <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item> */}
                </Menu>
            </div>
        </Header>
    )
}
export default Postnavigator;