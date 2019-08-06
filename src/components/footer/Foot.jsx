import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

function Foot(){
    return (
        <Footer style={{ textAlign: 'center' }}>© Torguemtut {new Date().getFullYear()} Created by Deadline Inc.</Footer>
    )
}
export default Foot;