import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'GmarketSansMedium',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
      color: '#333'
    }}>
      <Image
        src={'/images/declined_icon.png'}
        alt='declined image'
        width={100}
        height={100}
      />
      <h2 style={{ fontSize: '4rem', marginTop : '1rem' }}>페이지를 찾을 수 없습니다</h2>
      <p style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>URL 주소를 확인해주세요</p>
      <Link href="/" style={{ fontSize: '2rem', textDecoration: 'underline', fontFamily: 'GmarketSansMedium' }}>홈으로 돌아가기</Link>
    </div>
  )
}