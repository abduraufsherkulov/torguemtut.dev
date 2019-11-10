import React, { useState, useContext } from 'react'
import { Icon, message } from 'antd';
import { WishlistContext } from '../../contexts/WishlistContext';
import { AuthContext } from '../../contexts/AuthContext';
import { withRouter } from 'react-router-dom'

function HeartIcons(props) {
    const [heartHover, setHeartHover] = useState("outlined");
    const { addWish, removeWish } = useContext(WishlistContext);
    const { userData } = useContext(AuthContext)
    const wishController = () => {
        if (!userData.token) {
            props.history.push('/login');
            message.info('Пожалуйста, войдите, чтобы добавить', 2);
        } else {
            if (props.favourite) {
                removeWish(props.item, props.listData, props.setListData);
            } else {
                addWish(props.item, props.listData, props.setListData);
            }
        }
    }


    return (
        <Icon onClick={wishController} onMouseLeave={() => setHeartHover("outlined")} onMouseOver={() => setHeartHover("twoTone")} type="heart" theme={props.favourite ? "filled" : heartHover} />
    )
}

export default withRouter(HeartIcons);