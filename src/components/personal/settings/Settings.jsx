import React, { useContext } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import {
    ShareAltOutlined,
    UserOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
const { Paragraph } = Typography;

function Settings(props) {
    const { userData } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    };
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                <Input
                    prefix={
                        <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Email"
                    value={userData.email}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={
                        <PhoneOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Phone"
                    value={userData.phone}
                />
            </Form.Item>
            <Form.Item>
                Программа лояльности Дарим подарочные сертификаты на покупку
                услуг у нас на сайте на 10 000 сум, 20 000 сум и 100 000 сум
                Ваша личная реферальная ссылка{" "}
                <Paragraph
                style={{display: 'inline-block', margin: 0}}
                    copyable
                >{`https://tt.uz/signup/?ReferrerCode=${userData.referralCode}`}</Paragraph>{" "}Кнопка Данные сертификаты вы можете получить при
                выполнении следующих при следующих действиях. 1. Позови друга
                -20 000 сум (многократное использование) ВЫ пригласили (счетчик
                друзей) 2. За каждые 100 друзей - 100 000 сум 3. Скачай
                приложение - 20 000 Сум (выполняется 1 раз) 4. Напиши отзыв о
                приложении 10 000 сум (выполняется 1 раз) 5. Запиши видео о
                своем товаре 20 000 (1 объявление - 1 видео) 6. За каждые 100
                друзей - 100 000 сум Данные нами сертификатами вы сможете только
                оплатит платные услуги нашей компании на сайте tt.uz С платными
                услугами вы можете ознакомиться по ссылке: ————————
            </Form.Item>
            <Form.Item>
                <Button>Facebook</Button>
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
}

export default withRouter(Settings);
