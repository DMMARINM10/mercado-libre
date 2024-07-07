import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from '@/styles/components/breadcrumbs.module.scss';

const Breadcrumb = ({ breadcrumb }) => {
  return (
    <nav>
        <ul className={styles.breadcrumb}>
          {
              breadcrumb?.map((category, i) => <li
                key={i}>
                {category}
                {
                    breadcrumb.length - 1 !== i 
                        && <ArrowForwardIosIcon fontSize='14px' />
                }
            </li>)
            }
        </ul>
    </nav>
  )
}

export default Breadcrumb
