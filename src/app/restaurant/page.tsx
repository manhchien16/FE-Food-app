"use client"
import Carousels from "@/share/components/Carosel"
import Foods from "@/share/components/Products"
import News from "@/share/components/News";
import { useGetProductQuery } from "@/redux-setup/service/api/productService";
import { Spin } from "antd";

export default function Home() {
  const { data: data1, isLoading: bestSateLoad, isSuccess: isBestSateSuccess, isError: isBestSateError } = useGetProductQuery({ page: 1, pageSize: 8, featured: 1 });
  const { data, isLoading, isSuccess, isError } = useGetProductQuery({ page: 1, pageSize: 8, featured: 0 });

  if (isLoading || bestSateLoad) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <main>
      <Carousels />
      <div className='pt-10 pb-10 text-center border-b border-black'>
        <h3 className='font-bold pt-10 pb-10'>Special Food</h3>
        <Foods foods={data1?.data?.data} />
      </div>
      <div className='pt-10 pb-10 text-center border-b border-black'>
        <h3 className='font-bold pt-10 pb-10'>Best-sale</h3>
        <Foods foods={data?.data?.data} />
      </div>
      <News />
    </main>
  )
}
