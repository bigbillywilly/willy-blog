import { useEffect, useState } from "react";

export default function PhotoSlideshow({ images, alt, imageStyle = {}, wrapperStyle = {} }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];
  const hasMultiple = images.length > 1;

  function goPrevious() {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  }

  function goNext() {
    setCurrentIndex((currentIndex + 1) % images.length);
  }

  return (
    <div style={{ position: "relative", flexShrink: 0, ...wrapperStyle }}>
      <img
        src={currentImage}
        alt={`${alt} ${currentIndex + 1}`}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "5px",
          display: "block",
          ...imageStyle,
        }}
      />

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={goPrevious}
            aria-label="Previous photo"
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.55)",
              color: "white",
              border: "none",
              borderRadius: "999px",
              width: "32px",
              height: "32px",
              cursor: "pointer",
            }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.55)",
              color: "white",
              border: "none",
              borderRadius: "999px",
              width: "32px",
              height: "32px",
              cursor: "pointer",
            }}
          >
            ›
          </button>
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0, 0, 0, 0.55)",
              color: "white",
              padding: "2px 8px",
              borderRadius: "999px",
              fontSize: "12px",
            }}
          >
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}