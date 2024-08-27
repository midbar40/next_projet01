'use client'
import React, { useState, useEffect } from "react";
import { convertUtcTimeToKoreanTime } from '@/app/common/function/convertUtcKoreanTIme';
// import AdminLogin from "@/app/admin/login/page";
import styles from '@/app/admin/dashboard/page.module.css'

// User 정보 타입 정의
interface Admin {
    id : string;
    name : string;
    contact: string;
    email : string;
    created_at: string;
}
export default function AdmitAdmin ({authentication}) {
    const [userInfo, setUserInfo] = useState<Admin[]>([]);
    const getUserData = async () => {
        try {
            const response = await fetch('/api/db');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const serverData = await response.json();
            console.log('serverData', serverData)
            setUserInfo(serverData.result); // 서버 데이터에서 사용자 정보 추출
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        if (authentication) getUserData(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, [authentication]); // 빈 배열로 의존성 설정

    // if (!authentication) return (
    //     <AdminLogin />
    // )

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
                        </tr>
                    </thead>
                    <tbody>
                        {userInfo.map((item, index) => (
                            <tr key={item.contact}>
                                <td>{index + 1}</td>
                                <td>{item.contact}</td>
                                <td>{item.address}</td>
                                <td>{item.type}</td>
                                <td>{item.py}</td>
                                <td>{item.schedule}</td>
                                <td>{item.callTime}</td>
                                <td>{item.qna}</td>
                                <td>{convertUtcTimeToKoreanTime(item.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}