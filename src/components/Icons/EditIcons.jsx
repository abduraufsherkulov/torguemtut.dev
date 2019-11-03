import React, { useState } from 'react'
import { Icon } from 'antd';

function EditIcons() {
    const [editHover, setEditHover] = useState(false);
    return (
        <Icon onMouseLeave={() => setEditHover(false)} onMouseOver={() => setEditHover(true)} type="edit" theme={editHover ? "filled" : "outlined"} />
    )
}

export default EditIcons;