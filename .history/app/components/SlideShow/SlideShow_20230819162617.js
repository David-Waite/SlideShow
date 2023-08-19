"use client";
import Image from "next/image";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import styles from "./slideShow.module.css";
import { useEffect, useState } from "react";

export default function SlideShow({ slides }) {
  let imagesUpdated = slides.map((item) => {
    return {
      ...item,
      id: slides.findIndex((element) => element === item) + 1,
    };
  });

  imagesUpdated.unshift({ ...slides[slides.length - 1], id: 0 });
  imagesUpdated.push({
    ...slides[0],
    id: imagesUpdated.length,
  });

  const invervalTimeMaster = 2000;
  const transitionTimeMaster = 1;
  const [index, setIndex] = useState(1);
  const [transitionTime, setTrasitionTime] = useState(transitionTimeMaster);
  const [intervalTime, setIntervalTime] = useState(invervalTimeMaster);
  const [lastPressLeft, setLastPressLeft] = useState(false);

  // useEffect(() => {
  //   () => {
  //     clearInterval(interval);
  //   };

  //   const interval = setInterval(
  //     () =>
  //       setIndex((prev) => {
  //         if (lastPressLeft) {
  //           console.log(prev);
  //           if (prev === imagesUpdated.length - 2) {
  //             setLastPressLeft(false);
  //             return 5;
  //           }
  //         }

  //         if (prev == imagesUpdated.length - 1) {
  //           setTrasitionTime(0);
  //           setIntervalTime(0);
  //           return 1;
  //         }
  //         console.log("teet");
  //         setTrasitionTime(transitionTimeMaster);
  //         setIntervalTime(invervalTimeMaster);
  //         return prev + 1;
  //       }),
  //     intervalTime
  //   );

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [imagesUpdated.length, index, intervalTime, lastPressLeft]);

  function handleRightButton() {
    setIndex((prev) => {
      if (prev === imagesUpdated.length - 1) {
        setTrasitionTime(0);
        restart();
        return 2;
      }
      setTrasitionTime(transitionTimeMaster);
      return prev + 1;
    });
  }

  function restart() {
    setIndex(1);
  }

  function handleLeftButton() {}

  const imageElements = imagesUpdated.map((slide) => {
    const postion = slide.id;

    return (
      <div
        key={slide.id}
        className={styles.slideContainer}
        style={{
          left: `${postion - index}00%`,
          transition: `${transitionTime}s`,
        }}
      >
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            {slide.title}
            {slide.id}
          </h1>
          <h2 className={styles.author}>{slide.from}</h2>
        </div>
        <div className={styles}></div>
        <div className={styles.imageContainer}>
          <Image
            src={slide.image}
            fill={true}
            objectFit="cover"
            alt="slideshow"
          />
        </div>
      </div>
    );
  });

  const selectElements = slides.map((image) => {
    const postion = slides.findIndex((element) => element === image) + 1;

    return (
      <div
        className={styles.selectElement}
        key={image}
        onClick={() => setIndex(postion)}
        style={{
          backgroundColor:
            postion === index
              ? "white"
              : index === imagesUpdated.length - 1 && postion === 1
              ? "white"
              : index === 0 && postion === 4
              ? "white"
              : "grey",
        }}
      ></div>
    );
  });
  return (
    <div className={styles.slideShowContainer}>
      <div className={styles.rightBtn} onClick={handleRightButton}>
        <SlArrowRight />
      </div>
      <div className={styles.leftBtn} onClick={handleLeftButton}>
        <SlArrowLeft />
      </div>
      <div className={styles.selectContainer}>{selectElements}</div>
      <div className={styles.dimmer}></div>
      {imageElements}
    </div>
  );
}
