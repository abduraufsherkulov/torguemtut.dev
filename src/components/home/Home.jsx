import React, { Component, useEffect, useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import Search from './Search';
import Categories from './Categories';
import Vip from './Vip';

const { Content } = Layout;

function Home() {
    return (
        <Content>
            <Search />
            <div className="container">
                <Categories />
            </div>
            <Vip />
        </Content>
    )
}

export default Home;