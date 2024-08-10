
'use client'
import React from "react"
import styles from '../../styles/CallTime.module.css'

const CallTime: React.FC = () => {
    return (
        <div className={styles.time}>
        <span style={{fontWeight:600}}>연락가능시간</span>
        <div className={styles.time_content}>
          <div className={styles.time_selectBox}>
            <span >오전</span>
          </div>
          <div className={styles.time_selectBox}>
            <span>오후</span>
          </div>
          <div className={styles.time_selectBox}>
            <span>저녁</span>
          </div>
          <div className={styles.time_selectBox}>
            <span>상관없음</span>
          </div>
        </div>
      </div>
    )
}

export default CallTime;
