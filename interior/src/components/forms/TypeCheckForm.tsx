'use client'
import React, { useState, useEffect } from "react"
import styles from '@/styles/TypeCheckForm.module.css'
import { useFormDispatch, State, useForms } from '@/components/forms/FormContext'

const type = [
    { id: 1, value: '아파트' },
    { id: 2, value: '빌라' },
    { id: 3, value: '오피스텔' },
    { id: 4, value: '주택' },
    { id: 5, value: '상가' },
]

const TypeCheckForm: React.FC = () => {
    const dispatch = useFormDispatch()
    const state = useForms()
    const [selectedId, setSelectedId] = useState<number | null>(null); // 클릭된 요소의 ID를 저장

  // useEffect를 사용하여 상태가 업데이트 될 때 선택 상태를 동기화
  useEffect(() => {
    const selectedType = type.find(t => t.value === state.homeType);
    if (selectedType) {
        setSelectedId(selectedType.id);
    } else {
        setSelectedId(null);
    }
}, [state.homeType]);


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
        <div className={styles.type}>
            <span style={{ fontWeight: 600 }}>건물유형</span>
            <div className={styles.type_content}>
                {type.map((type) => (
                    <div
                        key={type.id}
                        data-id={type.id}
                        data-value={type.value}
                        data-type="homeType"
                        className={styles.type_selectBox}
                        style={{
                            backgroundColor: selectedId === type.id ? 'blue' : '#fff',
                            color: selectedId === type.id ? '#fff' : '#333'
                        }}
                        onClick={handleValueAndStyle}
                    >
                        <span>{type.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TypeCheckForm;