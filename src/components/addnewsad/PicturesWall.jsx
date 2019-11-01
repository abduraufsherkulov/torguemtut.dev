import { Upload, Icon, Modal, Progress } from 'antd';
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
    const [fileList, setfileList] = useState([
        {
          uid: '-5',
          name: 'image.png',
          status: 'done',
          url: 'C:/Users/a_sherkulov/Desktop/test/express-upload/uploads/1572593160176.jpg',
        }])

    const handleCancel = () => setpreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setpreviewVisible(true);
        setpreviewImage(file.url || file.preview);

    };

    const handleChange = ({ fileList, file, event, onProgress }) => {
        // setfileList(fileList);

        let newArr = [...fileList];
        console.log(file.response);
        if (typeof file.response != 'undefined') {
            // fileList[file].percent = event.percent.toFixed();
            file.url = file.response.url;
        }
        newArr[file] = file;
        setfileList(newArr);
        // console.log(fileList)
        console.log(file);
        // if ('percent' in event){
        //     console.log(event.percent);
        // }
        if (typeof event != 'undefined') {
            // fileList[file].percent = event.percent.toFixed();
            console.log(file);
            console.log(event.percent.toFixed());
        }

        // const mylink = "http://localhost:8080/uploads";
        // const bodyFormData = new FormData();


        // bodyFormData.set("filetoupload", file);

        // axios({
        //     method: "post",
        //     url: mylink,
        //     data: bodyFormData,
        //     onUploadProgress: (e) => {
        //         onProgress({ percent: (e.loaded / e.total) * 100 }, file);
        //     },
        //     config: {
        //         headers: { "Content-Type": "multipart/form-data" }
        //     }
        // }).then(response => {

        //     setfileList(fileList);
        //     // onSuccess(response, file);

        //     // onSuccess("ok");
        // }).catch(error => {
        //     onError(error);
        // })

    }
    
    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    return (
        <div className="clearfix">
            <Upload
                action="http://localhost:8080/uploads"
                accept=".png, .jpeg, .jpg"
                listType="picture-card"
                fileList={fileList}
                name="filetoupload"
                onPreview={handlePreview}
                onChange={handleChange}
            // customRequest={dummyRequest}

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