import { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Camera } from 'lucide-react';

const modes = [
  {
    id: 'work',
    name: 'Офис / Работа',
    icon: Sun,
    glow: '0 0 40px 10px rgba(200, 220, 255, 0.6)',
    desc: 'Холодный белый свет. Идеален для нанесения строгого дневного макияжа, чтобы избежать "эффекта маски" при офисном освещении.'
  },
  {
    id: 'date',
    name: 'Свидание / Вечер',
    icon: Moon,
    glow: '0 0 50px 15px rgba(255, 180, 100, 0.5)',
    desc: 'Мягкий теплый свет. Поможет создать романтичный образ, который будет идеально смотреться при приглушенном свете ресторана.'
  },
  {
    id: 'photo',
    name: 'Селфи / Фото',
    icon: Camera,
    glow: '0 0 60px 20px rgba(255, 255, 255, 0.8)',
    desc: 'Нейтральный яркий свет. Убирает все тени с лица, делая кожу идеальной для фотографий и видео.'
  }
];

export default function InteractiveQuiz() {
  const [activeMode, setActiveMode] = useState(modes[0]);

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-3 sm:mb-4">
            Подбери свой идеальный свет
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-base sm:text-lg">
            Интерактивный тест: выбери ситуацию, а умное зеркало подстроит освещение для безупречного результата.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 sm:gap-12 lg:gap-24">
          {/* Mirror Visualizer */}
          <div 
            className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-stone-100 border-8 border-stone-200 flex items-center justify-center transition-all duration-700 ease-in-out shrink-0"
            style={{ boxShadow: activeMode.glow }}
          >
            <div className="absolute inset-0 rounded-full border border-white/50 m-2"></div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-md">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode.id === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode)}
                  className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 text-left ${
                    isActive 
                      ? 'bg-powder border-gold/30 border shadow-sm' 
                      : 'bg-stone-50 border-transparent border hover:bg-stone-100'
                  }`}
                >
                  <div className={`p-2.5 sm:p-3 rounded-full shrink-0 transition-colors ${isActive ? 'bg-white text-gold shadow-sm' : 'bg-stone-200 text-stone-500'}`}>
                    <Icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className={`font-medium text-base sm:text-lg mb-1 transition-colors ${isActive ? 'text-stone-900' : 'text-stone-600'}`}>
                      {mode.name}
                    </h3>
                    {isActive && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs sm:text-sm text-stone-500 leading-relaxed"
                      >
                        {mode.desc}
                      </motion.p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
