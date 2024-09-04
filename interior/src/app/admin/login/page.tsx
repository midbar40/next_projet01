'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/app/admin/login/page.module.css'
import { useAuth } from '@/app/admin/AuthContext';  // 경로는 실제 파일 위치에 맞게 수정
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
    const [errorMessage, setErrorMessage] = useState('')
    const { authentication, setAuthentication } = useAuth()
    const router = useRouter()
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    // 폼검증 함수
    const verifyFormValue = (id: string, pw: string) => {
        if (id === '' || pw === '') {
            setErrorMessage('빈칸을 모두 입력해주세요')
            return false;
        }
        else {
            setErrorMessage('')
            return true;
        }
    }
    const submitToServer = async () => {
        // 서버로 로그인 요청
        const response = await fetch('/api/auth/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id, password })
        })
        const result = await response.json()
        if (result.success) {
            setAuthentication(true)
            router.push('/admin/dashboard')
        }
        if (result.message === 'incorrect_NotApproved') {
            alert('암호가 틀렸거나 승인되지 않은 사용자 입니다')
        }
        if (result.message === 'empty') {
            alert('승인된 관리자가 존재하지 않습니다')
        }
    }

    const submitAdminInfo = async (e: React.FormEvent) => {
        e.preventDefault()
        if (verifyFormValue(id, password)) {
            await submitToServer()
            setId('')
            setPassword('')
        }
    }

    useEffect(() => {
        if (authentication) return router.push('/admin/dashboard')
    }, [])


    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <h1>집돌이즘 관리자 로그인</h1>
            </div>
            <div className={styles.loginForm}>
                <form onSubmit={submitAdminInfo}>
                    <div className={styles.inputDiv}>
                        <div className={styles.idDiv}>
                            <label htmlFor='id'>아이디</label><input type="text" id='id' value={id} onChange={(e) => setId(e.target.value)} />
                        </div>
                        <div className={styles.pwDiv}>
                            <label htmlFor='pw'>비밀번호</label><input type="password" id='pw' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.btn}>
                        <button>로그인</button>
                    </div>
                    {errorMessage !== '' && <p style={{ color: 'red', margin: '1rem 0' }}>{errorMessage}</p>}
                </form>
            </div>
            <Link href='/example'><div><span></span></div></Link>
        </div>
    )
}