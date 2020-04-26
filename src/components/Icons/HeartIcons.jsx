import React, { useState, useContext } from "react";
import { message } from "antd";
import { WishlistContext } from "../../contexts/WishlistContext";
import { AuthContext } from "../../contexts/AuthContext";
import { withRouter } from "react-router-dom";
import { HeartFilled, HeartTwoTone, HeartOutlined } from "@ant-design/icons";

function HeartIcons(props) {
    const [heartHover, setHeartHover] = useState(false);
    const { addWish, removeWish } = useContext(WishlistContext);
    const { userData } = useContext(AuthContext);
    const wishController = () => {
        if (!userData.token) {
            props.history.push("/login");
            message.info("Пожалуйста, войдите, чтобы добавить", 2);
        } else {
            if (props.favourite) {
                console.log(props.listData)
                removeWish(props.item, props.listData, props.setListData);
            } else {
                addWish(props.item, props.listData, props.setListData);
            }
        }
    };
    return props.favourite ? (
        <HeartFilled onClick={wishController} />
    ) : heartHover ? (
        <HeartTwoTone
            onClick={wishController}
            onMouseLeave={() => setHeartHover(false)}
            onMouseOver={() => setHeartHover(true)}
        />
    ) : (
        <HeartOutlined
            onClick={wishController}
            onMouseLeave={() => setHeartHover(false)}
            onMouseOver={() => setHeartHover(true)}
        />
    );
}

export default withRouter(HeartIcons);
