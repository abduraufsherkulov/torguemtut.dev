import React from 'react'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function WishList() {
    function callback(key) {
        console.log(key);
    }
    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Избранные объявления  5" key="1">
                Избранные объявления  5
        </TabPane>
            <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
        </TabPane>
            <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
        </TabPane>
        </Tabs>
    )
}

export default WishList
