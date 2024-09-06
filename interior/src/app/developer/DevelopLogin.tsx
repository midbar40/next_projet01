'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './DevelopLogin.module.css'
import { useReCaptcha } from "next-recaptcha-v3";

interface DevelopLoginProps {
    setDevelopAuth: Dispatch<SetStateAction<boolean>>;
}

// 서버에 암호확인
const checkPassword = async (password: string, token: string) => {
   
    try {
        const response = await fetch('/api/auth/developer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, token })
        })
        const result = await response.json()
        return result.success; // success가 true이면 true, 아니면 false 반환
    } catch (error) {
        console.log('checkPassword error', error)
        return false; // 에러가 발생했을 때는 false 반환
    }
}

export default function DevelopLogin({ setDevelopAuth }: DevelopLoginProps) {
    const [password, setPassword] = useState('')
    const { executeRecaptcha } = useReCaptcha();


    const handleDelvopAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = await executeRecaptcha("developer");
        const passwordMatched = await checkPassword(password, token)
        if (passwordMatched) {
            setDevelopAuth(true)
        }
        else {
            alert('비밀번호가 일치하지 않습니다')
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <h1>집돌이즘 개발자 로그인</h1>
            </div>
            <div className={styles.loginForm}>
                <form onSubmit={handleDelvopAuth}>
                    <div className={styles.inputDiv}>
                        <div className={styles.pwDiv}>
                            <label htmlFor='pw'>비밀번호</label>
                            <input type="password" id='pw'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                        </div>
                    </div>
                    <div className={styles.btn}>
                        <button>로그인</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

