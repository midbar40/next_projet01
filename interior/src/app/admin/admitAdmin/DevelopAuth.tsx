'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './DevelopAuth.module.css'

interface DevelopAuthProps {
    setDevelopAuth: Dispatch<SetStateAction<boolean>>;
}

// 서버에 암호확인
const checkPassword = async (password: string) => {
    console.log('checkPassword', password)
    try {
        const response = await fetch('/api/auth/developer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        })
        const result = await response.json()
        return result.success; // success가 true이면 true, 아니면 false 반환
    } catch (error) {
        console.log('checkPassword error', error)
        return false; // 에러가 발생했을 때는 false 반환
    }
}

export default function DevelopAuth({ setDevelopAuth }: DevelopAuthProps) {
    const [password, setPassword] = useState('')
    const handleDelvopAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('password', password)
        const passwordMatched = await checkPassword(password)
        if (passwordMatched) {
            setDevelopAuth(true)
        }
        else {
            alert('비밀번호가 일치하지 않습니다')
        }
    }
    // useEffect(()=> {
    //     console.log(password)
    // }, [password])
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

