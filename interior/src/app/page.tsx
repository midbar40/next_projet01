import Image from "next/image";
import styles from "../styles/page.module.css";
import Link from 'next/link';
import Carousel from "@/components/Carousel ";

export default function Home() {

  return (
    <div className={styles.main}>
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
      <main className={styles.mainTag}>
        <section className={styles.section_first}>
          <div className={styles.background_img}>
            <img src="/images/main_section1.jpg" />
            <div className={styles.mainText}>
              <p>집에 가고 싶다...</p>
              <p>모두가 집돌이가 되는 그 곳</p>
              <p>엄마 00이네 집 너무 좋아</p>
              <p># 대전 많은 집들의 시공사례를 확인해보세요</p>
            </div>
          </div>
        </section>
        <section className={styles.carousel}>
          <Carousel />
        </section>
        <section className={styles.process}>
          <div className={styles.prodcess_cards}>
            <div className={styles.card}>문의하기</div>
            <div className={styles.card}>1:1상담</div>
            <div className={styles.card}>현장실측</div>
            <div className={styles.card}>컨셉확인</div>
            <div className={styles.card}>견적확인</div>
            <div className={styles.card}>계약진행</div>
            <div className={styles.card}>공사진행</div>
            <div className={styles.card}>사후점검</div>
          </div>
        </section>
        <section className={styles.estimate}>
          <div className={styles.estimate_container}>
            <div></div>
            <div>
              <form action="">
                <div>
                  <label htmlFor="region">지역</label>
                  <select name="region" id="region">
                    <option value="yuseounggu">유성구</option>
                    <option value="seogu">서구</option>
                    <option value="donggu">동구</option>
                    <option value="joonggu">중구</option>
                    <option value="daeduckgu">대덕구</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footerTag}>
        <div>
          {/* '집도리즘' 집돌'IS 집돌IS 도 좋은듯 */}
          <span>집돌이즘</span>
          <span>집돌이</span>
          <span>123-45-78945</span>
          <span className={styles.lastSpan}>대전광역시 유성구 원신흥로 000 000호(000동 00, 000오피스텔)</span>
          <div>
            <p>©2024 집돌이즘 ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
