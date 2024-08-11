import Link from 'next/link';
import styles from '../styles/Header.module.css';
const Header: React.FC = () => {
 
  return (
    <header className={styles.header}>
    <nav className={styles.nav}>
      <ul>
        <Link href='/'>
          <li className={styles.brandName}>
            <div className={styles.brandName_div}>
              <img src="/images/brandLogo.png" />
              <h1 >집돌이즘</h1>
            </div>
          </li>
        </Link>
      </ul>
      <ul>
        <Link href='/example'><li>시공사례</li></Link>
        <Link href='/estimate'><li>견적문의</li></Link>
      </ul>
    </nav>
  </header>
  );
};

export default Header;
