"use client";
import Image from "next/image";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import styles from "./slideShow.module.css";
import { useEffect, useState } from "react";

const invervalTimeMaster = 4000; // Milliseconds
const transitionTimeMaster = 1000; // Milliseconds

export default function SlideShow({ slides }) {
  const [index, setIndex] = useState(1);
  const [transitionTime, setTrasitionTime] = useState(transitionTimeMaster);
  const [skipTo, setSkipTo] = useState("");

  // adding IDs to each of the inputs starting from 1
  let imagesUpdated = slides.map((item) => {
    return {
      ...item,
      id: slides.findIndex((element) => element === item) + 1,
    };
  });

  //adding the last side to the start of the array with ID of 0
  imagesUpdated.unshift({ ...slides[slides.length - 1], id: 0 });

  //adding the first slide to the end of the array with the id of total length
  imagesUpdated.push({
    ...slides[0],
    id: imagesUpdated.length,
  });

  //EXAMPLE input four slides labled 1, 2, 3, 4. Array would now look like 4, 1, 2, 3, 4, 1

  //Displays the next slide at the set inveralTime
  useEffect(() => {
    const interval = setInterval(() => handleRightButton(), invervalTimeMaster);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  // When the slides are ready to be looped will triger useEffect that
  // will set the trasition time to 0 and move the slide to the correct position

  useEffect(() => {
    const timer = setTimeout(() => {
      if (skipTo === "start") {
        setTrasitionTime(0);
        setIndex(1);
      }
      if (skipTo === "end") {
        setTrasitionTime(0);
        setIndex(4);
      }
    }, transitionTimeMaster);
    return () => clearTimeout(timer);
  }, [skipTo]);

  // function for moving slides to the right
  function handleRightButton() {
    setIndex((prev) => {
      if (prev >= 4) {
        setSkipTo("start");

        return 5;
      } else {
        setSkipTo("");
        setTrasitionTime(transitionTimeMaster);
        return prev + 1;
      }
    });
  }

  // function for moving slides to the left

  function handleLeftButton() {
    setIndex((prev) => {
      if (prev <= 1) {
        setSkipTo("end");

        return 0;
      } else {
        setSkipTo("");
        setTrasitionTime(transitionTimeMaster);
        return prev - 1;
      }
    });
  }

  const imageElements = imagesUpdated.map((slide) => {
    const postion = slide.id;

    return (
      <div
        key={slide.id}
        className={styles.slideContainer}
        style={{
          left: `${postion - index}00%`,
          transition: `${transitionTime / 1000}s`,
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