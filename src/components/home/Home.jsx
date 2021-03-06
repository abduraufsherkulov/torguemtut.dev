import React, { useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import MainSearch from './MainSearch';
import Categories from './Categories';
import Vip from './Vip';
import VipPopular from './VipPopular';
import InfoSection from './InfoSection';
import GetPhone from './GetPhone';
import CategoriesAndSlider from './CategoriesAndSlider';

const { Content } = Layout;

function Home() {
    return (
        <Content style={{ background: "white" }}>
            <CategoriesAndSlider />
            {/* <MainSearch /> */}
            {/* <div className="container">
                <Categories />
            </div> */}
            <Vip />
            <VipPopular />
            <InfoSection />
            <GetPhone />
        </Content>
    )
}

export default Home;