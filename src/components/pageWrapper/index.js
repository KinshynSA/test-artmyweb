
import React from "react";
import { Layout, Space } from "antd";


const { Content } = Layout;

const layoutStyle = {
    background: 'white',
};
const contentStyle = {
    width: '100%',
    maxWidth: '1232px',
    padding: '20px 16px',
    margin: '0 auto',
    background: 'white',
};


export default function PageWrapper(props){
    return (
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
            <Layout style={layoutStyle}>
                <Content style={contentStyle}>{props.children}</Content>
            </Layout>
        </Space>
    )
}