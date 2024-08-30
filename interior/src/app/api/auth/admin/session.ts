// import { cookies } from 'next/headers';
// import { NextResponse, type NextRequest } from 'next/server'


// const cookie = {
//     name: 'session',
//     options: { httpOnly: true, secure: true, sameSite: 'lax', path: '/' },
//     duration: 24 * 60 * 60 * 1000
// }

// export async function createSession(userId) {
//     const expires = new Date(Date.now() + cookie.duration)
//     const session = await encrypt({ userId, expires })

//     cookies().set(cookie.name, session, { ...cookie.options, expires })
//     NextResponse.redirect('/admin/dashboard')
// }

// export async function verifySession() {
//     const cookie = cookies().get(cookie.name)?.value
//     const session = await decrypt(cookie)
//     if (!session?.userId) {
//         redirect('/admin/login')
//     }
//     return { userId: session userId }
// }

// export async funciton deleteSession(){
//     cookies().delete(cookie.name)
//     redirect('/admin/login')
// }
