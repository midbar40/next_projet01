// app/api/auth/admin/check-auth/route.js
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { decrypt } from '@/app/api/auth/jwtToken'

interface Token {
    sub: string;
    iat: number;
    exp: number;
    role: string;
}
function isTokenValid(token: Partial<Token>): boolean {
    const currentTime = Date.now() / 1000;

    return (
        token && // 토큰이 존재하고
        typeof token.exp === 'number' && // exp가 숫자형이고
        token.exp > currentTime && // 만료되지 않았고
        token.role === 'admin' // 역할이 admin일 때
    );
}

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('access-token')
  console.log('token', token)

  if (!token) {
    return NextResponse.json({ isLoggedIn: false, message: '토큰이 존재하지 않습니다' })
  }
  try {
    const decryptedToken = await decrypt(token.value);
    
    if (!decryptedToken ||  isTokenValid(decryptedToken)) {
      return NextResponse.json({ isLoggedIn: true })
    } else {
      return NextResponse.json({ isLoggedIn: false }, { status: 401 })
    }
  } catch (error) {
    console.error('Token decryption error:', error)
    return NextResponse.json({ isLoggedIn: false }, { status: 401 })
  }
}

