
import { Header, Footer } from "@/components/index";
import exampleImageData from '@/data/exampleImageData.json'
import styles from '@/app/post/[id]/page.module.css'

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
            <img src={post.src} alt={post.alt} />
          </div>
          <div className={styles.paraText}>
            <p>{post.description}</p>
          </div>

          <div className={styles.paraImg}>
            <img src={post.src_01} alt={post.alt_01} />
          </div>
          <div className={styles.paraText}>
            <p>{post.description_01}</p>
          </div>
          <div className={styles.paraImg}>
            <img src={post.src_02} alt={post.alt_02} />
          </div>
          <div className={styles.paraText}>
            <p>{post.description_02}</p>
          </div>
          <div className={styles.paraImg}>
            <img src={post.src_03} alt={post.alt_03} />
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