'use client'
import React from "react"
import styles from '@/styles/Schedule.module.css'
import { State } from '@/components/forms/EstimateFormReducer'


interface ScheduleProps {
    onChange: (type: keyof State, value: string | boolean) => void
}
const Schedule: React.FC<ScheduleProps> = ({ onChange }) => {
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const type = e.target.name as keyof State
        const value = e.target.value
        onChange(type, value)
    }
    return (
        <div className={styles.schedule}>
            <label htmlFor="schedule">공사가능일정</label>
            <input
                name='schedule'
                type="text"
                id='schedule'
                placeholder="ex) 8월 첫째주"
                onChange={handleInputValue}
            />
        </div>
    )
}

export default Schedule;