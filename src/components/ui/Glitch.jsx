import React, { useState } from "react";
import { motion } from "framer-motion";

const GlitchText = ({ text }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const flickerLetters = (char) => {
    return char;
  };

  return (
    <div className="flex font-bold text-blue cursor-pointer">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{ y: hoveredIndex === index ? -10 : 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="transition duration-10 ease-in-out"
        >
          {flickerLetters(char, index)}
        </motion.span>
      ))}
    </div>
  );
};

export default GlitchText;
