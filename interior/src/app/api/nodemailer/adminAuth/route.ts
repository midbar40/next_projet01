import { NextResponse } from 'next/server';
import { transporter } from '../connectNodeGmail'

// 비동기 함수로 수정
const sendEmail = async (email: string, emailContent: string) => {
    const mailSetting = await transporter.sendMail({
        from: process.env.NODEMAILER_SMTP_ID,
        to: email,
        subject: "[집돌이즘] 관리자 등록요청 결과.",
        text: emailContent,
        // html: "<b>Hello world?</b>", // html body
    });
}

export async function POST(req: Request) {
    try {
        const content = await req.json();
        console.log('프론트정보', content);
        const { id, email, status } = content;

        const approvedText = `
            관리자 요청이 승인되었습니다.
            관리자 로그인페이지에서 로그인 하세요.
            *신청아이디 : ${id}
            www.localhost:3000/admin/login
        `;
        const deniedText = `
            관리자 요청이 거절되었습니다.
            담당자 확인 바랍니다.
        `;

        // 상태에 따라 이메일 전송
        if (status === 'approved') {
            await sendEmail(email, approvedText);
        } else if (status === 'denied') {
            await sendEmail(email, deniedText);
        }

        // 메일 전송 성공 시 응답 반환
        console.log('nodemailer Info', '이메일 전송 성공');
        return NextResponse.json({ success: true, message: '이메일 전송 성공' });

    } catch (error) {
        console.log('nodemailer Post error', error);
        return NextResponse.json({ success: false, message: '이메일 전송 실패' });
    }
}
