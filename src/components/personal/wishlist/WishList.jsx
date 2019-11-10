import React, { useContext } from 'react'
import { Tabs } from 'antd';
import SelectedWishes from './SelectedWishes';
import { WishlistContext } from '../../../contexts/WishlistContext';

const { TabPane } = Tabs;

function WishList() {
    const { wishlist } = useContext(WishlistContext)
    function callback(key) {
        console.log(key);
    }
    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab={`Активные  ${wishlist.length}`} key="1">
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
