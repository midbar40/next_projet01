'use client'
import React from "react"
import styles from '../../styles/Contact.module.css'
import { State } from '../forms/EstimateFormReducer'

interface ContactProps {
    onChange: (type: keyof State, value: string | boolean) => void;
}

const Contact: React.FC<ContactProps> = ({ onChange }) => {
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const type = e.target.name as keyof State
        const value = e.target.value
        onChange(type, value)
    }
    return (
        <div className={styles.contact}>
            <label htmlFor="mobile">연락처</label>
            <input
                type="text"
                id='mobile'
                name='contact'
                placeholder="ex) 01012341234"
                onChange={handleInputValue}
            />
        </div>
    )
}

export default Contact;