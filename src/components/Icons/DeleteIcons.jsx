import React, { useState } from 'react'
import { Icon } from 'antd';

function DeleteIcons() {
    const [deleteHover, setDeleteHover] = useState(false);
    return (
        <Icon onMouseLeave={() => setDeleteHover(false)} onMouseOver={() => setDeleteHover(true)} type="delete" theme={deleteHover ? "filled" : "outlined"} />
    )
}

export default DeleteIcons;