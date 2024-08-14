'use client'
import React, { useState } from "react"
import styles from '../../styles/TypeCheckForm.module.css'
import { State } from './EstimateFormReducer'

const type = [
    { id: 1, value: '아파트' },
    { id: 2, value: '빌라' },
    { id: 3, value: '오피스텔' },
    { id: 4, value: '주택' },
    { id: 5, value: '상가' },
]

interface TypeCheckFormProps {
    onChange: (type: keyof State, value: string | boolean) => void;
}

const TypeCheckForm: React.FC<TypeCheckFormProps> = ({ onChange }) => {
    const [selectedId, setSelectedId] = useState<number | null>(null); // 클릭된 요소의 ID를 저장
    const [selectedType, setSelectedType] = useState<keyof State | null>(null);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);


    const handleValueAndStyle = (e: React.MouseEvent<HTMLDivElement>) => {
        const { dataset } = e.currentTarget;
        const value = dataset.value as string;
        const type = dataset.type as keyof State;
        const id = parseInt(dataset.id as string)
        if(selectedId === id && selectedType === type && selectedValue === value){
            setSelectedId(null);
            setSelectedType(null);
            setSelectedValue(null);
            onChange(type, ''); // 빈값으로 설정
        } else {
            setSelectedId(id);
            setSelectedType(type);
            setSelectedValue(value);
            onChange(type, value);
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