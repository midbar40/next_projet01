'use client'
import React from "react"
import styles from '../../styles/Qna.module.css'

const Qna: React.FC = () => {
    return (
        <div className={styles.qna}>
        <label htmlFor="qna">기타 문의 사항</label>
        <textarea id='qna' placeholder="ex) 욕실만 리모델링 가능한가요?" />
        </div>
    )
}

export default Qna;