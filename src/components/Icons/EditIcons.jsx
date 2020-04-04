import React, { useState } from 'react'
import { EditFilled, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function EditIcons({ to }) {
    const [editHover, setEditHover] = useState(false);

    return editHover ? (
        <Link to={to}>
            <EditFilled onMouseLeave={() => setEditHover(false)} onMouseOver={() => setEditHover(true)} />
        </Link>
    ) : (
            <Link to={to}>
                <EditOutlined onMouseLeave={() => setEditHover(false)} onMouseOver={() => setEditHover(true)} />
            </Link>
        )
}

export default EditIcons;