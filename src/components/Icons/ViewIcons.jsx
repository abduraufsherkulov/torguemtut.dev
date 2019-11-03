import React, { useState } from 'react'
import { Icon } from 'antd';

function ViewIcons() {
    const [heartHover, setHeartHover] = useState(false);
    return (
        <Icon onMouseLeave={() => setHeartHover(false)} onMouseOver={() => setHeartHover(true)} type="read" theme={heartHover ? "filled" : "outlined"} />
    )
}

export default ViewIcons;