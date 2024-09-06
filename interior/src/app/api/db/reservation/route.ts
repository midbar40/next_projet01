import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { createTable } from './vercelPostgreCreateTable';


createTable().catch(err => console.error('Error creating table:', err));

export async function POST(req: Request) {
    const { state, token } = await req.json()
    console.log('state', state)
    console.log('token', token)
    if (!token) { return NextResponse.json({ success: false, message: 'RECAPCHA Token is not exist' }) }
    else {
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
            console.log('recapcha data', data)
            if (data.success) {
                // 쿼리 실행
                const result = await sql`
         INSERT INTO reservation (contact, address, type, py, schedule, callTime, qna)
            VALUES (${state.contact}, ${state.juso + ' ' + state.detailJuso}, ${state.homeType}, ${state.py}, ${state.schedule}, ${state.callTime}, ${state.qna})
            `
                console.log('Table insert successfully');
                return NextResponse.json({ success: true, result });
            } else {
                console.log('RECAPCHA false')
                return NextResponse.json({ success: false })
            }
        }
        catch (error) {
            console.error('DB 저장 error', error)
            return NextResponse.json({ success: false, message: 'RECAPCHA is not success' })
        }
    }
}

export async function GET() {
    try {
        const result = await sql`select * from reservation`;
        console.log('get tableDB successfully')
        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error('Get DBTable error', error)
        return NextResponse.json({ success: false, error })
    }
}