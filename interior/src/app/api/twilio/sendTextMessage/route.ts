import { NextResponse } from 'next/server';
import twilio from "twilio"
import { formatPhoneNumberToInternational } from '@/app/common/function/phoneNumberToInternational'

export async function POST(req: Request) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const client = twilio(accountSid, authToken);
    try {
        let request = await req.json()
        let content = request.textContent;
        let contact = formatPhoneNumberToInternational(request.contact)

        console.log('content', request.textContent)
        console.log('contact', contact)

        const message = await client.messages.create({
            body: content,
            from: '+14243561013',
            to: contact
        })
        console.log('message.sid', message.sid)
        console.log('message', message)
        return NextResponse.json({ success: true, message })
    } catch (error) {
        console.error('트윌로문자발송에러', error)
        return NextResponse.json({ success: false, error })
    }

}

