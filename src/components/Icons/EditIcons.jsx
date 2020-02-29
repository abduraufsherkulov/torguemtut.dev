import React, { useState } from 'react'
import { EditFilled, EditOutlined } from '@ant-design/icons';

function EditIcons() {
    const [editHover, setEditHover] = useState(false);

    return editHover ? (
        <EditFilled onMouseLeave={() => setEditHover(false)} onMouseOver={() => setEditHover(true)} />
    ) : (
            <EditOutlined onMouseLeave={() => setEditHover(false)} onMouseOver={() => setEditHover(true)} />
        )
}

export default EditIcons;