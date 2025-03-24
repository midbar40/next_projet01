
import { Header, Footer } from "@/components/index";
import exampleImageData from '@/data/exampleImageData.json'
import styles from '@/app/post/[id]/page.module.css'
import Image from "next/image"

const PostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const post = exampleImageData.find((item) => item.id === parseInt(id));
  if (!post) {
    return (
      <div>
        <h1>Post not found</h1>
        <p>No post found with ID: {id}</p>
      </div>
    )
  } else {
    return (
      <>
        <Header />
        <div className={styles.postDiv} key={post.id}>
          <div className={styles.postTitle}>
            <h1>{post.title}</h1>
          </div>
          <div className={styles.paraImg}>
            <h2>{post.description}</h2>
            <Image
              src={post.src}
              alt={post.alt}
              width={850}
              height={600}
            />
          </div>
          <div className={styles.paraText}>
            <p>{post.description}</p>
          </div>

          <div className={styles.paraImg}>
            <Image
              src={post.src_01}
              alt={post.alt_01}
              width={850}
              height={600}
            />
          </div>
          <div className={styles.paraText}>
            <p>{post.description_01}</p>
          </div>
          <div className={styles.paraImg}>
            <Image
              src={post.src_02}
              alt={post.alt_02}
              width={850}
              height={600}
            />
          </div>
          <div className={styles.paraText}>
            <p>{post.description_02}</p>
          </div>
          <div className={styles.paraImg}>
            <Image
              src={post.src_03}
              alt={post.alt_03}
              width={850}
              height={600}
            />
          </div>
          <div className={styles.paraText}>
            <p>{post.description_03}</p>
          </div>
        </div >
        <div className={styles.tagBox}>
          <span>#태그1</span>
          <span>#태그2</span>
          <span>#태그3</span>
          <span>#태그4</span>
          <span>#태그5</span>
        </div>
        <Footer />
      </>
    )
  };
};

export default PostPage;