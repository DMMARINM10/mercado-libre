import Image from "next/image"
import { itemCondition } from "@/data/items"
import { formatNumber } from "@/helpers/utils"
import styles from '@/styles/components/itemDetail.module.scss'

const ItemDetail = ({ id, picture, description, condition, soldQuantity, title, price }) => {
  return (
    <>
      <div className={styles['item-detail-left']}>
        <Image src={picture} alt={`picture-item-${id}`} width={680} height={680} />
        <div className={styles['item-description-container']}>
            <h2>Descripción del producto</h2>
            <p>{description}</p>
        </div>
      </div>
      <div className={styles['item-detail-right']}>
        <p className={styles['item-detail-condition']}>{itemCondition(condition)} - {soldQuantity} vendidos</p>
        <div className={styles['item-detail-metadata']}>
          <h1>{title}</h1>
          <p>$ {formatNumber(price)}</p>
          <button>Comprar</button>
        </div>
      </div>
    </>
  )
}

export default ItemDetail
