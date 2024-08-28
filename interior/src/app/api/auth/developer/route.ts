import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json()
    const password = body.password
    console.log('body', body)
    try {
        const developerPw = process.env.DEVELOP_PW as string
        if (developerPw === password) return NextResponse.json({ success: true })
        else return NextResponse.json({ success: false, message : '암호가 일치하지 않습니다.' })    
    } catch (error) {
        console.log('developer login error', error)
        return NextResponse.json({ success: false, message : 'developer login error', error })    
    }
}