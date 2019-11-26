import React, { useState, useContext } from 'react'
import { Icon, message } from 'antd';
import { AuthContext } from '../../contexts/AuthContext';
import { withRouter } from 'react-router-dom'
import { WishlistVendorContext } from '../../contexts/WishlistVendorContext';

function VendorHeartIcons(props) {
    const [heartHover, setHeartHover] = useState("outlined");
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
    return (
        <Icon onClick={wishController} onMouseLeave={() => setHeartHover("outlined")} onMouseOver={() => setHeartHover("twoTone")} type="heart" theme={props.vendorFavourite ? "filled" : heartHover} />
    )
}

export default withRouter(VendorHeartIcons);