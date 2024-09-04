'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import Image from 'next/image'

const Header: React.FC = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleMenuToggle = () => {
    setMenuOpen(prevOpen => !prevOpen)
  }
  useEffect(() => {
    if (menuOpen) {
      // 메뉴가 열렸을 때 스크롤 방지
      console.log('document.body', document.body)
      document.body.style.position = 'fixed';
    } else {
      // 메뉴가 닫혔을 때 스크롤 활성화
      document.body.style.position = 'unset';
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <Link href='/'>
            <li className={styles.brandName}>
              <div className={styles.brandName_div}>
                <Image
                  src="/images/brandLogo.png"
                  alt='brandLogo'
                  width={30}
                  height={30}
                  priority
                />
                <h1>집돌이즘</h1>
              </div>
            </li>
          </Link>
        </ul>
        {isMobile ? (
          <div className={styles.hamburger_menu} onClick={handleMenuToggle}>☰</div>
        ) : (
          <ul className={styles.link}>
            <Link href='/example'><li>시공사례</li></Link>
            <Link href='/estimate'><li>견적문의</li></Link>
          </ul>)}
      </nav>
      {isMobile && menuOpen &&
        (<div className={styles.mobileList}>
          <Link href='/example'><li>시공사례</li></Link>
          <Link href='/estimate'><li>견적문의</li></Link>
        </div>)
      }
    </header>
  );
};

export default Header;
