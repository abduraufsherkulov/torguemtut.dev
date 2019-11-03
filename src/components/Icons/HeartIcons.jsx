import React, { useState } from 'react'
import { Icon } from 'antd';

function HeartIcons() {
    const [heartHover, setHeartHover] = useState(false);
    return (
        <Icon onMouseLeave={() => setHeartHover(false)} onMouseOver={() => setHeartHover(true)} type="heart" theme={heartHover ? "filled" : "outlined"} />
    )
}

export default HeartIcons;