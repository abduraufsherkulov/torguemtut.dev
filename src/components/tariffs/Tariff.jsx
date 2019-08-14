import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import ConnectBanner from './ConnectBanner';
import CarouselType from './CarouselType';
import HowWorks from './HowWorks';
import GetPhone from '../home/GetPhone';

const { Content } = Layout;

function Tarriff() {
    return (
        <Content id="tariffs" style={{ background: "white" }}>
            <ConnectBanner />
            <CarouselType />
            <HowWorks />
            <GetPhone />
        </Content>
    )
}
export default Tarriff;