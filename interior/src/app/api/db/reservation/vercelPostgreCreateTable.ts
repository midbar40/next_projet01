import { sql } from '@vercel/postgres';

export async function createTable() {
    try {
        // 테이블 생성 쿼리
        await sql`
      CREATE TABLE IF NOT EXISTS reservation (
            id SERIAL PRIMARY KEY,
            contact VARCHAR(15) NOT NULL,  
            address VARCHAR(100) NOT NULL,    
            type VARCHAR(15) NOT NULL,     
            py VARCHAR(15) NOT NULL,       
            schedule VARCHAR(15) NOT NULL, 
            callTime VARCHAR(15) NOT NULL, 
            qna TEXT NOT NULL,            
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    }
}

