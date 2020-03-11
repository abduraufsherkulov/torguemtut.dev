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

let timer = null;

function SubcategoriesFilter({ catId, selectedAttr, setSelectedAttr }) {
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
            console.log(response)
            setCascaderLoading(false)
            setAttr(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [catId])

    const handleSelectChange = (value, id) => {
        console.log(value, id)
        let newArr = [...selectedAttr];
        let index = newArr.findIndex(x => x.AttributeId == id);
        console.log(index)
        if (index > -1 && typeof value == 'undefined') {
            newArr.splice(index, 1);
            setSelectedAttr([...newArr])
            return
        }
        if (index > -1) {
            newArr[index].AttributeId = id;
            newArr[index].Value = value;
            setSelectedAttr([...newArr])
        } else {
            setSelectedAttr([...newArr, { AttributeId: id, Value: value }])
        }


        console.log(selectedAttr)
    }

    const handleInputChange = (value, id, fromto) => {
        console.log(value)
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            let newArr = [...selectedAttr];
            let index = newArr.findIndex(x => x.AttributeId == id);
            console.log(index);
            if (index > -1) {
                newArr[index].AttributeId = id;
                if (fromto == 'from') {
                    if (value != '') {
                        newArr[index].ValueFrom = value;
                    } else {
                        delete newArr[index].ValueFrom;
                    }
                } else {
                    if (value != '') {
                        newArr[index].ValueTo = value;
                    } else {
                        delete newArr[index].ValueTo;
                    }
                }

                if (typeof newArr[index].ValueFrom == 'undefined' && typeof newArr[index].ValueTo == 'undefined') {
                    newArr.splice(index, 1);
                }
                setSelectedAttr([...newArr]);
            } else {
                if (fromto == 'from') {
                    setSelectedAttr([...newArr, { AttributeId: id, ValueFrom: value }])
                } else {
                    setSelectedAttr([...newArr, { AttributeId: id, ValueTo: value }])
                }
            }

        }, 600);
    }

    function AttrInput({ item, pref, fromto }) {
        return (
            <Form.Item name={item.name + fromto}>
                <Input allowClear onChange={(e) => handleInputChange(e.target.value, item.id, fromto)} placeholder={`${item.title} ${pref}`} />
            </Form.Item>
        )
    }

    function AttrSelect({ item }) {
        return (
            <Form.Item name={item.name}>
                <Select
                    allowClear
                    onChange={(val) => handleSelectChange(val, item.id)}
                    placeholder={item.title}>
                    {
                        item.attributeOptions.map((attritem, index) => {
                            return (
                                <Option key={attritem.id} id={attritem.id} value={attritem.value}>{attritem.value}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        )
    }

    return (
        <Form
            layout="inline"
            className="components-table-demo-control-bar"
            style={{ marginBottom: 16 }}
        // onFieldsChange={(one, two) => handleSelectChange(one, two)}
        >
            {attr.map((item, index) => {
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
            })}
        </Form>
    )
}

export default SubcategoriesFilter
