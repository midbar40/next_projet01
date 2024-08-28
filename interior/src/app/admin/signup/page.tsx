'use client'
import React, { useReducer, useState } from "react";
import styles from '@/app/admin/signup/page.module.css'
import { State, reducer, initialState } from '@/app/admin/signup/AdminSignupReducer'

export default function AdminSignup() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [errorMessage, setErrorMessage] = useState('')

    // 서버 db로 admin Info저장
    const submitAdminInfo = async () => {
        const response = await fetch('/api/db/admin', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ state })
        })
        const result = await response.json()
        console.log('admin등록요청 result ', result)
        if (result.success) return alert('관리자 등록 요청이 완료되었습니다, 1~2일 정도 신원확인이 소요되며, 이메일로 결과를 받아보신 후에 로그인이 가능합니다')
        if (result.message === '중복가입오류') return alert('이미 가입된 회원입니다')
        else return alert('관리자 등록 요청에 실패했습니다, 관계자에게 문의하세요')
    }

    // 폼 전체를 초기화하는 함수
    const resetForm = () => {
        dispatch({ type: 'RESET_FORM' });
    }

    // 폼 제출
    const submitAdminSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        // 서버로 등록 요청
        console.log('등록 요청', state)
        if (verifyFormValue(state)) {
            await submitAdminInfo()
            resetForm()
        }
    }
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: e.target.id as keyof State, value: e.target.value })
    }
    // 폼검증 함수
    const verifyFormValue = (formValue: State) => {
        const mobileRegex = /^01[0-9]{1}-?[0-9]{3,4}-?[0-9]{4}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (
            formValue.id === '' ||
            formValue.pw === '' ||
            formValue.name === '' ||
            formValue.contact === '' ||
            formValue.email === ''
        ) {
            setErrorMessage('빈칸을 모두 입력해주세요')
            return false;
        }
        else if (!mobileRegex.test(formValue.contact)) {
            setErrorMessage('핸드폰 번호를 올바르게 입력해주세요')
            return false;
        }
        else if (!emailRegex.test(formValue.email)) {
            setErrorMessage('이메일을 올바르게 입력해주세요')
            return false;
        }
        else {
            setErrorMessage('')
            return true;
        }
    }
    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <h1>집돌이즘 관리자 등록</h1>
            </div>
            <div className={styles.signupForm}>
                <form onSubmit={submitAdminSignup}>
                    <div className={styles.inputDiv}>
                        <div className={styles.idDiv}>
                            <label htmlFor='id'>아이디</label>
                            <input type="text" id='id' value={state.id} onChange={handleInputValue} />
                        </div>
                        <div className={styles.pwDiv}>
                            <label htmlFor='pw'>비밀번호</label>
                            <input type="password" id='pw' value={state.pw} onChange={handleInputValue} />
                        </div>
                        <div className={styles.nameDiv}>
                            <label htmlFor='name'>이름</label>
                            <input type="text" id='name' value={state.name} onChange={handleInputValue} />
                        </div>
                        <div className={styles.contactDiv}>
                            <label htmlFor='contact'>연락처</label>
                            <input type="text" id='contact' value={state.contact} onChange={handleInputValue} />
                        </div>
                        <div className={styles.emailDiv}>
                            <label htmlFor='email'>이메일</label>
                            <input type="text" id='email' value={state.email} onChange={handleInputValue} />
                        </div>
                    </div>
                    <div className={styles.btn}>
                        <button>등록요청</button>
                    </div>
                    {errorMessage !== '' && <p style={{ color: 'red', margin: '1rem 0' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    )
}