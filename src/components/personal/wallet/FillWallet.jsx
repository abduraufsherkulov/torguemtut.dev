import React, { useContext, useState } from 'react'
import axios from 'axios'
import {
     Form,
     Input,
     Button, Row, Col
} from 'antd';
import { payme } from '../../../helpers/PaymentHelpers';

import { withRouter } from 'react-router-dom'
import PaymeLogo from '../../../images/payme.png'
import ClickLogo from '../../../images/click.png'
import { AuthContext } from '../../../contexts/AuthContext';

function FillWallet() {
     const [form] = Form.useForm();
     const { userData } = useContext(AuthContext);
     const [amount, setAmount] = useState(5000)
     console.log(payme.merchandId, userData.id, 'two')
     return (
          <React.Fragment>
               <form
                    method="POST"
                    action={payme.action}
               >
                    <input type="hidden" name="merchant" value={payme.merchandId} />
                    <input type="hidden" name="account[userId]" value={userData.id} />
                    <input type="hidden" name="amount" value={amount} />
                    <Row type="flex" justify="space-between">
                         <Col span={4}><img style={{ maxHeight: "38px" }} src={PaymeLogo} /></Col>
                         <Col span={8}><Input onChange={(val) => setAmount(val)} placeholder="Сумма" type="number" value={amount} /></Col>
                         <Col span={12}>< Button style={{ marginLeft: "10px" }} type="primary" htmlType="submit">
                              Оплатить с помощью <b> Payme</b>
                         </Button></Col>
                    </Row>
               </form>

               <form
                    layout="inline"
               // action={payme.action}
               >
                    <input type="hidden" name="merchant" value={payme.merchandId} />
                    <input type="hidden" name="account[userId]" value={userData.id} />
                    <Row type="flex" justify="space-between">
                         <Col span={4}><img style={{ maxHeight: "38px" }} src={ClickLogo} /></Col>
                         <Col span={8}><Input name="amount" defaultValue="5000" placeholder="Сумма" type="number" /></Col>
                         <Col span={12}>< Button style={{ marginLeft: "10px" }} type="primary" htmlType="submit">
                              Оплатить с помощью <b> Click</b>
                         </Button></Col>
                    </Row>



               </form>

               {/* <form method="POST" action="https://test.paycom.uz">

                    <input type="hidden" name="merchant" value="{Merchant ID}" />
                    <input type="hidden" name="amount" value="{сумма чека в ТИИНАХ}" />
                    <input type="hidden" name="account[{field_name}]" value="{field_value}" />
                    <input type="hidden" name="lang" value="ru" />
                    <input type="hidden" name="currency" value="860" />

                    <input type="hidden" name="callback" value="{url возврата после платежа}" />

                    <input type="hidden" name="callback_timeout" value="{miliseconds}" />

                    <input type="hidden" name="payment" value="{payment_id}" />
                    <input type="hidden" name="description" value="{Описание платежа}" />
                    <input type="hidden" name="detail" value="{JSON объект детализации в BASE64}" />

                    <button type="submit">Оплатить с помощью <b>Payme</b></button>
               </form> */}

          </React.Fragment >
     )
}

export default withRouter(FillWallet);