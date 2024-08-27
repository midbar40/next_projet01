'use client'
import React, { useState, useEffect } from "react"
import styles from '@/styles/Agree.module.css'
import { useFormDispatch, State, useForms } from '@/components/forms/FormContext'

const Agree: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const dispatch = useFormDispatch()
  const state = useForms()

  // 상태 동기화: state.agree와 isChecked를 동기화합니다.
  useEffect(() => {
    setIsChecked(state.agree);
  }, [state.agree]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.name as keyof State;
    const value = e.target.checked;
    setIsChecked(true)
    dispatch({ type, value });
  }
  return (
    <div className={styles.agree}>
      <input
        type="checkbox"
        id='agree'
        name='agree'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="agree">개인정보수집이용 동의</label>
      <p>*기입하신 정보는 상담용으로만 이용됩니다</p>
    </div>
  )
}

export default Agree;