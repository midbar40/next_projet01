import { NextResponse } from 'next/server';
import { connectMysql } from '@/app/api/db/connectDb'
import { createTable } from './createAdminTable';
import bcrypt from 'bcrypt'

createTable().catch(err => console.error('Unhandled error:', err));

// hash암호화 함수
async function hashPassword(pw:string){
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(pw, saltRounds)
        return hashedPassword
    } catch (error) {
        console.log('hash암호화 실패',error)
    }
}

export async function POST(req: Request) {
    let connection;
    const { state } = await req.json()
    console.log('state', state)
    try {
        connection = await connectMysql()
        // 테이블 생성 쿼리 (파라미터 바인딩을 사용하는 것이 좋습니다)
        const insertTableQuery = `
            INSERT INTO admin (id, pw, name, contact, email, status)
            VALUES (?, ?, ?, ?, ?, ?);
            `;

        // 쿼리 실행
        if (connection) {
            const hashedPassword = await hashPassword(state.pw)
            const [result] = await connection.execute(insertTableQuery, [
                state.id,
                hashedPassword,
                state.name,
                state.contact,
                state.email,
                'pending',
            ]);
            console.log('Table admin insert successfully');
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
            const [result] = await connection.query('select * from admin')
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