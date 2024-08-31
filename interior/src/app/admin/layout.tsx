// /app/admin/layout.tsx
'use client'
import React, { ReactNode, useState, useEffect, Dispatch, SetStateAction, ReactElement } from 'react';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/app/admin/AuthContext'
import { UserInfoProvider } from '@/app/admin/UserInfoContext'

interface AdminLayoutProps {
    children: ReactNode; // children의 타입을 명시
}
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
// 동적으로 버튼을 변경하는 컴포넌트
const Navigation: React.FC = () => {
    const { authentication, setAuthentication } = useAuth();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/admin/logout', {
                credentials: 'include'
            });
            setAuthentication(false);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };
    return (
        <nav style={{ display: 'flex', gap: '20px', marginTop: '2rem', marginLeft: '2rem' }}>
            <Link href="/admin/dashboard">Dashboard</Link>
            {authentication ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link href="/admin/login">Login</Link>
                    <Link href="/admin/signup">Signup</Link>
                </>
            )}
        </nav>
    );
};
export default function AdminLayout({ children }: AdminLayoutProps) {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<User[]>([]);

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
    useEffect(() => {
        setLoading(false)
    }, []);

    return (
        <AuthProvider >
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
                }}>Loading...</div>
            ) : (
                <UserInfoProvider>
                        <Navigation/>
                        {children}
                </UserInfoProvider>
            )}
        </AuthProvider>
    );
}

