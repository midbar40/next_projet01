import { sql } from '@vercel/postgres';

export async function createTable() {
    try {
        // PostgreSQL 연결 생성
        // sql 객체는 자동으로 설정되어 있으므로, 별도의 연결 생성이 필요 없습니다.
        
        // 테이블 생성 쿼리
        await sql `
        CREATE TABLE IF NOT EXISTS admin (
            no SERIAL PRIMARY KEY,
            id VARCHAR(50) NOT NULL UNIQUE,
            pw VARCHAR(255) NOT NULL,
            name VARCHAR(50) NOT NULL,
            contact VARCHAR(15) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            status VARCHAR(15) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
        `;
        // 쿼리 실행
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    }
}
