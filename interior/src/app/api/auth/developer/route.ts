import { NextResponse } from 'next/server';
import { encrypt } from '@/app/api/auth/jwtToken'

export async function POST(req: Request) {
    const body = await req.json()
    const password = body.password
    const userId = process.env.DEVELOP_ID as string
    const token = body.token
    console.log('body', body)

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
            }
        )
        const data = await response.json();
        if (data.success && data.score >= 0.7) {
            const developerPw = process.env.DEVELOP_PW as string
            if (developerPw === password) {
                const token = await encrypt(userId, 'developer')
                const response = NextResponse.json({ success: true, message: 'admin 로그인 성공' })
                response.cookies.set("access-token-dp", token, { httpOnly: true, path: '/' })
                return response
            }
            else return NextResponse.json({ success: false, message: '암호가 일치하지 않습니다.' })
        } else {
            console.log('RECAPCHA false')
            return NextResponse.json({ success: false })
        }

    } catch (error) {
        console.log('developer login error', error)
        return NextResponse.json({ success: false, message: 'developer login error', error })
    }
}