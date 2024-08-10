'use client'
import React from "react"
import styles from '../../styles/Agree.module.css'

const Agree: React.FC = () => {
    return (
        <div className={styles.agree}>
        <input type="checkbox" id='agree' />
        <label htmlFor="agree">개인정보수집이용 동의</label>
        <p>*기입하신 정보는 상담용으로만 이용됩니다</p>
      </div>
    )
}

export default Agree;