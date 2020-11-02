import React from 'react';
import {Link} from 'react-router-dom'

import { Row, Col } from 'antd';
import Publication from './Publication'

import "antd/dist/antd.css";
import '../App.css';



function FeedList() {
  return (
      <>
        <Row>
            <Col  >
            <Publication/>
            </Col>
        </Row>
        <Row>
            <Col >
              <Publication/>
            </Col>
        </Row>
        <Row>
            <Col  >
              <Publication/>
            </Col>
        </Row>
        
     </>
  );
}

export default FeedList;
