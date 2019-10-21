import React from 'react'
import { Breadcrumb, Icon } from 'antd'

import { withRouter, Link } from 'react-router-dom'

const breadcrumbNameMap = {
    '/tariff': 'Application List',
    '/login': 'Application1',
    '/signup': 'Application2',
    '/add-news-ad': 'Добавить объявление',
    '/wishlist': 'Избранные',
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
            <Link to="/"><Icon type="home" /></Link>
        </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);
    return (
        <div className="main-breadcrumbs">
            <Breadcrumb separator=">">{breadcrumbItems}</Breadcrumb>
        </div>
    );
});

export default MainBreadcrumbs
