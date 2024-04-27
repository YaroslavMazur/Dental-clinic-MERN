import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const TypeWriter = ({dynamicTexts, className}) => {
  const textRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    dynamicTexts.forEach((text) => {
      tl.to(textRef.current, { duration: 2, text: "" })
        .to(textRef.current, { duration: text.length * 0.2, text: text, ease: "ease" });
    });
  }, [dynamicTexts]);

  return <p className={className} ref={textRef} />;
};

export default TypeWriter;