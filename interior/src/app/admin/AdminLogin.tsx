import React from "react";
import styles from '@/app/admin/AdminLogin.module.css'

export default function AdminLogin() {
    const submitAdminInfo = async () => {
        // 서버로 로그인 요청
        console.log('로그인 요청')
    }
    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <h1>집돌이즘 관리자 로그인</h1>
            </div>
            <div className={styles.loginForm}>
                <form onClick={submitAdminInfo}>
                    <div className={styles.inputDiv}>
                        <div className={styles.idDiv}>
                            <label htmlFor='id'>아이디</label><input type="text" id='id' />
                        </div>
                        <div className={styles.pwDiv}>
                            <label htmlFor='pw'>비밀번호</label><input type="password" id='pw' />
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