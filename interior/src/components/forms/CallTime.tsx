
'use client'
import React from "react"
import styles from '../../styles/CallTime.module.css'
const time = [
  { id: 1, value: '오전' },
  { id: 2, value: '오후' },
  { id: 3, value: '저녁' },
  { id: 4, value: '상관없음' },
]
const CallTime: React.FC = () => {
  return (
    <div className={styles.time}>
      <span style={{ fontWeight: 600 }}>연락가능시간</span>
      <div className={styles.time_content}>
        {time.map((time) => (
          <div
            key={time.id}
            className={styles.time_selectBox}
          >
            <span>{time.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CallTime;
