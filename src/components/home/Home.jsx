import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import Search from './Search';
import Categories from './Categories';
import Vip from './Vip';

const { Content } = Layout;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Content>
                <Search />
                <div className="container">
                    <Categories />
                </div>
                <Vip />
            </Content>
        );
    }
}

export default Home;