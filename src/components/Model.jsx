import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import ModelView from "./ModelView";

import { models, sizes } from "../constants";
import { yellowImg } from "../utils";
//import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8f8a81", "#ffe789", "#6f6c64"],
    img: yellowImg,
  });

  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const viewSmall = useRef();
  const viewLarge = useRef();

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSize("small");
      } else {
        setSize("large");
      }
    };

    handleResize(); // Set size on initial load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleColorChange = (item) => {
    setModel(item);
    gsap.to([viewSmall.current, viewLarge.current], {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.to([viewSmall.current, viewLarge.current], {
          opacity: 1,
          duration: 0.3,
        });
      },
    });
  };

  /*const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);*/

  const handleSizeChange = (value) => {
    setSize(value);
    if (value === "large") {
      gsap.to(viewSmall.current, { opacity: 0, duration: 0.3 });
      gsap.to(viewLarge.current, { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(viewLarge.current, { opacity: 0, duration: 0.3 });
      gsap.to(viewSmall.current, { opacity: 1, duration: 0.3 });
    }
  };

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a Closer Look
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <div
              ref={viewSmall}
              className="absolute top-0 left-0 w-full h-full"
            >
              <Canvas eventSource={viewSmall} className="w-full h-full">
                <View track={viewSmall}>
                  <ModelView
                    index={1}
                    groupRef={small}
                    gsapType="view1"
                    controlRef={cameraControlSmall}
                    setRotationState={setSmallRotation}
                    item={model}
                    size="small"
                  />
                </View>
              </Canvas>
            </div>

            <div
              ref={viewLarge}
              className="absolute top-0 left-0 w-full h-full opacity-0"
            >
              <Canvas eventSource={viewLarge} className="w-full h-full">
                <View track={viewLarge}>
                  <ModelView
                    index={2}
                    groupRef={large}
                    gsapType="view2"
                    controlRef={cameraControlLarge}
                    setRotationState={setLargeRotation}
                    item={model}
                    size="large"
                  />
                </View>
              </Canvas>
            </div>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => handleColorChange(item)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => handleSizeChange(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
