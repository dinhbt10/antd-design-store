import { Col, Drawer, Row } from 'antd';
import React from 'react';

const DetailUser = ({ record, open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Drawer title="User Infomation" placement="right" onClose={handleClose} open={open} width={500}>
            <Row>
                <Col span={24}>
                    <Row justify="space-between" style={{ borderTop: '1px solid #E5E7E9', padding: '10px 0' }}>
                        <Col style={{ fontWeight: 'bold' }}>Name</Col>
                        <Col>{record?.fullName}</Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row justify="space-between" style={{ borderTop: '1px solid #E5E7E9', padding: '10px 0' }}>
                        <Col style={{ fontWeight: 'bold' }}>Email</Col>
                        <Col>{record?.email}</Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row justify="space-between" style={{ borderTop: '1px solid #E5E7E9', padding: '10px 0' }}>
                        <Col style={{ fontWeight: 'bold' }}>Phone</Col>
                        <Col>{record?.phone}</Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row justify="space-between" style={{ borderTop: '1px solid #E5E7E9', padding: '10px 0' }}>
                        <Col style={{ fontWeight: 'bold' }}>Role</Col>
                        <Col>{record?.role}</Col>
                    </Row>
                </Col>
            </Row>
        </Drawer>
    );
};

export default DetailUser;
