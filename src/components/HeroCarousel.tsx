import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  'https://i.ibb.co/RGwLgSFs/hero.jpg',
  'https://i.ibb.co/HpYQPq36/hero2.png',
  'https://i.ibb.co/TxcJZWn7/hero3.png',
  'https://i.ibb.co/LdVzfGyF/hero4.webp',
  'https://i.ibb.co/mVRBNn6X/hero5.webp',
  'https://i.ibb.co/q3ymsg27/hero6.webp',
  'https://i.ibb.co/DgmYrj3m/hero7.webp',
  'https://i.ibb.co/fdgLKM8w/hero8.webp',
  'https://i.ibb.co/9HXyVK6k/hero9.webp'
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  return (
    <div className="aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden relative shadow-2xl z-10 bg-stone-200 group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
          alt={`Слайд ${currentIndex + 1}`}
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>

      {/* Gradient Overlay for better dot/arrow visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-[5]"></div>

      {/* Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-white/50 z-10"
        onClick={() => paginate(-1)}
        aria-label="Предыдущее фото"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-white/50 z-10"
        onClick={() => paginate(1)}
        aria-label="Следующее фото"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80 w-2'
            }`}
            aria-label={`Перейти к фото ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
