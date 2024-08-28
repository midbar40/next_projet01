// /app/admin/layout.tsx
'use client'
import { useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface AdminLayoutProps {
    children: ReactNode; // children의 타입을 명시
}


export default function AdminLayout({ children }: AdminLayoutProps) {
    const [authentication, setAuthentication] = useState(false)
    const router = useRouter();
    const pathname = usePathname()
    console.log('pathname', pathname)
    useEffect(() => {
        if (!authentication && pathname === '/admin/dashboard') {
            router.push('/admin/login');
        }
    }, [authentication, router]);

    return (
        <div>
            <nav style={{display : 'flex', gap: '20px', marginTop : '2rem', marginLeft : '2rem'}}>
                <Link href="/admin/dashboard">Dashboard</Link>
                <Link href="/admin/login">Login</Link>
                <Link href="/admin/signup">Signup</Link>
            </nav>
            <main>{children}</main>
        </div >
    );
}