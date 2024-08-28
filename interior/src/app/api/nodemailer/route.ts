import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.NODEMAILER_SMTP_ID,
        pass: process.env.NODEMAILER_SMTP_PW,
    },
});

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
        const mailSetting = transporter.sendMail({
            from: process.env.NODEMAILER_SMTP_ID,
            to: process.env.NODEMAILER_RECEIVER,
            subject: "[집돌이즘] 유저 상담이 등록되었습니다.",
            text: emailContent,
            //   html: "<b>Hello world?</b>", // html bodysS
        });
        // 메일 전송 성공 시 응답 반환
        console.log('nodemailer Info', '이메일 전송 성공');
        return NextResponse.json({ success: true, message: '이메일 전송 성공' });
    } catch (error) {
        console.log('nodemailer Post error', error)
        return NextResponse.json({ success: false, message: '이메일 전송 실패' })
    }
}

