import React, { useEffect, useRef, useState } from "react";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";
import "./App.css";
import ImageData from "./Image";

function Slider(props) {
  const targetRef = useRef();
  const posRef = useRef();
  const btnRigtRef = useRef();
  const btnLeftRef = useRef();
  const [count, setCount] = useState(0);
  const [transformImg, setTransformImg] = useState({
    transform: "translate3d(0px, 0px, 0px)",
  });
  const [widthImg, setWidthImg] = useState(1);
  const posStart = useRef(null);
  const [posRes, setPosRes] = useState(0);
  const [posFinal, setPosFinal] = useState(0);

  let resizeWidth = () => {
    setWidthImg(targetRef.current.offsetWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeWidth);
    return () => window.removeEventListener("resize", resizeWidth);
  });

  useEffect(() => {
    setTransformImg({
      transform: `translate3d(-${count * widthImg}px, 0px, 0px)`,
    });
  }, [count, widthImg]);

  useEffect(() => {
    resizeWidth();
  });

  function btnPrev() {
    setCount((prevCount) => {
      return (prevCount + ImageData.length - 1) % ImageData.length;
    });
  }

  function btnNext() {
    setCount((prevCount) => {
      return (prevCount + 1) % ImageData.length;
    });
  }
  const widthSlide = { width: `${widthImg}px` };
  const widthSlider = { width: `${widthImg * ImageData.length}px` };

  function handleTouchStart(event) {
    let even = event.changedTouches[0];
    posStart.current = even.clientX;
  }

  function handleTouchMove(event) {
    if (!posStart) {
      return;
    }
    const posFinish = event.touches[0].clientX;
    setPosRes(posStart.current - posFinish);
  }

  function handleTouchEnd(event) {
    setPosFinal(posRes);
  }

  useEffect(() => {
    if (posFinal > 100) btnNext();
    else if (posFinal < -100) btnPrev();
    else
      setTransformImg({
        transform: `translate3d(-${count * widthImg}px, 0px, 0px)`,
      });
  }, [posFinal]);

  useEffect(() => {
    setTransformImg({
      transform: `translate3d(-${count * widthImg + posRes}px, 0px, 0px)`,
    });
  }, [posRes]);

  const flag = props.data[0].interval;
  useEffect(() => {
    if (flag) {
      setInterval(btnNext, 3000);
    }
  }, []);
  useEffect(() => {
    const slider = posRef.current;
    slider.addEventListener("touchstart", handleTouchStart, false);
    slider.addEventListener("touchmove", handleTouchMove, false);
    slider.addEventListener("mousehmove", handleTouchMove, false);
    slider.addEventListener("touchend", handleTouchEnd, false);
    slider.addEventListener("mouseup", handleTouchEnd, false);
    btnRigtRef.current.addEventListener("click", btnNext, false);
    btnLeftRef.current.addEventListener("click", btnPrev, false);
    return () => {
      slider.removeEventListener("touchstart", handleTouchStart, false);
      slider.removeEventListener("touchmove", handleTouchMove, false);
      slider.removeEventListener("mousehmove", handleTouchMove, false);
      slider.removeEventListener("touchend", handleTouchEnd, false);
      slider.removeEventListener("mouseup", handleTouchEnd, false);
      btnRigtRef.current.removeEventListener("click", btnNext, false);
      btnLeftRef.current.removeEventListener("click", btnPrev, false);
    };
  });
  return (
    <div>
      <div className="slider" ref={posRef}>
        <div className="wraper-slider" ref={targetRef}>
          <div
            className="slide-img"
            style={{ ...transformImg, ...widthSlider }}
          >
            {ImageData.map((el, id) => (
              <img
                className="slide"
                src={el}
                key={id}
                style={widthSlide}
                alt="img"
              />
            ))}
          </div>
        </div>
        <div className="btn-wraper">
          <img
            className="btn btn-left"
            src="./btn-left.png"
            ref={btnLeftRef}
            alt="btn-left"
          />
          <img
            className="btn btn-rigth"
            src="./btn-right.png"
            ref={btnRigtRef}
            alt="btn-rigth"
          />
        </div>
      </div>
    </div>
  );
}

export default Slider;
