import { Upload, Modal, Form } from 'antd';
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';
import { PlusOutlined } from '@ant-design/icons';


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function UploadPhoto({ defaultUrl }) {
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
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    return (
        <React.Fragment>
            <Form.Item
                name="photos" label="Фотографии" rules={[
                    {
                        required: true,
                        message: 'Где Фото!',
                    },
                ]}>
                <Upload
                    action="https://tt.delivera.uz/api/news/upload-image"
                    accept=".png, .jpeg, .jpg"
                    listType="picture-card"
                    fileList={fileList}
                    name="image"
                    // defaultFileList={[{
                    //     uid: '-1',
                    //     name: 'xxx.png',
                    //     status: 'done',
                    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    //     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    // }]}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    headers={{ Authorization: `Bearer ${userData.token}` }}
                >
                    {fileList.length == 1 ? null : defaultUrl ? <img src={defaultUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Form.Item>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </React.Fragment>
    )
}

export default UploadPhoto;