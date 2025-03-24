'use client'
import React from "react"
import styles from '@/styles/Schedule.module.css'
import { useFormDispatch, State, useForms } from '@/components/forms/FormContext'

const Schedule: React.FC = () => {
    const dispatch = useFormDispatch()
    const state = useForms()
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const type = e.target.name as keyof State
        const value = e.target.value
        dispatch({type, value : value})
    }
    return (
        <div className={styles.schedule}>
            <label htmlFor="schedule">공사가능일정</label>
            <input
                name='schedule'
                type="text"
                id='schedule'
                placeholder="ex) 8월 첫째주"
                value={state?.schedule || ''}
                onChange={handleInputValue}
            />
        </div>
    )
}

export default Schedule;