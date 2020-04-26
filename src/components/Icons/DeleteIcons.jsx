import React, { useState, useContext } from "react";
import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Switch, message } from "antd";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

function DeleteIcons({
    perItem,
    fromAds,
    fromSetAds,
    toAds,
    toSetAds,
    fromPagination,
    fromSetPagination,
    toPagination,
    toSetPagination,
    toStatus,
}) {
    const { userData } = useContext(AuthContext);
    const [deleteHover, setDeleteHover] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleVisibleChange = () => {
        setVisible(true);
    };

    const confirm = () => {
        const endpoint = `https://tt.delivera.uz/api/news/change-status?Id=${perItem.id}&status=${toStatus}`;
        console.log(endpoint);
        axios({
            method: "post",
            url: endpoint,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then((response) => {
                console.log(response);
                let fromTempAds = [...fromAds];
                message.success("Next step.");
                setVisible(false);
                fromTempAds = fromTempAds.filter(
                    (each) => each.id != perItem.id
                );
                toSetAds([...toAds, perItem]);
                fromSetPagination({
                    ...fromPagination,
                    TotalCount: fromPagination.TotalCount - 1,
                });
                toSetPagination({
                    ...toPagination,
                    TotalCount: toPagination.TotalCount + 1,
                });

                fromSetAds(fromTempAds);
            })
            .catch((response) => {});
    };

    const cancel = () => {
        setVisible(false);
        message.error("Click on cancel.");
    };

    return deleteHover ? (
        <Popconfirm
            title="Are you sure delete this task?"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <DeleteFilled
                onMouseLeave={() =>
                    !visible ? setDeleteHover(false) : setDeleteHover(true)
                }
                onMouseOver={() => setDeleteHover(true)}
            />
        </Popconfirm>
    ) : (
        <DeleteOutlined
            onMouseLeave={() => setDeleteHover(false)}
            onMouseOver={() => setDeleteHover(true)}
        />
    );
}

export default DeleteIcons;
