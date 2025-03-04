import { Col, DatePicker, Row, Space } from 'antd';
import React, { useState } from 'react';
import type { RangeValue } from 'rc-picker/lib/interface';
import moment from 'moment';

interface DateProps {
    setFormattedDates: (dateStrings: [string, string]) => void;
}

const FilterDateTime: React.FC<DateProps> = ({ setFormattedDates }) => {
    const [selectedDates, setSelectedDates] = useState<RangeValue<moment.Moment>>(null);

    const handleStartDateChange = (date: moment.Moment | null, dateString: string) => {
        const updatedDates: RangeValue<moment.Moment> = [
            date,
            selectedDates?.[1] ?? null,
        ];
        setSelectedDates(updatedDates);
        setFormattedDates([
            dateString,
            updatedDates[1]?.format("YYYY-MM-DD") || ""
        ]);
    };

    const handleEndDateChange = (date: moment.Moment | null, dateString: string) => {
        const updatedDates: RangeValue<moment.Moment> = [
            selectedDates?.[0] ?? null,
            date,
        ];
        setSelectedDates(updatedDates);
        setFormattedDates([
            updatedDates[0]?.format("YYYY-MM-DD") || "",
            dateString
        ]);
    };

    return (
        <Space direction="vertical" size={12}>
            <Row>
                <Col span={10}>
                    <DatePicker
                        onChange={handleStartDateChange}
                        format="YYYY-MM-DD"
                        placeholder="Start Date"
                    />
                </Col>
                <Col
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 10px",
                    }}
                >
                    <p>{"->"}</p>
                </Col>
                <Col span={10}>
                    <DatePicker
                        onChange={handleEndDateChange}
                        format="YYYY-MM-DD"
                        placeholder="End Date"
                    />
                </Col>
            </Row>
        </Space>
    );
};

export default FilterDateTime;