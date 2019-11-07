import React from 'react'
import { Tabs } from 'antd';
import SelectedWishes from './SelectedWishes';

const { TabPane } = Tabs;

function WishList() {
    function callback(key) {
        console.log(key);
    }
    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Избранные объявления  5" key="1">
                <SelectedWishes />
            </TabPane>
            <TabPane tab="Избранные продавцы" key="2">
                Избранные продавцы
        </TabPane>
            {/* <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
        </TabPane> */}
        </Tabs>
    )
}

export default WishList
