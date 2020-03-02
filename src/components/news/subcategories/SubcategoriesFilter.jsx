import React, { useEffect, useState, useMemo } from 'react'
import {
    Form,
    Input,
    Select,
    Divider
} from 'antd';
import axios from 'axios'
const { TextArea } = Input;
const { Option } = Select;


function SubcategoriesFilter({ catId }) {
    const [cascaderLoading, setCascaderLoading] = useState(true)
    const [attr, setAttr] = useState([]);

    useEffect(() => {
        const attr = catId;
        const endpoint = `https://ttuz.azurewebsites.net/api/category/get-category-attributes?Id=${attr}`;
        axios({
            method: 'get',
            url: endpoint,
            headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            setCascaderLoading(false)
            setAttr(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [catId])

    const handleSelectChange = (params) => {
        console.log(params)
    }


    function AttrInput({ item, pref, fromto }) {
        return (
            <Form.Item name={item.name + fromto} rules={[
                {
                    required: true,
                    message: `Где ${item.title}?`,
                },
            ]}>
                <Input placeholder={`${item.title} ${pref}`} />
            </Form.Item>
        )
    }

    function AttrSelect({ item }) {
        return (
            <Form.Item name={item.name} rules={[
                {
                    required: item.required,
                    message: `Где ${item.title}?`,
                },
            ]}>
                <Select
                    labelInValue
                    placeholder={item.title}
                    onChange={handleSelectChange}>
                    {
                        item.attributeOptions.map((attritem, index) => {
                            return (
                                <Option key={attritem.id} value={attritem.value}>{attritem.value}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        )
    }
    const Just = () => {
        return (
            attr.map((item, index) => {
                if (item.attributeOptions.length > 0) {
                    return (
                        <AttrSelect item={item} key={item.name} />
                    )
                } else {
                    return (
                        <div key={item.name} style={{ textAlign: 'center' }}>
                            <AttrInput item={item} pref="от" fromto="from" />
                            <Divider style={{ marginRight: "16px", background: "#0098d0", height: '26%' }} orientation="center" type="vertical" />
                            <AttrInput item={item} pref="до" fromto="to" />
                        </div>
                    )
                }
            })
        )
    }

    const MemoizedValue = useMemo(() => Just, [attr]);
    return (
        <Form
            layout="inline"
            className="components-table-demo-control-bar"
            style={{ marginBottom: 16 }}
        >
            <MemoizedValue />
        </Form>
    )
}

export default SubcategoriesFilter
