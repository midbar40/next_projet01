'use client'
import React from "react"
import styles from '../../styles/Qna.module.css'
import { State } from '../forms/EstimateFormReducer'

interface QnaProps {
    onChange: (type: keyof State, value: string | boolean) => void;
}

const Qna: React.FC<QnaProps> = ({ onChange }) => {
    const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const type = e.target.name as keyof State;
        const value = e.target.value;
        onChange(type, value)
    }
    return (
        <div className={styles.qna}>
            <label htmlFor="qna">기타 문의 사항</label>
            <textarea
                id='qna'
                name='qna'
                placeholder="ex) 욕실만 리모델링 가능한가요?"
                onChange={handleTextareaValue}
            />
        </div>
    )
}

export default Qna;