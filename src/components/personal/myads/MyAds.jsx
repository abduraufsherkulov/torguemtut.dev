import React from 'react'
import { Tabs } from 'antd';
import Active from './Active';

const { TabPane } = Tabs;

function MyAds() {
    function callback(key) {
        console.log(key);
    }
    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Активные  7" key="1">
                <Active />
            </TabPane>
            <TabPane tab="На проверке  0" key="2">
                На проверке  0
        </TabPane>
            <TabPane tab="Архивные  3" key="3">
                Архивные  3
        </TabPane>
        </Tabs>
    )
}

export default MyAds
