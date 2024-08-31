'use client'
import React, { useState, useEffect } from "react";
import { convertUtcTimeToKoreanTime } from '@/app/common/function/convertUtcKoreanTIme';
// import AdminLogin from "@/app/admin/login/page";
import styles from '@/app/admin/dashboard/page.module.css'
import { useAuth } from '@/app/admin/AuthContext';  // 경로는 실제 파일 위치에 맞게 수정
import { useRouter } from 'next/navigation'
import DashboardComponent from '../DashboardComponent'
import { useDataLoaded } from '@/app/admin/UserInfoContext'

export default function AdminDashboard() {
    const { authentication, setAuthentication } = useAuth()
    const { dataLoaded } = useDataLoaded()
    const router = useRouter()
    useEffect(() => {
        if (!authentication) {
            // 인증되지 않은 경우 로그인 페이지로 리다이렉트
            router.push('/admin/login');
        }
    }, [authentication, router]); // 빈 배열로 의존성 설정
    return dataLoaded && <DashboardComponent />
}
