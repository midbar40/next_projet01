'use client'
import React, { useState, useEffect } from "react";
import { convertUtcTimeToKoreanTime } from '@/app/common/function/convertUtcKoreanTIme';
import styles from '@/app/admin/admitAdmin/page.module.css'
import DevelopAuth from '@/app/admin/admitAdmin/DevelopAuth'

// User 정보 타입 정의
interface Admin {
    id: string;
    name: string;
    contact: string;
    email: string;
    created_at: string;
    status: string;
}

export default function AdmitAdmin() {
    const [adminInfo, setAdminInfo] = useState<Admin[]>([]);
    const [developAuth, setDevelopAuth] = useState<boolean>(false);
    useEffect(() => {
        // 서버에서 관리자 요청자 정보 가져오기
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
        if (developAuth) getAdminReqInfo()
    }, [developAuth])

    if (!developAuth) return (<DevelopAuth setDevelopAuth={setDevelopAuth} />)
    const handleApproval = (id: string) => {
        // 서버에서 status pending을 approved로 변경, PUT method
        // 등록된 이메일로 approved되었으니 로그인하라는 메시지와 링크 남기기
    }
    const handleDenial = (id: string) => {
        // 서버에서 status pending을 denied로 변경, PUT method
        // 등록된 이메일로 denied 알림
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
                                <td onClick={() => handleApproval(item.id)} style={{ color: 'blue', cursor: "pointer" }}>승인</td>
                                <td onClick={() => handleDenial(item.id)} style={{ color: 'red', cursor: "pointer" }}>거절</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}