import React from "react";
import { List, Avatar, Skeleton, message } from "antd";
import HeartIcons from "../../Icons/HeartIcons";
import { momentize } from "../../../helpers/MomentHelper";
import { Link, withRouter } from "react-router-dom";

function ListView({ pagination, listData, catLoading, setListData }) {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    handleChange(page);
                },
                pageSize: 30,
                total: pagination.TotalCount,
            }}
            dataSource={listData}
            footer={<div>{/* <b>ant design</b> footer part */}</div>}
            renderItem={(item) => (
                <List.Item
                    className="ant-card-hoverable"
                    style={{
                        display: "flex",
                        padding: "16px",
                        border:
                            item.tariffs &&
                            item.tariffs.find((x) => x.type == 2)
                                ? "4px solid #543f92"
                                : "none",
                    }}
                    key={item.id}
                    actions={
                        !catLoading && [
                            <HeartIcons
                                setListData={setListData}
                                listData={listData}
                                item={item}
                                favourite={item.favourite}
                            />,
                            <p>Добавлено в {momentize(item.updatedDate)}</p>,
                        ]
                    }
                    extra={
                        !catLoading && (
                            <div className="listExtra">
                                {item.tariffs &&
                                item.tariffs.find((x) => x.type == 1) ? (
                                    <div className="vip-links">
                                        <i className="spanner">VIP</i>
                                    </div>
                                ) : null}

                                <img
                                    style={{
                                        maxWidth: "150px",
                                        maxHeight: "130px",
                                    }}
                                    alt="logo"
                                    src={`https://tt.delivera.uz/Resources/Images/${item.images[0].path}`}
                                />
                            </div>
                        )
                    }
                >
                    <Skeleton loading={catLoading} active avatar>
                        {!catLoading && (
                            <>
                                <List.Item.Meta
                                    // avatar={<Avatar src={`https://tt.delivera.uz/${item.images[0].path}`} />}
                                    title={
                                        <>
                                            <div
                                                style={{
                                                    width: "70%",
                                                    float: "left",
                                                }}
                                            >
                                                <Link to={`/item/${item.id}`}>
                                                    {item.title}
                                                </Link>
                                            </div>
                                            <p
                                                style={{
                                                    display: "inline-block",
                                                    width: "30%",
                                                    textAlign: "right",
                                                }}
                                            >
                                                {item.price.amount}{" "}
                                                {item.price.currencyLabel}
                                            </p>
                                        </>
                                    }
                                    // description={br2nl(item.description)}
                                />
                                {item.content}
                                <p style={{ color: "white" }}>asd</p>
                            </>
                        )}
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}

export default ListView;
