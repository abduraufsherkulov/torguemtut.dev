import { Upload, Modal, Form } from 'antd';
import React, { useState, useContext } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../../contexts/AuthContext';


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function PicturesWall(props) {
    const [previewVisible, setpreviewVisible] = useState(false)
    const [previewImage, setpreviewImage] = useState('');
    const [fileList, setfileList] = useState([])
    const { userData, dispatch } = useContext(AuthContext);

    const handleCancel = () => setpreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setpreviewVisible(true);
        setpreviewImage(file.url || file.preview);

    };

    const handleChange = ({ fileList, file }) => {
        console.log(file)

        let newArr = [...fileList];
        if (typeof file.response != 'undefined') {
            file.url = file.response.url;
        }
        newArr[file] = file;
        setfileList(newArr);
        if (fileList.length > 0) {
            props.setFileValidate("");
            props.setFileRequired("");
        }

        console.log(fileList);
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    return (
        <React.Fragment>
            <Form.Item
                name="photos" label="Фотографии" validateStatus={props.fileValidate} help={props.fileRequired}>
                <Upload
                    action="https://tt.delivera.uz/api/news/upload-image"
                    accept=".png, .jpeg, .jpg"
                    listType="picture-card"
                    fileList={fileList}
                    name="image"
                    defaultFileList={[]}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    headers={{ Authorization: `Bearer ${userData.token}` }}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
            </Form.Item>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </React.Fragment>
    )
}

export default PicturesWall;