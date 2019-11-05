import { Upload, Icon, Modal, Form } from 'antd';
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';


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
    const authContext = useContext(AuthContext);
    const { userData, dispatch } = authContext;
    const { getFieldDecorator } = props;

    const handleCancel = () => setpreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setpreviewVisible(true);
        setpreviewImage(file.url || file.preview);

    };

    const handleChange = ({ fileList, file }) => {


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
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    return (
        <Form.Item label="Фотографии" validateStatus={props.fileValidate} help={props.fileRequired}>
            {getFieldDecorator('photos', {
            })(
                <Upload
                    action="https://ttuz.azurewebsites.net/api/news/upload-image"
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
                </Upload>)}

            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Form.Item>
    )
}

export default PicturesWall;