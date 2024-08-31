import { NextResponse } from 'next/server';
import { encrypt } from '@/app/api/auth/jwtToken'

export async function POST(req: Request) {
    const body = await req.json()
    const password = body.password
    const userId = process.env.DEVELOP_ID as string
    console.log('body', body)
    
    try {
        const developerPw = process.env.DEVELOP_PW as string
        if (developerPw === password) {
            const token = await encrypt(userId, 'developer')
            const response = NextResponse.json({ success: true, message: 'admin 로그인 성공' })
            response.cookies.set("access-token-dp", token, { httpOnly: true, path: '/' })
            return response
        }
        else return NextResponse.json({ success: false, message : '암호가 일치하지 않습니다.' })    
    } catch (error) {
        console.log('developer login error', error)
        return NextResponse.json({ success: false, message : 'developer login error', error })    
    }
}