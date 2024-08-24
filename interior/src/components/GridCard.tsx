'use client';

import React, { useState } from 'react';
import Link from 'next/link'
import styles from '@/styles/GridCard.module.css';
import Image from 'next/image'

// 각 카드의 데이터를 나타내는 인터페이스 정의
interface CardData {
  id: number;
  src: string;
  alt: string;
  description: string;
  title: string;
}

// 이 데이터를 props로 전달할 때 사용할 인터페이스 정의
interface Props {
  cards: CardData[]; // cards는 CardData 배열 타입
}

const GridCard: React.FC<Props> = ({ cards }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  const showImageHeadline = (id: number) => {
    setHoveredItemId(id); // 마우스 오버 시 ID를 설정
  };

  const hideImageHeadline = () => {
    setHoveredItemId(null); // 마우스 아웃 시 null로 설정
  };
  return (
    <>
      <div className={styles.container}>
        {
          cards.map((item) => (
            <Link href={`/post/${item.id}`} key={item.id} className={styles.linkTag} >
              <div
                key={item.id}
                className={styles.card}
                onMouseOver={() => showImageHeadline(item.id as number)}
                onMouseOut={hideImageHeadline}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                />
                {hoveredItemId === item.id && (
                  <div className={styles.imageHeadline}>
                    {item.title}
                  </div>
                )}
              </div>
            </Link>
          ))
        }
      </div >
    </>
  );
};

export default GridCard;
