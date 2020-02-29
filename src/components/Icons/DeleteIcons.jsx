import React, { useState } from 'react'
import { DeleteFilled, DeleteOutlined } from '@ant-design/icons';

function DeleteIcons() {
    const [deleteHover, setDeleteHover] = useState(false);

    return deleteHover ? (
        <DeleteFilled onMouseLeave={() => setDeleteHover(false)} onMouseOver={() => setDeleteHover(true)} />
    ) : (
            <DeleteOutlined onMouseLeave={() => setDeleteHover(false)} onMouseOver={() => setDeleteHover(true)} />
        )
}

export default DeleteIcons;