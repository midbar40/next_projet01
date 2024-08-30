import {SignJWT, jwtVerify} from 'jose'

export const key = new TextEncoder().encode(process.env.JWT_SECRET)
export async function encrypt(userId : string) {
    const payload = {
        sub: userId, // 사용자 ID
        iat: Math.floor(Date.now() / 1000), // 발급 시간 (초 단위)
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 만료 시간 (24시간 후)
        role: 'admin', // 사용자 역할
    };
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key)
}

export async function decrypt(jwt : any) {
    try {
        const { payload } = await jwtVerify(jwt, key, {
            algorithms: ['HS256']
        })
        return payload
    } catch (error) {
        return null
    }
}