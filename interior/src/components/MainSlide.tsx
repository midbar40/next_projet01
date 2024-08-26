'use client'
import { useEffect, useState, useCallback, useRef } from 'react';
import styles from '@/styles/MainSlide.module.css';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Image from 'next/image'

interface SlideProps {
    src: string;
    text: string[];
}

const slides = [
    {
        id: 1,
        src: '/images/main_section5.jpg',
        text: ['집에 가고 싶다...', '모두가 집돌이가 되는 그 곳', '엄마 00이네 집 너무 좋아', '# 대전 많은 집들의 시공사례를 확인해보세요'],
    },
    {
        id: 2,
        src: '/images/main_section1.jpg',
        text: ['2번 슬라이드', '넥슬라이스', '좋은 집이란 무엇일까', '# 내 집이 생겼으면 좋겠다'],
    },
    {
        id: 3,
        src: '/images/main_section3.jpg',
        text: ['3번 슬라이드', '넥슬라이스', '좋은 집이란 무엇일까', '# 내 집이 생겼으면 좋겠다'],
    },
];

// 복제된 슬라이드 배열
const cloneSlides = [slides[slides.length - 1], ...slides, slides[0]];

export const Slide: React.FC<SlideProps> = ({ src, text }) => {
    return (
        <div className={styles.slider}>
            <Image src={src} alt="slide" />
            <div className={styles.mainText}>
                {text.map((item, index) => (<p key={index}>{item}</p>))}
            </div>
        </div>
    );
}

const MainSlide: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(1); // 중간 슬라이드로 시작
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showSliderIcon, setshowSliderIcon] = useState(false);
    const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);
    const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const startAutoPlay = useCallback(() => {
        if (autoPlayIntervalRef.current) return; // 이미 인터벌이 설정된 경우 중복 실행 방지
        autoPlayIntervalRef.current = setInterval(() => {
            handleSlideNext();
        }, 5000); // 5초 간격으로 슬라이드 전환
        console.log("Start AutoPlay");
    }, []);

    const stopAutoPlay = useCallback(() => {
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
            autoPlayIntervalRef.current = null;
            console.log("Stop AutoPlay");
        }
    }, []);

    // 슬라이드 자동 재생
    useEffect(() => {
        const handleTapActive = () => {
            if (document.visibilityState === 'visible') {
                startAutoPlay(); // 탭이 활성화되면 자동 재생 시작
            } else {
                stopAutoPlay(); // 탭이 비활성화되면 자동 재생 정지
            }
        };

        // 처음 마운트될 때 자동 재생 시작
        startAutoPlay();

        // 탭의 가시성 변화 감지 이벤트 등록
        document.addEventListener('visibilitychange', handleTapActive);

        // 컴포넌트 언마운트 시 이벤트 제거 및 자동 재생 중지
        return () => {
            stopAutoPlay();
            document.removeEventListener('visibilitychange', handleTapActive);
        };
    }, [startAutoPlay, stopAutoPlay]); // startAutoPlay와 stopAutoPlay를 의존성 배열에 추가



    const handleSlideNext = () => {
        setIsTransitioning(true);
        setCurrentSlide((prevSlide) => {
            if (prevSlide === cloneSlides.length - 2) { // 마지막 복제 슬라이드
                setTimeout(() => {
                    setIsTransitioning(false);
                    setCurrentSlide(1); // 첫 번째 슬라이드로 점프
                }, 500); // 트랜지션 시간이 지나고 나서
                return prevSlide + 1;
            }
            return prevSlide + 1;
        });
    };

    const handleSlidePrev = () => {
        setIsTransitioning(true);
        setCurrentSlide((prevSlide) => {
            if (prevSlide === 1) { // 첫 번째 복제 슬라이드
                setTimeout(() => {
                    setIsTransitioning(false);
                    setCurrentSlide(cloneSlides.length - 2); // 마지막 슬라이드로 점프
                }, 1000); // 트랜지션 시간이 지나고 나서
                return prevSlide - 1;
            }

            return prevSlide - 1;
        });
    };

    const showBtnAndStop = (e: React.MouseEvent<HTMLOrSVGElement>) => {
        stopAutoPlay()
        setshowSliderIcon(true)
        console.log("Mouse Over: Stop AutoPlay and Show Buttons");

    }
    const hideBtnAndPlay = (e: React.MouseEvent<HTMLOrSVGElement>) => {
        startAutoPlay()
        setshowSliderIcon(false)
        console.log("Mouse Out: Start AutoPlay and Hide Buttons");

    }

    return (
        <div className={styles.slideContainer} onMouseEnter={showBtnAndStop} onMouseLeave={hideBtnAndPlay}>
            <div
                className={styles.slides}
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none', // 트랜지션 조건부 적용
                }}
            >
                {cloneSlides.map((item, index) => (
                    <Slide
                        key={index}
                        text={item.text}
                        src={item.src}
                    />
                ))}
            </div>
            <div className={styles.sliderLeftBtn}>
                {showSliderIcon && <ChevronLeftRoundedIcon className={styles.arrowIcon} onClick={handleSlidePrev} />}
            </div>
            <div className={styles.sliderRightBtn}>
                {showSliderIcon && <ChevronRightRoundedIcon className={styles.arrowIcon} onClick={handleSlideNext} />}
            </div>
            <div className={styles.dotBox}>
            {slides.map((_, index) => (
                    <div
                        className={`${styles.dot} ${currentSlide === index + 1 ? styles.dot_active : ''}`}
                        key={index}
                        onClick={() => setCurrentSlide(index + 1)}
                    ></div>
                ))}
            </div>

        </div>
    );
};

export default MainSlide;
