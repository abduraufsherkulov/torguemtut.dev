import React from 'react'
import { Tabs, Empty } from 'antd';
import AccountWallet from './AccountWallet';

const { TabPane } = Tabs;

function MainWallet() {
    function callback(key) {
        console.log(key);
    }
    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Баланс" key="1">
                <div className="tab-margins">
                    <AccountWallet />
                </div>
            </TabPane>
            <TabPane tab="Пополнить счеть" key="2">
                <div className="tab-margins">
                    <Empty description={false} />
                </div>
            </TabPane>
            <TabPane tab="История покупки" key="3">
                <div className="tab-margins">
                    <Empty description={false} />
                </div>
            </TabPane>
        </Tabs>
    )
}

export default MainWallet
