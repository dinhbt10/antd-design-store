import React from 'react';
import { Button, Form, Modal, Input, Alert, notification, message } from 'antd';
import { postUser } from '../../services';

const CreateUserModal = ({ isModalOpen, setIsModalOpen, getAllUsersApi }) => {
    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const onFinish = async (value) => {
        const response = await postUser(value);
        if (response && response.data) {
            message.success('Tạo thành công');
            form.resetFields();
            setIsModalOpen(false);
            await getAllUsersApi();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: response.message
            });
        }
    };

    return (
        <>
            <Modal
                title="Add user"
                open={isModalOpen}
                onOk={() => {
                    form.submit();
                }}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 24
                    }}
                    wrapperCol={{
                        span: 24
                    }}
                    style={{
                        maxWidth: '100%'
                    }}
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="FullName"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateUserModal;
