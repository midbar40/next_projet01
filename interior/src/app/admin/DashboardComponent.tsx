'use client'
import React, { useState, useEffect } from "react";
import { convertUtcTimeToKoreanTime } from '@/app/common/function/convertUtcKoreanTIme';
// import AdminLogin from "@/app/admin/login/page";
import styles from '@/app/admin/dashboard/page.module.css'
import { useAuth } from '@/app/admin/AuthContext';  // 경로는 실제 파일 위치에 맞게 수정
import { useRouter } from 'next/navigation'
import { useUserInfo } from '@/app/admin/UserInfoContext'

export default function DashboardComponent() {
    const { authentication, setAuthentication } = useAuth()
    const { userInfo, setUserInfo } = useUserInfo()
    const router = useRouter()

    useEffect(() => {
        if (!authentication) {
            // 인증되지 않은 경우 로그인 페이지로 리다이렉트
            router.push('/admin/login');
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