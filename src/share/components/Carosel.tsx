import { Carousel, Image } from 'antd';
import React from 'react';

const contentStyle: React.CSSProperties = {
  height: '100%',
  color: '#fff',
  lineHeight: '100%',
  textAlign: 'center',
  background: '#364d79',
};

const Carousels: React.FC = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>
        <Image
          src="/images/Crab_Pasta_Desktop_a6aa4ad5c5.webp"
          alt="Description of image"
          style={{
            objectFit: 'cover',
          }}
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <Image
          src="/images/Crab_Pasta_Desktop_a6aa4ad5c5.webp"
          alt="Description of image"
          style={{
            objectFit: 'cover',
          }}
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <Image
          src="/images/Crab_Pasta_Desktop_a6aa4ad5c5.webp"
          alt="Description of image"
          style={{
            objectFit: 'cover',
          }}
        />
      </h3>
    </div>
  </Carousel>
);

export default Carousels;
