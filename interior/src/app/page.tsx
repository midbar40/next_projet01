import Image from "next/image";
import styles from "../styles/page.module.css";
import { Header, Footer, MainSlide, GridCard, EstimateForm, ConsultProcess, StrongPoint } from "@/components/index";
import { ReadMoreBtn } from '@/components/ReadMoreBtn'
import images from '../data/mainImageData.json'
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.mainTag}>
        <section className={styles.section_first}>
          <MainSlide />
        </section>
        <section className={styles.strongPoint}>
         <StrongPoint />
        </section>
        <section className={styles.gridCard}>
          <GridCard cards={images}/>
          <Link href='/example'><ReadMoreBtn /></Link>
        </section>
        <section className={styles.process}>
          <ConsultProcess />
        </section>
        <section className={styles.estimate}>
          <EstimateForm />
        </section>
      </main>
      <footer className={styles.footerSection}>
        <Footer />
      </footer>
    </div>
  );
}
