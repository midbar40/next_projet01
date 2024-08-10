'use client'
import React from "react"
import styles from '../../styles/Contact.module.css'

const Contact: React.FC = () => {
    return (
        <div className={styles.contact}>
            <label htmlFor="mobile">연락처</label>
            <input type="text" id='mobile' placeholder="ex) 01012341234" />
        </div>
    )
}

export default Contact;