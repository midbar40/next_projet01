import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from '@/styles/ConsultProcess.module.css'
const process = [
    { id: 1, value: '상담신청' },
    { id: 2, value: '1:1상담' },
    { id: 3, value: '현장실측' },
    { id: 4, value: '컨셉선정' },
    { id: 5, value: '견적확인' },
    { id: 6, value: '계약진행' },
    { id: 7, value: '공사진행' },
    { id: 8, value: '사후점검' }
]
const ConsultProcess = () => {
    return (
        <div className={styles.process_frame}>

            <div className={styles.process_cards}>

                {process.map((content, index) => (
                    <React.Fragment key={content.id}>
                        <div className={styles.cardId}>
                            <span>{content.id}</span>
                            <div className={styles.card}>
                                {content.value}
                            </div>
                        </div>
                        {/* {index < process.length - 1 && <ArrowForwardIosIcon />} */}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default ConsultProcess;