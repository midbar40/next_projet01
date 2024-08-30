'use client'
import React, { useState, useEffect } from "react";
import { convertUtcTimeToKoreanTime } from '@/app/common/function/convertUtcKoreanTIme';
import styles from '@/app/developer/page.module.css'
import DevelopAuth from '@/app/developer/DevelopAuth'


// User 정보 타입 정의
interface Admin {
    id: string;
    name: string;
    contact: string;
    email: string;
    created_at: string;
    status: string;
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

export default function AdmitAdmin() {
    const [adminInfo, setAdminInfo] = useState<Admin[]>([]);
    const [developAuth, setDevelopAuth] = useState<boolean>(false);

    const getAdminReqInfo = async () => {
        try {
            const response = await fetch('/api/db/admin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json()
            if (result.success) setAdminInfo(result.result)
            else console.log('서버 GET error', result.error)
        } catch (error) {
            console.log('서버 GET Unknown error', error)
        }
    }

    useEffect(() => {
        // 서버에서 관리자 요청자 정보 가져오기
        // status가 변경되면 자동 dom업데이트가 되어야하는데 안되고 있음, 의존성배열에 adminInfo를 넣으면 무한루프가 발생함
        if (developAuth) getAdminReqInfo()
    }, [developAuth])

    if (!developAuth) return (<DevelopAuth setDevelopAuth={setDevelopAuth} />)
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
                return true
            } else {
                alert('거절 실패');
            }
        } catch (error) {
            console.log('거절 error', error)
            alert('거절 처리 중 오류가 발생했습니다');
        }
    }
    return (
        <div className={styles.main}>
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