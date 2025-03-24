'use client'
import React from "react"
import styles from '@/styles/Qna.module.css'
import { useFormDispatch, State, useForms } from '@/components/forms/FormContext'

const Qna: React.FC = () => {
    const dispatch = useFormDispatch()
    const state = useForms()

    const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const type = e.target.name as keyof State;
        const value = e.target.value;
        dispatch({ type, value: value})
    }
    return (
        <div className={styles.qna}>
            <label htmlFor="qna">기타 문의 사항</label>
            <textarea
                id='qna'
                name='qna'
                placeholder="ex) 욕실만 리모델링 가능한가요?"
                value={state?.qna || ''}
                onChange={handleTextareaValue}
            />
        </div>
    )
}

export default Qna;