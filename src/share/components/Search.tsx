import { Input } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Search = () => {
    const router = useRouter();
    const [data, setData] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.value);
    };

    const onSearch = () => {
        setData('');
        router.push(`/restaurant/products?name=${data}`)
    }

    return (
        <Input.Search placeholder="Search..." allowClear value={data} onChange={onChange} onSearch={onSearch} />
    )
}

export default Search