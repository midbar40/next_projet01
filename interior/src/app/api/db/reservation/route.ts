import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';



export async function POST(req: Request) {
    const { state } = await req.json()
    console.log('state', state)
    try {
        // 쿼리 실행
        const result = await sql`
         INSERT INTO reservation (contact, address, type, py, schedule, callTime, qna)
            VALUES (${state.contact}, ${state.juso + ' ' + state.detailJuso}, ${state.homeType}, ${state.py}, ${state.schedule}, ${state.callTime}, ${state.qna})
            `
        console.log('Table insert successfully');
        return NextResponse.json({ success: true, result });
    }
    catch (error) {
        console.error('DB 저장 error', error)
        return NextResponse.json({ success: false, error })
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