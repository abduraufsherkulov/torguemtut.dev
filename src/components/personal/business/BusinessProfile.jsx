import React from "react";
import MainBusiness from "./MainBusiness";
import { Select } from "antd";
import { useContext } from "react";
import { BusinessContext } from "../../../contexts/BusinessContext";

const { Option } = Select;

function BusinessProfile() {
    const { businessInfo, selectedBusiness, setSelectedBusiness } = useContext(
        BusinessContext
    );
    const handleChange = (params) => {
        let found = businessInfo.find((item) => item.id == params);
        found =
            found == undefined
                ? {}
                : found;
        setSelectedBusiness(found);
    };
    return (
        <div>
            {/* <Select
                defaultValue="new"
                style={{ width: 120 }}
                onChange={handleChange}
            >
                <Option value="new">Новый</Option>
                {businessInfo &&
                    businessInfo.map((item, index) => (
                        <Option key={index} value={item.id}>
                            {item.name}
                        </Option>
                    ))}
            </Select> */}
            <MainBusiness />
        </div>
    );
}

export default BusinessProfile;
