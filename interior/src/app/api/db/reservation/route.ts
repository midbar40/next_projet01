import { NextResponse } from 'next/server';
import { connectMysql } from '@/app/api/db/connectDb'
import { createTable } from './createReservationTable';

createTable().catch(err => console.error('Unhandled error:', err));

export async function POST(req: Request) {
    let connection;
    const { state } = await req.json()
    console.log('state', state)
    try {
        connection = await connectMysql()
        // 테이블 생성 쿼리 (파라미터 바인딩을 사용하는 것이 좋습니다)
        const insertTableQuery = `
            INSERT INTO reservation (contact, address, type, py, schedule, callTime, qna)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            `;

        // 쿼리 실행
        if (connection) {
            const [result] = await connection.execute(insertTableQuery, [
                state.contact,
                state.juso + ' ' + state.detailJuso,
                state.homeType,
                state.py,
                state.schedule,
                state.callTime,
                state.qna
            ]);
            console.log('Table insert successfully');
            return NextResponse.json({ success: true, result });
        } else {
            console.error('Connection is undefined');
            return NextResponse.json({ success: false, error: 'Connection is undefined' });
        }
    }
    catch (error) {
        console.error('DB 저장 error', error)
        return NextResponse.json({ success: false, error })
    }
    finally {
        // 연결 종료
        if (connection) {
            try {
                await connection.end();
            } catch (err) {
                console.error('Error ending connection:', err);
            }
        }
    }
}

export async function GET() {
    let connection;
    try {
        connection = await connectMysql()
        if (connection) {
            const [result] = await connection.query('select * from reservation')
            console.log('get tableDB successfully')
            return NextResponse.json({ success: true, result })
        } else {
            console.error('Connection is undefined');
            return NextResponse.json({ success: false, error: 'Connection is undefined' });
        }
    } catch (error) {
        console.error('Get DBTable error', error)
        return NextResponse.json({ success: false, error })
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (error) {
                console.error('Error ending connection:', error);
            }
        }
    }
}