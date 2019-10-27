import { Upload, Icon, Modal } from 'antd';
import React, { useState } from 'react'
import axios from 'axios';


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function PicturesWall() {
    const [previewVisible, setpreviewVisible] = useState(false)
    const [previewImage, setpreviewImage] = useState('');
    const [loader, setLoader] = useState(initialState)
    const [fileList, setfileList] = useState(
        [
            {
                uid: '-1',
                name: 'image.png',
                status: 'uploading',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }
        ])

    const handleCancel = () => setpreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setpreviewVisible(true);
        setpreviewImage(file.url || file.preview);

    };

    const handleChange = ({ fileList }) => {
        console.log(fileList);
        setfileList(fileList);
    }

    function onStart(file) {
        console.log('onStart', file, file.name);
    }
    function onSuccess(ret, file) {
        console.log('onSuccess', ret, file.name);
    }
    function onError(err) {
        console.log('onError', err);
    }
    function onProgress({ percent }, file) {
        console.log('onProgress', `${percent}%`, file.name);
    }
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            const mylink = "http://localhost:8080/uploads";
            const bodyFormData = new FormData();


            bodyFormData.set("filetoupload", file);
            axios({
                method: "post",
                url: mylink,
                data: bodyFormData,
                onUploadProgress: ({ total, loaded }) => {
                    onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
                },
                config: {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            }).then(response => {
                onSuccess(response, file);

                // onSuccess("ok");
            }).catch(error => {
                onError(error);
            })
        }, 1000);
    };

    const handleSubmit = () => {
        const mylink = "http://localhost:8080/uploads";
        const bodyFormData = new FormData();
        axios({
            method: "post",
            url: mylink,
            data: bodyFormData,
            config: {
                headers: { "Content-Type": "multipart/form-data" }
            }
        })
    }

    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    // console.log(fileList);
    return (
        <div className="clearfix">
            <Upload
                // action="http://localhost:8080/uploads"
                accept=".png, .jpeg, .jpg"
                listType="picture-card"
                fileList={fileList}
                name="filetoupload"
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={dummyRequest}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

export default PicturesWall;