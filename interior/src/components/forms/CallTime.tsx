
'use client'
import React, { useState, useEffect } from "react"
import styles from '@/styles/CallTime.module.css'
import { useFormDispatch, State, useForms } from '@/components/forms/FormContext'

const time = [
  { id: 1, value: '오전' },
  { id: 2, value: '오후' },
  { id: 3, value: '저녁' },
  { id: 4, value: '상관없음' },
]

const CallTime: React.FC = () => {
  const dispatch = useFormDispatch()
  const state = useForms()
  const [selectedId, setSelectedId] = useState<number | null>(null); // 클릭된 요소의 ID를 저장

  useEffect(() => {
    const selectedCallTime = time.find(t => t.value === state.callTime)
    if (selectedCallTime) { setSelectedId(selectedCallTime.id) }
    else { setSelectedId(null) }
  }, [state.callTime])

  const handleValueAndStyle = (e: React.MouseEvent<HTMLDivElement>) => {
    const { dataset } = e.currentTarget;
    const value = dataset.value as string;
    const type = dataset.type as keyof State;
    const id = parseInt(dataset.id as string)
    if (selectedId === id) {
      setSelectedId(null);
      dispatch({ type, value: '' }); // 빈값으로 설정
    } else {
      setSelectedId(id);
      dispatch({ type, value });
    }
  }
  return (
    <div className={styles.time}>
      <span style={{ fontWeight: 600 }}>연락가능시간</span>
      <div className={styles.time_content}>
        {time.map((time) => (
          <div
            key={time.id}
            data-value={time.value}
            data-id={time.id}
            data-type="callTime"
            className={styles.time_selectBox}
            onClick={handleValueAndStyle}
            style={{
              backgroundColor: selectedId === time.id ? 'blue' : '#fff',
              color: selectedId === time.id ? '#fff' : '#333'
            }}
          >
            <span>{time.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CallTime;
