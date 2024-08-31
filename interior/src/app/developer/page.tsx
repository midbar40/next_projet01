'use client'
import React, { useState, useEffect } from "react";
import { convertUtcTimeToKoreanTime } from '@/app/common/function/convertUtcKoreanTIme';
import styles from '@/app/developer/page.module.css'
import DevelopLogin from '@/app/developer/DevelopLogin'
import AdmitDashboard from '@/app/developer/AdmintDashboard'

// User 정보 타입 정의
interface Admin {
    id: string;
    name: string;
    contact: string;
    email: string;
    created_at: string;
    status: string;
}



export default function DevelopHome() {
    const [adminInfo, setAdminInfo] = useState<Admin[]>([]);
    const [developAuth, setDevelopAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false); // 서버 데이터가 로드되었는지 여부

    const getAdminReqInfo = async () => {
        try {
            const response = await fetch('/api/db/admin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json()
            if (result.success) {
                setAdminInfo(result.result)
                setDataLoaded(true)
            }
            else console.log('서버 GET error', result.error)
        } catch (error) {
            console.log('서버 GET Unknown error', error)
        }
    }
    useEffect(() => {
        const checkLoginStatus = async () => {
            const response = await fetch('/api/auth/developer/check-auth', {
                credentials: 'include',
            })
            console.log('레이아웃response', response)
            if (response.ok) {
                setDevelopAuth(true)
                getAdminReqInfo()
            } else {
                setDevelopAuth(false)
            }
        }
        checkLoginStatus()
        setTimeout(() => setLoading(false), 100)
    }, [developAuth])


    return (
        <>
            {loading ? (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontSize: '2rem'
                }}>
                    Loading...
                </div>
            ) :
                (
                    developAuth ? (
                        dataLoaded && <AdmitDashboard
                            adminInfo={adminInfo}
                            setAdminInfo={setAdminInfo}
                            developAuth={developAuth}
                            setDevelopAuth={setDevelopAuth}
                            setLoading={setLoading}
                            getAdminReqInfo={getAdminReqInfo}
                        />
                    ) : (
                        <DevelopLogin setDevelopAuth={setDevelopAuth} />
                    )
                )
            }
        </>
    );
}    