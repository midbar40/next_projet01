'use client'
import React from "react"
import styles from '../../styles/Schedule.module.css'

const Schedule: React.FC = () => {
    return (
        <div className={styles.schedule}>
            <label htmlFor="schedule">공사가능일정</label>
            <input type="text" id='schedule' placeholder="ex) 8월 첫째주" />
        </div>
    )
}

export default Schedule;