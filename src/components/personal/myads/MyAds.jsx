import React, { useState, useContext } from 'react'
import { Tabs } from 'antd';
import Active from './Active';
import { MyAdsContext } from '../../../contexts/MyAdsContext';
import Waiting from './Waiting';

const { TabPane } = Tabs;

function MyAds() {
    const { myAds, activeKey, setActiveKey } = useContext(MyAdsContext);
    // const [keyValue, setKeyValue] = useState("1")
    const waiting = myAds.filter(item => item.status == 1);
    const active = myAds.filter(item => item.status == 2);
    const archived = myAds.filter(item => item.status == 3);

    return (
        <Tabs defaultActiveKey="active" activeKey={activeKey} onChange={setActiveKey}>
            <TabPane tab={`Активные  ${active.length}`} key="active">
                <Active />
            </TabPane>
            <TabPane tab={`На проверке  ${waiting.length}`} key="waiting">
                <Waiting />
            </TabPane>
            <TabPane tab={`Архивные  ${archived.length}`} key="archived">
                Архивные  3
            </TabPane>
        </Tabs>
    )
}

export default MyAds
