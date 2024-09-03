import { Connection } from 'mysql2/promise';
import { connectMysql } from '@/app/api/db/connectDb'

export async function createTable() {
    let connection: Connection | undefined;

    try {
        // MySQL 연결 생성
        connection = await connectMysql(); // 연결 객체를 가져옴

        // 테이블 생성 쿼리
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS admin (
            no INT AUTO_INCREMENT PRIMARY KEY,
            id VARCHAR(50) NOT NULL UNIQUE,
            pw VARCHAR(255) NOT NULL,
            name VARCHAR(50) NOT NULL,
            contact VARCHAR(15) NOT NULL UNIQUE,  
            email VARCHAR(100) NOT NULL UNIQUE,    
            status VARCHAR(15) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        // 쿼리 실행
        if (connection) {
            await connection.query(createTableQuery);
            console.log('Table created successfully');
        } else {
            console.error('Connection is undefined');
        }
    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
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

