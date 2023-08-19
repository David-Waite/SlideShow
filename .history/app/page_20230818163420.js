import Image from "next/image";
import styles from "./page.module.css";
import SlideShow from "./components/SlideShow/SlideShow";

export default function Home() {
  return (
    <main className={styles.main}>
      <SlideShow />
    </main>
  );
}
