'use client'
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { convertUtcTimeToKoreanTime } from '@/app/common/function/convertUtcKoreanTIme';
import styles from '@/app/developer/AdmintDashboard.module.css'


// User 정보 타입 정의
interface Admin {
    id: string;
    name: string;
    contact: string;
    email: string;
    created_at: string;
    status: string;
}

interface AdmitDashboardProps {
    adminInfo: Admin[];
    setAdminInfo: Dispatch<SetStateAction<Admin[]>>;
    developAuth: boolean;
    setDevelopAuth: Dispatch<SetStateAction<boolean>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    getAdminReqInfo : () => Promise<void>
}


const sendEmailToAdmin = async (email: string, id: string, status: string) => {
    try {
        const response = await fetch('/api/nodemailer/adminAuth', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email, id, status: 'approved' })
        })
        const result = await response.json()
        console.log('nodemailer result', result)
        if (result.success) console.log('메일전송성공')
        else console.log('메일전송실패')
    } catch (error) {
        console.log('nodemailer Error', error)
    }
}

export default function AdmitDashboard({
    adminInfo,
    setAdminInfo,
    developAuth,
    setDevelopAuth,
    setLoading,
    getAdminReqInfo
}: AdmitDashboardProps) {
    const [status, setStatus] = useState('')
    const handleApproval = async (id: string, email: string) => {
        console.log('adminInfo', adminInfo)
        // 서버에서 status pending을 approved로 변경, PUT method
        try {
            const response = await fetch('/api/db/admin', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, status: 'approved' })
            })
            const result = await response.json()
            if (result.success) {
                alert('승인되었습니다')
                sendEmailToAdmin(email, id, 'approved')
                setStatus('approved')
                return true
            } else {
                alert('승인 실패');
            }
        } catch (error) {
            console.log('승인 error', error)
            alert('승인 처리 중 오류가 발생했습니다');
        }
    }
    const handleDenial = async (id: string, email: string) => {
        // 서버에서 status pending을 denied로 변경, PUT method
        try {
            const response = await fetch('/api/db/admin', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, status: 'denied' })
            })
            const result = await response.json()
            if (result.success) {
                alert('거절되었습니다')
                sendEmailToAdmin(email, id, 'denied')
                setStatus('denied')
                return true
            } else {
                alert('거절 실패');
            }
        } catch (error) {
            console.log('거절 error', error)
            alert('거절 처리 중 오류가 발생했습니다');
        }
    }
    const handleLogout = async () => {
        try {
            await fetch('/api/auth/developer/logout', {
                credentials: 'include'
            });
            setDevelopAuth(false);
        } catch (error) {
            console.error('Logout failed', error);
        }
    }

    useEffect(() => {
        // 서버에서 관리자 요청자 정보 가져오기
        getAdminReqInfo()
    }, [status])

    return (
        <div className={styles.main}>
            <div className={styles.logout}><span onClick={handleLogout}>로그아웃</span></div>
            <div className={styles.title}>
                <h1>견적문의 예약현황</h1>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>연락처</th>
                            <th>이메일</th>
                            <th>등록일</th>
                            <th>상태</th>
                            <th>승인</th>
                            <th>거절</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminInfo.map((item: Admin, index: number) => (
                            <tr key={item.contact}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.contact}</td>
                                <td>{item.email}</td>
                                <td>{convertUtcTimeToKoreanTime(item.created_at)}</td>
                                <td>{item.status}</td>
                                <td onClick={() => handleApproval(item.id, item.email)} style={{ color: 'blue', cursor: "pointer" }}>승인</td>
                                <td onClick={() => handleDenial(item.id, item.email)} style={{ color: 'red', cursor: "pointer" }}>거절</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
