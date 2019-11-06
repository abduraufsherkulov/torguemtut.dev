import React, { useState, useContext } from 'react'
import { Tabs } from 'antd';
import Active from './Active';
import { MyAdsContext } from '../../../contexts/MyAds';

const { TabPane } = Tabs;

function MyAds() {
    const { activeKey, setActiveKey } = useContext(MyAdsContext);
    // const [keyValue, setKeyValue] = useState("1")
    function changeTab(key) {
        setKeyValue(key);
    }
    return (
        <Tabs defaultActiveKey="active" activeKey={activeKey} onChange={setActiveKey}>
            <TabPane tab="Активные  7" key="active">
                <Active />
            </TabPane>
            <TabPane tab="На проверке  0" key="waiting">
                На проверке  0
            </TabPane>
            <TabPane tab="Архивные  3" key="archived">
                Архивные  3
            </TabPane>
        </Tabs>
    )
}

export default MyAds
