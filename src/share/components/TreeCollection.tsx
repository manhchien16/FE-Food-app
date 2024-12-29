import { Col, InputNumber, Row, Slider } from 'antd';
import React, { useEffect, useState } from 'react';

interface priceProps {
    setPriceRanges: (priceRange: { minPrice: number; maxPrice: number }) => void;
    minMax: {
        minPrice: number,
        maxPrice: number
    }
}

const Collection: React.FC<priceProps> = ({ setPriceRanges, minMax }) => {
    const [priceRange, setPriceRange] = useState({
        maxPrice: minMax?.maxPrice,
        minPrice: minMax?.minPrice,
    });

    useEffect(() => {
        setPriceRanges(priceRange);
    }, [priceRange])

    const onMinPriceChange = (value: number | null) => {
        if (value === null || isNaN(value)) return;
        setPriceRange((priceRange) => ({ ...priceRange, minPrice: value }));
    };

    const onMaxPriceChange = (value: number | null) => {
        if (value === null || isNaN(value)) return;
        setPriceRange((prev) => ({ ...prev, maxPrice: value }));
    };

    return (
        <div className='bg-white p-3'>
            <Row style={{ marginBottom: '24px' }}>
                <Col lg={12} xs={16} md={20}>
                    <Slider
                        min={0}
                        max={minMax?.maxPrice}
                        onChange={(value) => onMinPriceChange(value as number)}
                        value={priceRange.minPrice}
                    />
                </Col>
                <Col lg={4} xs={4} md={4}>
                    <InputNumber
                        min={0}
                        max={minMax?.maxPrice}
                        style={{ marginLeft: '5px ' }}
                        value={priceRange.minPrice}
                        onChange={onMinPriceChange}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={12} xs={16} md={20}>
                    <Slider
                        min={0}
                        max={minMax?.maxPrice}
                        onChange={(value) => onMaxPriceChange(value as number)}
                        value={priceRange?.maxPrice}
                    />
                </Col>
                <Col lg={4} xs={4} md={4}>
                    <InputNumber
                        min={0}
                        max={minMax?.maxPrice}
                        style={{ marginLeft: '5px ' }}
                        value={priceRange?.maxPrice}
                        onChange={onMaxPriceChange}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Collection;
