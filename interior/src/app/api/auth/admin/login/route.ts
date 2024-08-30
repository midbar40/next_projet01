import { NextResponse } from 'next/server';
import { connectMysql } from '@/app/api/db/connectDb'
import bcrypt from 'bcrypt'
import { RowDataPacket } from 'mysql2';
import {  encrypt } from '../jwtToken'

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
    let connection;
    try {
        // DB 내 아이디, 비밀번호 비교, status 상태확인
        connection = await connectMysql();
        if (connection) {
            const [result] = await connection.query<Admin[]>(`SELECT id, pw, status FROM admin WHERE id = ?`, [id])
            if (result.length > 0) {
                const admin = result[0]; // 첫 번째 행 접근
                const isMatch = await bcrypt.compare(password, admin.pw);
                if (isMatch && admin.status === 'approved') {
                    // 쿠키설정
                    const token = await encrypt(id)
                    console.log('jwtToken', token)
                    const response = NextResponse.json({ success: true, message: 'admin 로그인 성공' })
                    response.cookies.set("access-token", token, { httpOnly: true, path: '/' })
                    return response
                } else {
                    return NextResponse.json({ success: false, message: 'incorrect_NotApproved' })
                }
            } else {
                return NextResponse.json({ success: false, message: 'empty' })
            }
        }
    }
    catch (error) {
        console.log('admin login error', error)
        return NextResponse.json({ success: false, message: 'admin login error', error })
    }
}