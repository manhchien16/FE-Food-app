import { Col, Row } from 'antd';
import React from 'react'
import ProductItem from './Product-item';


interface NewsProps {

}

const News: React.FC<NewsProps> = ({ }) => {
    return (
        <div className='pt-10 pb-10 text-center border-b border-black'>
            <h3 className='font-bold pt-10 pb-10'>News</h3>
            <div>
                <div>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={18} lg={18}>
                            <Row gutter={[16, 16]}>
                                <Col xs={12} sm={12} md={8} lg={8}>

                                </Col>
                            </Row>
                        </Col >
                        <Col xs={24} sm={24} md={6} lg={6} className='border-l border-black'>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={24} lg={24}>

                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24}>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>

    )
}

export default News;
