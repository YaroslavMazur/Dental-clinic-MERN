import React, { useState } from "react";
import "./FAQ.css";

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
        
      {data.map((item, index) => (
        <div
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
          key={index}
          onClick={() => toggleAccordion(index)}
        >
          <div className="faq-head">
            <h2 className={'faq-question'}>{item.question}</h2>

            {activeIndex !== index ? (<span>+</span>):
            (<span>-</span>)}
          </div>

          {activeIndex === index && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
