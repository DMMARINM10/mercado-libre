import Image from "next/image"
import Link from "next/link"
import { formatNumber } from "@/helpers/utils"
import styles from '@/styles/components/card.module.scss'
import shippingIcon from '@/assets/shipping-icon.png'

const Card = ({ id, picture, amount, freeShipping, title, seller }) => {
  return (
    <Link href={`/items/${id}`} className={styles['item-card']} key={id}>
      <Image className={styles['item-picture']} width={180} height={180} src={picture} alt={`picture-item-${id}`} />
      <span className={styles['item-metadata']}>
        <p>$ {formatNumber(amount)} {
          freeShipping && <Image height={16} src={shippingIcon} alt="free shipping icon"/>
        }</p>
        <h2>{title}</h2>
      </span>
      <p className={styles['item-seller']}>{seller}</p>
    </Link>
  )
}

export default Card
