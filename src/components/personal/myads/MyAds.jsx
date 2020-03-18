import React, { useState, useContext } from 'react'
import { MyAdsContext } from '../../../contexts/MyAdsContext';
import { AdsActiveContext } from '../../../contexts/AdsActiveContext';
import { AdsArchiveContext } from '../../../contexts/AdsArchiveContext';
import { AdsWaitingContext } from '../../../contexts/AdsWaitingContext';
import { Tabs } from 'antd';
import Active from './Active';
import Waiting from './Waiting';
import Archive from './Archive';

const { TabPane } = Tabs;

function MyAds() {
    const { waitingAds, pagination: paginationWaiting } = useContext(AdsWaitingContext);
    const { activeAds, pagination: paginationActive } = useContext(AdsActiveContext);
    const { archiveAds, pagination: paginationArchive } = useContext(AdsArchiveContext);
    const { activeKey, setActiveKey } = useContext(MyAdsContext);
    return (
        <Tabs defaultActiveKey="active" activeKey={activeKey} onChange={setActiveKey}>
            <TabPane tab={`Активные  ${paginationActive.TotalCount}`} key="active">
                <Active />
            </TabPane>
            <TabPane tab={`На проверке  ${paginationWaiting.TotalCount}`} key="waiting">
                <Waiting />
            </TabPane>
            <TabPane tab={`Архивные  ${paginationArchive.TotalCount}`} key="archived">
                <Archive />
            </TabPane>
        </Tabs>
    )
}

export default MyAds
