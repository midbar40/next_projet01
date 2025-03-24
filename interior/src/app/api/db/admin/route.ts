import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { createTable } from './vercelPostgreCreateTable';
import bcrypt from 'bcrypt'

createTable().catch(err => console.error('Error creating table:', err));

// hash암호화 함수
async function hashPassword(pw: string) {
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(pw, saltRounds)
        return hashedPassword
    } catch (error) {
        console.log('hash암호화 실패', error)
    }
}

export async function POST(req: Request) {
    const { state } = await req.json()
    console.log('state', state)
    try {
        // 쿼리 실행
        const hashedPassword = await hashPassword(state.pw)
        const result = await sql`
            INSERT INTO admin (id, pw, name, contact, email, status)
             VALUES (${state.id}, ${hashedPassword}, ${state.name}, ${state.contact}, ${state.email},  'pending');
        `;
        console.log('Table admin insert successfully');
        return NextResponse.json({ success: true, result });
    }
    catch (error: unknown) {
        console.error('DB 저장 error', error)
        if ((error as any).code === 23505) { return NextResponse.json({ success: false, message: '중복가입오류' }) }
        else { return NextResponse.json({ success: false, message: '관리자 등록 요청에 실패했습니다' }) }
    }
}

export async function GET() {
    try {
        const result = await sql.query('select * from admin')
        console.log('get tableDB successfully')
        return NextResponse.json({ success: true, result })

    } catch (error) {
        console.error('Get DBTable error', error)
        return NextResponse.json({ success: false, error })
    }
}

export async function PUT(req: Request) {
    const body = await req.json()
    const id = body.id; // ID를 정수로 변환
    const status = body.status; // 업데이트할 상태

    try {
        const result = await sql`
        UPDATE admin
        SET status = ${status}
        WHERE id = ${id}
    `;
        console.log('result', result)
        return NextResponse.json({ success: true, result })

    } catch (error) {
        console.error('PUT DBTable error', error)
        return NextResponse.json({ success: false, error })
    }
}