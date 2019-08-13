import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import ConnectBanner from './ConnectBanner';

const { Content } = Layout;

function Tarriff() {
    return (
        <Content style={{ background: "white" }}>
            <ConnectBanner />
        </Content>
    )
}
export default Tarriff;