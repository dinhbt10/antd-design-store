import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Typography } from 'antd';
import { getAllUsers, removeUser } from '../../services';
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { Button, Form, Input, Modal } from 'antd';
import DetailUser from './DetailUser';
import { ExclamationCircleFilled } from '@ant-design/icons';
import CreateUserModal from './CreateUser';
const { confirm } = Modal;

const App = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [detailData, setDetailData] = useState();

    const handleChangePage = (e) => {
        if (e && e.current !== currentPage) {
            setCurrentPage(e.current);
        }
        if (e && e.pageSize !== pageSize) {
            setPageSize(e.pageSize);
        }
    };

    const getAllUsersApi = async (query) => {
        setLoading(true);
        if (query) {
            const res = await getAllUsers(query);
            setLoading(false);
            setData(res.data);
        } else {
            const res = await getAllUsers(`current=${currentPage}&pageSize=${pageSize}`);
            setLoading(false);
            setData(res.data);
        }
    };

    const renderTitle = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const handleAddUser = () => setIsModalOpen(true);
        return (
            <>
                <div className="flex justify-between">
                    <Typography>Table List User</Typography>
                    <div className="flex flex-row gap-5">
                        <Button>Export</Button>
                        <Button>Import</Button>
                        <Button onClick={handleAddUser}>Thêm mới</Button>
                    </div>
                </div>
                <CreateUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getAllUsersApi={getAllUsersApi} />
            </>
        );
    };

    const onFinish = (values) => {
        let query = `current=1&pageSize=${pageSize}`;
        if (values.fullname) {
            query += `&fullName=/${values.fullname}/i`;
        }
        if (values.email) {
            query += `&email=/${values.email}/i`;
        }
        if (values.phone) {
            query += `&phone=/${values.phone}/i`;
        }
        getAllUsersApi(query);
    };

    const handleDetailUser = (record) => {
        setDetailData(record);
        setOpen(true);
    };

    useEffect(() => {
        getAllUsersApi();
    }, [currentPage, pageSize]);

    const showDeleteConfirm = (record) => {
        confirm({
            title: 'Are you sure delete this user?',
            icon: <ExclamationCircleFilled />,
            content: 'Delete',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                await removeUser(record._id);
                await getAllUsersApi();
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render: (text, record, index) => (
                <div className="cursor-pointer hover:text-blue-400" onClick={() => handleDetailUser(record)}>
                    {text}
                </div>
            )
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'name',
            width: '30%',
            sorter: (a, b) => a.fullName.length - b.fullName.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            sorter: (a, b) => a.email.length - b.email.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            sorter: (a, b) => a.role.length - b.role.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <div className="flex justify-start gap-1 items-center">
                        <button>
                            <FiEdit3 color="black" size="23px" />
                        </button>
                        <button>
                            <MdDeleteOutline color="red" size="23px" onClick={() => showDeleteConfirm(record)} />
                        </button>
                    </div>
                );
            }
        }
    ];
    return (
        <>
            <Form name="form_item_path" layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[12, 12]}>
                    <Col span={8}>
                        <Form.Item label="Name" name="fullname">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Sdt" name="phone">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="end" style={{ marginBottom: '10px' }} gutter={[16, 16]}>
                    <Col>
                        <Button type="primary" htmlType="submit" style={{ background: '#1677ff' }}>
                            Search
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            htmlType="buttom"
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Clear
                        </Button>
                    </Col>
                </Row>
            </Form>
            {data && (
                <Table
                    title={renderTitle}
                    rowKey="_id"
                    showHeader={true}
                    loading={loading}
                    bordered
                    columns={columns}
                    dataSource={data.result}
                    onChange={handleChangePage}
                    pagination={{
                        pageSizeOptions: ['1', '10', '20', '30'],
                        current: +data.meta?.current,
                        pageSize: +data?.meta?.pageSize,
                        showSizeChanger: true,
                        total: data?.meta?.total,
                        showTotal: (total, range) => (
                            <span>
                                Showing {range[0]} - {range[1]} of {total}
                            </span>
                        )
                    }}
                />
            )}
            <DetailUser open={open} setOpen={setOpen} record={detailData} />
        </>
    );
};
export default App;
