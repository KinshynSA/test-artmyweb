import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin } from 'antd';
import { PageWrapper } from "../../components";
import urls from "../../constants/urls";
import { putUser, getUser } from "../../api";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router";



export default function Edit(props){
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getUserInfo()

        async function getUserInfo(){
            const [res] = await getUser({ userId: params.userId });
            setUser(res.data);
            setLoading(false);
        }
    }, [params.userId])

    const onFinish = async (values) => {
        setLoading(true);
        const [, err] = await putUser({ ...values, id: user.id });

        if(err !== null){
            toast.error('Error');
        } else {
            toast.success('Success');
            navigate(urls.urlUsers);
        }

        setLoading(false);
    };

    return (
        <PageWrapper>
            {loading ? (
                <div style={{ padding: '40px 0', textAlign: 'center' }}>
                    <Spin
                        size="large"
                        tip=""
                    />
                </div>
            ) : (
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ ...user }}
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Check value' }]}
                    >
                        <Input />
                    </Form.Item>  
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Check value', type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>   
                    <Form.Item
                        label="Gender"
                        name="gender"
                    >
                        <Select>
                            <Select.Option value="male">male</Select.Option>
                            <Select.Option value="female">female</Select.Option>
                        </Select>
                    </Form.Item>    
                    <Form.Item
                        label="Status"
                        name="status"
                    >
                        <Select>
                            <Select.Option value="active">active</Select.Option>
                            <Select.Option value="inactive">inactive</Select.Option>
                        </Select>
                    </Form.Item>   
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>      
                </Form>
            )}
        </PageWrapper>
    )
}