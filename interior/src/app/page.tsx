import Image from "next/image";
import styles from "../styles/page.module.css";
import { Header, Footer, MainSlide, Carousel, EstimateForm, ConsultProcess } from "@/components/index";

export default function Home() {
  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.mainTag}>
        <section className={styles.section_first}>
          <MainSlide />
        </section>
        <section className={styles.carousel}>
          <Carousel />
        </section>
        <section className={styles.process}>
          <ConsultProcess />
        </section>
        <section className={styles.estimate}>
          <EstimateForm />
        </section>
      </main>
      <footer className={styles.footerTag}>
        <Footer />
      </footer>
    </div>
  );
}
