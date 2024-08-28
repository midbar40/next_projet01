import { Connection } from 'mysql2/promise';
import { connectMysql } from '@/app/api/db/connectDb'

export async function createTable() {
    let connection: Connection | undefined;

    try {
        // MySQL 연결 생성
        connection = await connectMysql(); // 연결 객체를 가져옴

        // 테이블 생성 쿼리
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS reservation (
            id INT AUTO_INCREMENT PRIMARY KEY,
            contact VARCHAR(15) NOT NULL,  
            address VARCHAR(30) NOT NULL,    
            type VARCHAR(15) NOT NULL,     
            py VARCHAR(15) NOT NULL,       
            schedule VARCHAR(15) NOT NULL, 
            callTime VARCHAR(15) NOT NULL, 
            qna TEXT NOT NULL,            
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

