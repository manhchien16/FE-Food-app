import { DatePicker, Space } from 'antd';
import React, { useState } from 'react';
import type { RangeValue } from 'rc-picker/lib/interface'; // Import kiểu dữ liệu phù hợp
import moment from 'moment';

const { RangePicker } = DatePicker;

interface DateProps {
    setFormattedDates: (dateStrings: [string, string]) => void;
}

const FilterDateTime: React.FC<DateProps> = ({ setFormattedDates }) => {
    const [selectedDates, setSelectedDates] = useState<RangeValue<moment.Moment>>(null);
    const handleChange = (dates: RangeValue<moment.Moment>, dateStrings: [string, string]) => {

        setSelectedDates(dates);
        setFormattedDates(dateStrings);
    };

    return (
        <Space direction="vertical" size={12}>
            <RangePicker
                renderExtraFooter={() => 'extra footer'}
                showTime
                onChange={handleChange}
            />
        </Space>
    );
};

export default FilterDateTime;
