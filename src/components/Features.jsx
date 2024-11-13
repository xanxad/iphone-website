import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  useGSAP(() => {
    gsap.to("#features_title", {
      y: 0,
      opacity: 1,
      ScrollTrigger: {
        trigger: "#features_title",
        toggleActions: "restart reverse restart reverse",
        start: "top 85%",
      },
    });
  }, []);
  return (
    <div className="h-full common-padding relative overflow-hidden bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Explore the Full Story
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Features;
