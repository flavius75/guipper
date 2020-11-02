import React from 'react';
import { Card, Avatar, Row, Col, Space } from 'antd';
import { HeartOutlined, CommentOutlined, ShareAltOutlined, FileTextOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import '../App.css';


const { Meta } = Card;

function Publication() {

    const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );

    return(
        <Card
            hoverable
            style={{marginTop:'40px'}}
            cover={
            <img
                alt="example"
                src="https://picsum.photos/920/260"
            />
            }
            actions={[
                <IconText icon={HeartOutlined} text="156" key="list-vertical-heart-o" />,
                <IconText icon={CommentOutlined} text="5" key="list-vertical-comment-o" />,
                <IconText icon={ShareAltOutlined} text="156" key="list-vertical-share-o" />,
                <IconText icon={FileTextOutlined}  key="list-vertical-file-o" />
            ]}
        >
        <Meta
        avatar={<Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title="John Doe"
        description="This is the description"
        />
    </Card>
    )
}

export default Publication