import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import Search from './Search';
import Categories from './Categories';

const { Content } = Layout;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
                <Content>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                        <Search/>
                        <Categories/>
                </Content>
        );
    }
}

export default Home;