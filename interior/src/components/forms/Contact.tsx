'use client'
import React from "react"
import styles from '@/styles/Contact.module.css'
import { useFormDispatch, State, useForms } from '@/components/forms/FormContext'



const Contact: React.FC = ({   }) => {
    const dispatch = useFormDispatch()
    const state = useForms()
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const type = e.target.name as keyof State
        const value = e.target.value
        if(dispatch) dispatch({ type, value: value })
    }
    return (
        <div className={styles.contact}>
            <label htmlFor="mobile">연락처</label>
            <input
                type="text"
                id='mobile'
                name='contact'
                placeholder="ex) 01012341234"
                value={state?.contact || ''}
                onChange={handleInputValue}
            />
        </div>
    )
}

export default Contact;