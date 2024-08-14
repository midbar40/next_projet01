'use client'
import React, { useState } from "react"
import styles from '../../styles/Agree.module.css'
import { State } from '../forms/EstimateFormReducer'

interface AgreeProps {
  onChange: (type: keyof State, value: string | boolean) => void;
}

const Agree: React.FC<AgreeProps> = ({ onChange }) => {
  const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.name as keyof State;
    const value = e.target.checked;
    onChange(type, value);
  }
  return (
    <div className={styles.agree}>
      <input
        type="checkbox"
        id='agree'
        name='agree'
        onChange={handleCheckboxChange}
      />
      <label htmlFor="agree">개인정보수집이용 동의</label>
      <p>*기입하신 정보는 상담용으로만 이용됩니다</p>
    </div>
  )
}

export default Agree;