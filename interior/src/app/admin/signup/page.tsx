'use client'
import React from "react";
import styles from '@/app/admin/signup/page.module.css'

export default function AdminSignup() {
    const submitAdminSignup = async () => {
        // 서버로 등록 요청
        console.log('등록 요청')
    }
    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <h1>집돌이즘 관리자 등록</h1>
            </div>
            <div className={styles.signupForm}>
                <form onClick={submitAdminSignup}>
                    <div className={styles.inputDiv}>
                        <div className={styles.idDiv}>
                            <label htmlFor='id'>아이디</label><input type="text" id='id' />
                        </div>
                        <div className={styles.pwDiv}>
                            <label htmlFor='pw'>비밀번호</label><input type="password" id='pw' />
                        </div>
                        <div className={styles.nameDiv}>
                            <label htmlFor='name'>이름</label><input type="text" id='name' />
                        </div>
                        <div className={styles.contactDiv}>
                            <label htmlFor='contact'>연락처</label><input type="text" id='contact' />
                        </div>
                        <div className={styles.emailDiv}>
                            <label htmlFor='email'>이메일</label><input type="text" id='email' />
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