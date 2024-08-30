// /app/admin/layout.tsx
'use client'
import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/app/admin/AuthContext'

interface AdminLayoutProps {
    children: ReactNode; // children의 타입을 명시
}

// 동적으로 버튼을 변경하는 컴포넌트
const Navigation = () => {
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

    useEffect(() => {
        setTimeout(() => setLoading(false), 500)
    }, []);

    return (
        <AuthProvider >
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Navigation />
                    <main>{children}</main>
                </div>
            )}
        </AuthProvider>
    );
}

