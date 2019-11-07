import React, { useState } from 'react'
import { Icon } from 'antd';

function HeartIcons() {
    const [heartHover, setHeartHover] = useState(false);
    const handleWish = (params) => {
        const endpoint = `https://ttuz.azurewebsites.net/api/news/post-favourite?newsId=${1}`;
        axios({
            method: 'post',
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Icon onClick={handleWish} onMouseLeave={() => setHeartHover(false)} onMouseOver={() => setHeartHover(true)} type="heart" theme={heartHover ? "filled" : "outlined"} />
    )
}

export default HeartIcons;