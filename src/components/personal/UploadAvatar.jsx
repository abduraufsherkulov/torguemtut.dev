import { Upload, Modal, Form, Avatar } from 'antd';
import React, { useState, useContext } from 'react'
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthContext';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function getBase642(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


function UploadAvatar({ defaultUrl, edit }) {
    const [fileList, setfileList] = useState([])
    const { userData, dispatch } = useContext(AuthContext);
    const [imageUrl, setImageUrl] = useState(null)
    const [previewVisible, setpreviewVisible] = useState(false)
    const [previewImage, setpreviewImage] = useState('');
    const handleChange = ({ fileList, file }) => {
        getBase64(file.originFileObj, imageUrl =>
            setImageUrl(imageUrl)
        );
        let newArr = [...fileList];
        if (typeof file.response != 'undefined') {
            file.url = file.response.url;
        }
        newArr[file] = file;
        setfileList(newArr);
    }

    const handleCancel = () => setpreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase642(file.originFileObj);
        }
        setpreviewVisible(true);
        setpreviewImage(file.url || file.preview);

    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    const UploadAvatarOn = (
        <div>
            <Avatar size={104} icon={<UserOutlined />} />
        </div>
    )
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
                name="photos">
                <Upload
                    action="https://tt.delivera.uz/api/news/upload-image"
                    accept=".png, .jpeg, .jpg"
                    listType="picture-card"
                    fileList={fileList}
                    name="image"
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    onPreview={handlePreview}
                    headers={{ Authorization: `Bearer ${userData.token}` }}
                >
                    {/* {edit ? UploadAvatarOn : null} */}
                    {fileList.length == 1 ? null : defaultUrl ? <img src={defaultUrl} alt="avatar" style={{ width: '100%' }} /> : UploadAvatarOn}
                    {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
                </Upload>
            </Form.Item>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </React.Fragment>
    )
}

export default UploadAvatar;