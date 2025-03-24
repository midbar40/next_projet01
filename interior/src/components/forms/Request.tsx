'use client'
import React from "react"
import styles from '@/styles/Request.module.css'

const Request: React.FC = () => {
  return (
    <div className={styles.request}>
      <button type="submit">상담신청</button>
    </div>
  )
}

export default Request;