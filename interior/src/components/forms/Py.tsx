'use client'
import React from "react"
import styles from '../../styles/Py.module.css'
const py = [
    { id: 1, value: '10평대' },
    { id: 2, value: '20평대' },
    { id: 3, value: '30평대' },
    { id: 4, value: '40평대' },
    { id: 5, value: '50평이상' }
]
const Py: React.FC = () => {
    return (
        <div className={styles.py}>
            <span style={{ fontWeight: 600 }}>평형</span>
            <div className={styles.py_content}>
                {py.map((py) => (
                    <div
                        key={py.id}
                        className={styles.py_selectBox}
                    >
                        <span>{py.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Py;