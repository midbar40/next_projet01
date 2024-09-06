import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'
import { RowDataPacket } from 'mysql2';
import { encrypt } from '../../jwtToken'

// 예시로 쿼리에서 반환될 데이터의 구조를 명확히 정의
interface Admin extends RowDataPacket {
    id: string;
    pw: string;
    status: string;
}


export async function POST(req: Request) {
    const body = await req.json()
    const id = body.id
    const password = body.password
    const token = body.token
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
        if (data.success) {
            // DB 내 아이디, 비밀번호 비교, status 상태확인
            const result = await sql.query(`SELECT id, pw, status FROM admin WHERE id = $1`, [id])
            if (result.rows.length > 0) {
                const admin = result.rows[0];
                const isMatch = await bcrypt.compare(password, admin.pw);
                if (isMatch && admin.status === 'approved') {
                    // 쿠키설정
                    const token = await encrypt(id, 'admin')
                    console.log('jwtToken', token)
                    const response = NextResponse.json({ success: true, message: 'admin 로그인 성공' })
                    response.cookies.set("access-token", token, { httpOnly: true, path: '/' })
                    return response
                } else {
                    return NextResponse.json({ success: false, message: 'incorrect_NotApproved' })
                }
            }
        } else {
            console.log('RECAPCHA false')
            return NextResponse.json({ success: false })
        }
    }
    catch (error) {
        console.log('admin login error', error)
        return NextResponse.json({ success: false, message: 'admin login error', error })
    }
}