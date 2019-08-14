import React from 'react';
import { Layout, Row, Col } from 'antd';
import Logo from "../../images/mainlogo.png";
import {Link} from "react-router-dom";

const { Footer } = Layout;

function Foot() {
    return (
        <Footer style={{ textAlign: 'left' }}>
            <div className="container">
                <Row justify="space-between" type="flex">
                    <Col>
                        <Link to="/"><img src={Logo} alt="" /></Link>
                        <p>© {new Date().getFullYear()} torguemtut.uz.</p>
                        <p>Все права защищены.</p>
                    </Col>
                    <Col>
                        <h5>Покупателям</h5>
                        <ul>
                            <li><a href="">Как покупать</a></li>
                            <li><a href="">Как оставить полезный отзыв</a></li>
                            <li><a href="">Правила безопасности</a></li>
                        </ul>
                    </Col>
                    <Col>
                        <h5>Продавцам</h5>
                        <ul>
                            <li><a href="">Тарифы</a></li>
                            <li><a href="">Реклама на сайте</a></li>
                            <li><a href="">Политика конфиденциальности</a></li>
                            <li><a href="">Правила пользования порталом</a></li>
                        </ul>
                    </Col>
                    <Col>
                        <h5>О нас</h5>
                        <ul>
                            <li><a href="">О torguemtut.uz</a></li>
                            <li><a href="">Справка и FAQ</a></li>
                            <li><a href="">Администрация</a></li>
                        </ul>
                    </Col>
                    <Col>
                        <h5>Помощь</h5>
                        <ul>
                            <li><a href="">Партнерство</a></li>
                            <li><a href="">Реклама на сайте</a></li>
                            <li><a href="">Обратная связь</a></li>
                            <li><a href="">Мобильное приложение</a></li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </Footer>
    )
}
export default Foot;