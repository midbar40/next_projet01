'use client'
import React,{ useState }from "react"
import styles from '../styles/TypeCheckForm.module.css'

const TypeCheckForm: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    return (
        // map함수로 변경
        <div className={styles.type}>
            <span style={{ fontWeight: 600 }}>건물유형</span>
            <div className={styles.type_content}>
                <div className={styles.type_selectBox}>
                    <span>아파트</span>
                </div>
                <div className={styles.type_selectBox}>
                    <span>빌라</span>
                </div>
                <div className={styles.type_selectBox}>
                    <span>오피스텔</span>
                </div>
                <div className={styles.type_selectBox}>
                    <span>주택</span>
                </div>
                <div className={styles.type_selectBox}>
                    <span>상가</span>
                </div>
            </div>
        </div>
    )
}

export default TypeCheckForm;