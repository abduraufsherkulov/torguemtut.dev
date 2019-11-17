import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'antd';
import TTCARD from '../../../images/tt_card.jpg';
import LOGO from '../../../images/tt.png';
import { AuthContext } from '../../../contexts/AuthContext';
import { BalanceContext } from '../../../contexts/BalanceContext';

function AccountWallet(props) {
    const { balance, setBalance } = useContext(BalanceContext);
    const { userData } = useContext(AuthContext)
    console.log(balance)
    return (
        <div id="accountwallet">
            <div className="container">
                <Row type="flex">
                    <Col span={12}>
                        <div className="ttcard">
                            <img className="ttcardimg" style={{ width: "100%", borderRadius: '20px' }} src={TTCARD} />
                            <div className="ttcardinfo">
                                <div className="card-img-container">
                                    <img src={LOGO} alt="" />
                                </div>
                                <p>ID: {userData.id}</p>
                                <h2 >{balance} TT coin</h2>
                                <h1>JOHN DOE</h1>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AccountWallet
