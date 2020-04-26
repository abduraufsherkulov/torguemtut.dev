import React from "react";
import {
    AppstoreOutlined,
    UnorderedListOutlined,
    AppstoreFilled,
} from "@ant-design/icons";

function TypeFilters({ handleType, gallery }) {
    return (
        <div style={{textAlign: 'right'}}>
            {gallery ? (
                <>
                    <AppstoreFilled
                        style={{ color: "#029cd4", fontSize: "30px" }}
                    />
                    <UnorderedListOutlined
                        onClick={() => handleType(false)}
                        style={{ fontSize: "30px" }}
                    />
                </>
            ) : (
                <>
                    <AppstoreOutlined
                        onClick={() => handleType(true)}
                        style={{ fontSize: "30px" }}
                    />
                    <UnorderedListOutlined
                        style={{ color: "#029cd4", fontSize: "30px" }}
                    />
                </>
            )}
        </div>
    );
}

export default TypeFilters;
