import { NextResponse } from 'next/server';
import { sendEmail } from '../connectNodeGmail'


// async..await is not allowed in global scope, must use a wrapper
export async function POST(req: Request) {
    const content = await req.json()
    const { juso, detailJuso, homeType, py, schedule, contact, callTime, qna } = content.state
    console.log('프론트정보', content)
    const regex = /^01[0-9]{1}-?[0-9]{3,4}-?[0-9]{4}$/;

    const reformData = `
    ■ 접수내용
    
    - 주소 : ${juso + ' ' + detailJuso} 
    - 유형 : ${homeType} 
    - 평형 : ${py} 
    - 공사가능기간 : ${schedule} 
    - 연락처: ${contact} 
    - 연락가능시간 : ${callTime} 
    - 문의사항 : ${qna}
`;

    // 여기서는 ','을 공백으로 대체하고, 필요 없는 '\n'을 제거합니다
    const emailContent = reformData.replace(/,/g, ' ')
    try {
        // send mail with defined transport object
        await sendEmail(emailContent)
        // 메일 전송 성공 시 응답 반환
        console.log('nodemailer Info', '이메일 전송 성공');
        return NextResponse.json({ success: true, message: '이메일 전송 성공' });
    } catch (error) {
        console.log('nodemailer Post error', error)
        return NextResponse.json({ success: false, message: '이메일 전송 실패' })
    }
}

