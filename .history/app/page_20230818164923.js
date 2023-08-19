import Image from "next/image";
import styles from "./page.module.css";
import SlideShow from "./components/SlideShow/SlideShow";

export default function Home() {
  const slides = [
    {
      image: "/slideshowImage1.jpg",
      title: "Sean Sinclair",
      from: "Source: unsplash",
      price: 12,
      productId: 1,
    },
    {
      image: "/slideshowImage2.jpg",
      title: "Pawel Czerwinski",
      from: "Source: unsplash",
    },
    {
      image: "/slideshowImage3.jpg",
      title: "Alex Perez",
      from: "Source: unsplash",
    },
    {
      image: "/slideshowImage4.jpg",
      title: "Jr Korpa",
      from: "Source: unsplash",
    },
  ];
  return (
    <main className={styles.main}>
      <SlideShow slides={slides} />
    </main>
  );
}
