import mysql, { Connection } from 'mysql2/promise';

// 데이터베이스 연결 설정
export async function connectMysql(): Promise<Connection> {
    try {
        // 데이터베이스와의 연결을 생성하고 반환
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        console.log('mysql db connected');
        return connection; // 연결 객체를 반환
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        throw error; // 오류를 던져서 호출자에게 알림
    }
}