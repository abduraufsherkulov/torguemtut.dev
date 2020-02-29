import React, { useState } from 'react'
import { ReadFilled, ReadOutlined } from '@ant-design/icons';

function ViewIcons() {
    const [heartHover, setHeartHover] = useState(false);

    return heartHover ? (
        <ReadFilled onMouseLeave={() => setHeartHover(false)} onMouseOver={() => setHeartHover(true)} />
    ) : (
            <ReadOutlined onMouseLeave={() => setHeartHover(false)} onMouseOver={() => setHeartHover(true)} />
        )
}

export default ViewIcons;