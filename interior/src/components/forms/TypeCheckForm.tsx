'use client'
import React, { useState } from "react"
import styles from '../../styles/TypeCheckForm.module.css'
const type = [
    { id: 1, value: '아파트' },
    { id: 2, value: '빌라' },
    { id: 3, value: '오피스텔' },
    { id: 4, value: '주택' },
    { id: 5, value: '상가' },
]
const TypeCheckForm: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    return (
        <div className={styles.type}>
            <span style={{ fontWeight: 600 }}>건물유형</span>
            <div className={styles.type_content}>
                {type.map((type) => (
                    <div key={type.id}
                        className={styles.type_selectBox}>
                        <span>{type.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TypeCheckForm;