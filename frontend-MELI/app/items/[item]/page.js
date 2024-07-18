import { Suspense } from "react";
import Loader from "@/components/Loader";
import Breadcrumb from "@/components/Breadcrumbs";
import ItemDetail from "@/components/ItemDetail";
import Error from "@/components/Error";
import { getItem } from "@/services/items";

export async function generateMetadata ({ params }) {
  const { data, error } = await getItem(params.item)
  if(error) {
    return {
      title: 'Artículo no encontrado',
      description: 'Artículo no encontrado en búsqueda',
    }
  }
  return {
    title: data?.item?.title,
    description: data?.item?.description,
  }
}

const ItemCard = async({ item }) => {
  const { data, error } = await getItem(item)
  const itemData = data?.item;
  const picture = itemData?.picture;
  const description = itemData?.description;
  const title = itemData?.title;
  const price = itemData?.price?.amount;
  const decimals = itemData?.price?.decimals;
  const condition = itemData?.condition;
  const soldQuantity = itemData?.sold_quantity;
  const categories = itemData?.categories;

  if(error) return <Error />
  
  return (
    <>
      {
        data &&
        (<>
          <Breadcrumb breadcrumb={categories} />
          <section className="container item-container">
            <ItemDetail 
              id={item}
              picture={picture} 
              description={description} 
              title={title} 
              price={price} 
              decimals={decimals}
              condition={condition} 
              soldQuantity={soldQuantity} 
            />
          </section>
        </>)
      }
    </>
  )
}

const Item = async ({ params }) => {
  const { item } = params
    return (
      <Suspense fallback={<Loader />}>
        <ItemCard item={item} />
      </Suspense>
    )
};

export default Item;