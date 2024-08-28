'use client'
import React, { useReducer } from "react";
import styles from '@/app/admin/signup/page.module.css'
import { State, reducer, initialState } from '@/app/admin/signup/AdminSignupReducer'

export default function AdminSignup() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const submitAdminSignup = async (e:React.FormEvent) => {
        e.preventDefault()
        // 서버로 등록 요청
        console.log('등록 요청', state)
        const response = await fetch('/api/db/admin', {
            method : 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ state })
        })
        const result = await response.json()
        console.log('admin등록요청 result ', result)
       if(result.success) return alert('관리자 등록 요청이 완료되었습니다, 1~2일 정도 신원확인이 소요되며, 이메일로 결과를 받아보신 후에 로그인이 가능합니다')
       else return alert('관리자 등록 요청에 실패했습니다, 관계자에게 문의하세요')
    }
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: e.target.id as keyof State, value: e.target.value })
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
                </form>
            </div>
        </div>
    )
}