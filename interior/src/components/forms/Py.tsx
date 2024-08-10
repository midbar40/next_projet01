'use client'
import React from "react"
import styles from '../../styles/Py.module.css'

const Py: React.FC = () => {
    return (
        // map함수로 변경
        <div className={styles.py}>
            <span style={{ fontWeight: 600 }}>평형</span>
            <div className={styles.py_content}>
                <div className={styles.py_selectBox}>
                    <span>10평대</span>
                </div>
                <div className={styles.py_selectBox}>
                    <span>20평대</span>
                </div>
                <div className={styles.py_selectBox}>
                    <span>30평대</span>
                </div>
                <div className={styles.py_selectBox}>
                    <span>40평대</span>
                </div>
                <div className={styles.py_selectBox}>
                    <span>50평이상</span>
                </div>
            </div>
        </div>
    )
}

export default Py;