'use client'
import React, { useState, useEffect } from "react";
import { convertUtcTimeToKoreanTime } from '@/app/common/function/convertUtcKoreanTIme';
// import AdminLogin from "@/app/admin/login/page";
import styles from '@/app/admin/dashboard/page.module.css'
import { useAuth } from '@/app/admin/AuthContext';  // 경로는 실제 파일 위치에 맞게 수정
import { useRouter } from 'next/navigation'

// User 정보 타입 정의
interface User {
    contact: string;
    address: string;
    type: string;
    py: string;
    schedule: string;
    callTime: string;
    qna: string;
    created_at: string;
}
export default function AdminDashboard() {
    const { authentication, setAuthentication } = useAuth()

    const router = useRouter()

    const [userInfo, setUserInfo] = useState<User[]>([]);
    const getUserData = async () => {
        try {
            const response = await fetch('/api/db/reservation');
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
        if (!authentication) {
            // 인증되지 않은 경우 로그인 페이지로 리다이렉트
            router.push('/admin/login');
        } else {
            // 인증된 경우 데이터 요청
            const getUserData = async () => {
                try {
                    const response = await fetch('/api/db/reservation');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const serverData = await response.json();
                    setUserInfo(serverData.result); // 서버 데이터에서 사용자 정보 추출
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } 
            };

            getUserData(); // 데이터 가져오기
        }
    }, [authentication, router]); // 빈 배열로 의존성 설정

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
                            <th>연락처</th>
                            <th>주소</th>
                            <th>타입</th>
                            <th>평형</th>
                            <th>공사가능일정</th>
                            <th>연락가능시간</th>
                            <th>문의사항</th>
                            <th>생성일</th>
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