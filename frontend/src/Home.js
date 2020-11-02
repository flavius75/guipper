import React from 'react';
import { Layout, Avatar, Card, Input, Button, Row, Col } from 'antd';
import FeedList from './components/FeedList'
import './App.css';
const {Content} = Layout;
const { Meta } = Card;


function Home() {
  return (
    <div className="Home" style={{background:'#f0f2f5'}}>
       <Content style={{ marginTop: '70px'}}>
        <Row>
            <Col span={6} offset={2}>
                <Card style={{ width: 300 }}>
                    
                    <Meta
                    avatar={<Avatar size={50} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="John Doe"
                    description="Guitarist"
                    />
                </Card>
               
            </Col>
            <Col span={8} >
                <Card >
                    <Row>
                        <Col span={20}>
                            <Input size="large" placeholder="Que voulez vous dire?"  />
                        </Col>
                        <Col span='4'>
                            <Button type="primary" size='large'>
                            Publier
                            </Button>
                        </Col>

                    </Row>
                </Card>
                <FeedList/>
            </Col>
        </Row>


       </Content>
    </div>
  );
}

export default Home;
