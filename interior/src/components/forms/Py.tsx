'use client'
import React, { useState } from "react"
import styles from '@/styles/Py.module.css'
import { State } from '@/components/forms/EstimateFormReducer'

const py = [
    { id: 1, value: '10평대' },
    { id: 2, value: '20평대' },
    { id: 3, value: '30평대' },
    { id: 4, value: '40평대' },
    { id: 5, value: '50평이상' }
]
interface pyProops {
    onChange: (type: keyof State, value: string | boolean) => void;
}
const Py: React.FC<pyProops> = ({ onChange }) => {
    const [selectedId, setSelectedId] = useState<number | null>(null); // 클릭된 요소의 ID를 저장
    const [selectedPy, setSelectedPy] = useState<keyof State | null>(null);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleValueAndStyle = (e: React.MouseEvent<HTMLDivElement>) => {
        const { dataset } = e.currentTarget;
        const value = dataset.value as string;
        const type = dataset.type as keyof State;
        const id = parseInt(dataset.id as string)
        if (selectedId === id && selectedPy === type && selectedValue === value) {
            setSelectedId(null);
            setSelectedPy(null);
            setSelectedValue(null);
            onChange(type, ''); // 빈값으로 설정
        } else {
            setSelectedId(id);
            setSelectedPy(type);
            setSelectedValue(value);
            onChange(type, value);
        }
    }
    return (
        <div className={styles.py}>
            <span style={{ fontWeight: 600 }}>평형</span>
            <div className={styles.py_content}>
                {py.map((py) => (
                    <div
                        key={py.id}
                        data-id={py.id}
                        data-type="py"
                        data-value={py.value}
                        className={styles.py_selectBox}
                        style={{
                            backgroundColor: selectedId === py.id ? 'blue' : '#fff',
                            color: selectedId === py.id ? '#fff' : '#333'
                        }}
                        onClick={handleValueAndStyle}
                    >
                        <span>{py.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Py;