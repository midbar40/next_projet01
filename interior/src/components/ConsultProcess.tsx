import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from '../styles/ConsultProcess.module.css'
const ConsultProcess = () => {
    return (
        <div className={styles.prodcess_cards}>
            <div className={styles.card}>상담하기</div>
            <ArrowForwardIosIcon />
            <div className={styles.card}>현장실측</div>
            <ArrowForwardIosIcon />
            <div className={styles.card}>컨셉선정</div>
            <ArrowForwardIosIcon />
            <div className={styles.card}>견적확인</div>
            <ArrowForwardIosIcon />
            <div className={styles.card}>계약진행</div>
            <ArrowForwardIosIcon />
            <div className={styles.card}>공사진행</div>
            <ArrowForwardIosIcon />
            <div className={styles.card}>사후점검</div>
          </div>
    )
}

export default ConsultProcess;