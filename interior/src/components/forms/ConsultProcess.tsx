import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from '../../styles/ConsultProcess.module.css'
const process = [
    { id: 1, value: '상담하기' },
    { id: 2, value: '현장실측' },
    { id: 3, value: '컨셉선정' },
    { id: 4, value: '견적확인' },
    { id: 5, value: '계약진행' },
    { id: 6, value: '공사진행' },
    { id: 7, value: '사후점검' }
]
const ConsultProcess = () => {
    return (
        <div className={styles.process_cards}>
            {process.map((content, index) => (
                <>
                    <div
                        key={content.id}
                        className={styles.card}
                    >
                        {content.value}
                    </div>
                    {index < process.length - 1 && <ArrowForwardIosIcon />}
                </>
            ))}
        </div>
    )
}

export default ConsultProcess;