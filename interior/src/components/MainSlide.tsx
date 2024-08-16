import styles from '@/styles/MainSlide.module.css';
const MainSlide: React.FC = () => {
    return (
        <div className={styles.background_img}>
            <img src="/images/main_section5.jpg" />
            <div className={styles.mainText}>
                <p>집에 가고 싶다...</p>
                <p>모두가 집돌이가 되는 그 곳</p>
                <p>엄마 00이네 집 너무 좋아</p>
                <p># 대전 많은 집들의 시공사례를 확인해보세요</p>
            </div>
        </div>
    );
};

export default MainSlide;
