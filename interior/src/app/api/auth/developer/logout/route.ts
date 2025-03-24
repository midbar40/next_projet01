import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json({ success: true, message: '로그아웃 성공' })
        response.cookies.delete('access-token-dp')
        return response
    } catch (error) {
        console.log('로그아웃 에러', error)
        return NextResponse.json({ success: false, error })
    }
}
