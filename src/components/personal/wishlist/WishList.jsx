import React, { useContext } from 'react'
import { Tabs } from 'antd';
import SelectedWishes from './SelectedWishes';
import { WishlistContext } from '../../../contexts/WishlistContext';
import SelectedVendors from './SelectedVendors';
import { WishlistVendorContext } from '../../../contexts/WishlistVendorContext';

const { TabPane } = Tabs;

function WishList() {
    const { wishlist } = useContext(WishlistContext)
    const { wishlistvendor } = useContext(WishlistVendorContext)
    function callback(key) {
        console.log(key);
    }
    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab={`Избранные продукты  ${wishlist.length}`} key="1">
                <SelectedWishes />
            </TabPane>
            <TabPane tab={`Избранные продавцы ${wishlistvendor.length}`} key="2">
                <SelectedVendors />
            </TabPane>
            {/* <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
        </TabPane> */}
        </Tabs>
    )
}

export default WishList
