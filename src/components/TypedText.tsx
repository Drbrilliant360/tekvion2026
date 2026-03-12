import { useState, useEffect } from "react";

interface TypedTextProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  className?: string;
}

const TypedText = ({
  strings,
  typeSpeed = 60,
  backSpeed = 30,
  backDelay = 2000,
  className = "",
}: TypedTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[stringIndex];

    if (!isDeleting && charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, typeSpeed);
      return () => clearTimeout(t);
    }

    if (!isDeleting && charIndex === current.length) {
      const t = setTimeout(() => setIsDeleting(true), backDelay);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, backSpeed);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setStringIndex((i) => (i + 1) % strings.length);
    }
  }, [charIndex, isDeleting, stringIndex, strings, typeSpeed, backSpeed, backDelay]);

  return (
    <span className={`${className} notranslate`} translate="no">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypedText;
