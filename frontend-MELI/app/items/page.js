'use client'

import useSWR from "swr"
import { useSearchParams } from "next/navigation"
import Breadcrumb from "@/components/Breadcrumbs"
import Card from "@/components/Card"
import Loader from "@/components/Loader"
import Error from "@/components/Error"
import { fetcher } from "@/services/fetcher"


const Items = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const { data, error, isLoading } = useSWR(
      search ? `${process.env.NEXT_PUBLIC_API_URL}?q=${search}` : null,
      fetcher
    );
    
    const categories = data?.categories
    const breadcrumb = categories?.slice(0, 4)
    const items = data?.items

    if(!search) return <></>
    
    if(error) return <Error />

    if(isLoading) return <Loader />
    
    return (
      <>
      {
        data &&
        <>
          <Breadcrumb breadcrumb={breadcrumb} />
          <section data-testid="items-page-data" className="container">
          {
            items?.map((item) => {
              const { id, picture, price, title, seller, free_shipping: freeShipping } = item
              const { amount } = price
              return (
                <Card 
                 key={id}
                 id={id}
                 picture={picture}
                 amount={amount}
                 freeShipping={freeShipping}
                 title={title}
                 seller={seller}
                />
              )
            })
          }
          </section>
        </>
      }
      </>
    );
}

export default Items;
