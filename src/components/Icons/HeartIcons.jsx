import React, { useState, useContext } from 'react'
import { Icon } from 'antd';
import { WishlistContext } from '../../contexts/WishlistContext';

function HeartIcons() {
    const [heartHover, setHeartHover] = useState("outlined");

    const { addWish } = useContext(WishlistContext);

    return (
        <Icon onClick={addWish} onMouseLeave={() => setHeartHover("outlined")} onMouseOver={() => setHeartHover("twoTone")} type="heart" theme={heartHover} />
    )
}

export default HeartIcons;