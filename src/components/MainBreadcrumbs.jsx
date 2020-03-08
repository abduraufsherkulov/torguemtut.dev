import React from 'react'
import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons';
import { withRouter, Link } from 'react-router-dom'

const breadcrumbNameMap = {
    '/tariff': 'Тарифы',
    '/login': 'Авторизация',
    '/signup': 'Регистрация',
    '/add-news-ad': 'Добавить объявление',
    '/wishlist': 'Избранные',
    '/myads': 'Мои Объявлении',
    '/settings': 'Настройки',
    '/business': 'Сообщении',
    '/wallet': 'Кошелок',
    '/privacypolicy': 'Политика конфиденциальности',
    '/howpay': 'Как оплатить',
    '/vendorproducts': 'Автор'
};

const MainBreadcrumbs = withRouter(props => {
    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/"><HomeOutlined /></Link>
        </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);
    return (
        <div className="main-breadcrumbs">
            <Breadcrumb separator=">">{breadcrumbItems}</Breadcrumb>
        </div>
    );
});

export default MainBreadcrumbs
