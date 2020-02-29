import React, { useState, useContext } from 'react'
import { message } from 'antd';
import { AuthContext } from '../../contexts/AuthContext';
import { withRouter } from 'react-router-dom'
import { WishlistVendorContext } from '../../contexts/WishlistVendorContext';
import { HeartFilled, HeartTwoTone, HeartOutlined } from '@ant-design/icons';

function VendorHeartIcons(props) {
    const [heartHover, setHeartHover] = useState(false);
    const { addWish, removeWish } = useContext(WishlistVendorContext);
    const { userData } = useContext(AuthContext);
    const wishController = () => {
        if (!userData.token) {
            props.history.push('/login');
            message.info('Пожалуйста, войдите, чтобы добавить', 2);
        } else {
            if (props.vendorFavourite) {
                removeWish(props.item, props.listData, props.setListData, props.single);
            } else {
                addWish(props.item, props.listData, props.setListData, props.single);
            }
        }
    }
    return props.vendorFavourite ? (
        <HeartFilled onClick={wishController} />
    ) : (
            heartHover ? (
                <HeartTwoTone onClick={wishController} onMouseLeave={() => setHeartHover(false)} onMouseOver={() => setHeartHover(true)} />
            ) : (
                    <HeartOutlined onClick={wishController} onMouseLeave={() => setHeartHover(false)} onMouseOver={() => setHeartHover(true)} />
                )
        )
}

export default withRouter(VendorHeartIcons);