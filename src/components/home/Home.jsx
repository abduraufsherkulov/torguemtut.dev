import React, { Component, useEffect, useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import Search from './Search';
import Categories from './Categories';
import Vip from './Vip';
import TopVendors from './TopVendors';
import InfoSection from './InfoSection';
import GetPhone from './GetPhone';

const { Content } = Layout;

function Home() {
    return (
        <Content style={{ background: "white" }}>
            <Search />
            <div className="container">
                <Categories />
            </div>
            <Vip />
            <TopVendors />
            <InfoSection />
            <GetPhone />
        </Content>
    )
}

export default Home;