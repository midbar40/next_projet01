import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.NODEMAILER_SMTP_ID,
        pass: process.env.NODEMAILER_SMTP_PW,
    },
});

export const sendEmail = async (emailContent :string) => {
    const mailSetting = await transporter.sendMail({
        from: process.env.NODEMAILER_SMTP_ID,
        to: process.env.NODEMAILER_RECEIVER,
        subject: "[집돌이즘] 유저 상담이 등록되었습니다.",
        text: emailContent,
        //   html: "<b>Hello world?</b>", // html bodysS
    });
}
