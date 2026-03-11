import { motion } from 'motion/react';
import { Sparkles, ZoomIn, Fingerprint, Battery } from 'lucide-react';
import InteractiveQuiz from './InteractiveQuiz';
import HeroCarousel from './HeroCarousel';

export default function Home({ onBuy }: { onBuy: () => void }) {
  const features = [
    {
      icon: Sparkles,
      title: 'Три режима освещения',
      desc: 'Холодный, теплый и нейтральный свет для любых условий и задач.'
    },
    {
      icon: ZoomIn,
      title: 'Увеличение 5х',
      desc: 'Магнитное увеличительное зеркало для ювелирно точной работы.'
    },
    {
      icon: Fingerprint,
      title: 'Сенсорное управление',
      desc: 'Регулировка яркости в одно касание и умная функция памяти.'
    },
    {
      icon: Battery,
      title: 'До 70 часов работы',
      desc: 'Мощный аккумулятор позволяет забыть о проводах на несколько недель.'
    }
  ];

  return (
    <div className="min-h-screen bg-powder font-sans text-stone-800 overflow-x-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 p-4 sm:p-6 md:px-12 flex justify-between items-center z-10">
        <div className="font-serif text-xl sm:text-2xl font-semibold tracking-tight">
          Бьюти<span className="text-gold italic font-normal">Миррор</span>
        </div>
        <button 
          onClick={onBuy} 
          className="text-xs sm:text-sm font-medium uppercase tracking-widest hover:text-gold transition-colors"
        >
          Заказать
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl z-10"
          >
            <span className="inline-block py-1.5 px-3 sm:px-4 rounded-full bg-stone-200/60 text-stone-700 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-6">
              Новинка сезона
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-4 sm:mb-6 text-stone-900 break-words">
              Профессиональный результат <br className="hidden sm:block" />
              <span className="italic text-stone-500 font-light">без салона</span>
            </h1>
            <p className="text-base sm:text-lg text-stone-600 mb-8 sm:mb-10 max-w-md leading-relaxed">
              Идеальный макияж каждый день дома. Умное зеркало с подсветкой, созданное для современных женщин.
            </p>
            <button 
              onClick={onBuy}
              className="w-full sm:w-auto bg-stone-900 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-stone-800 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              Купить сейчас
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mt-8 md:mt-0"
          >
            {/* Image Carousel */}
            <HeroCarousel />
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-gold/20 rounded-full blur-3xl z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-40 sm:w-56 h-40 sm:h-56 bg-rose-200/50 rounded-full blur-3xl z-0"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-stone-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-3 sm:mb-4 text-stone-900">Продумано до мелочей</h2>
            <p className="text-stone-500 text-base sm:text-lg">Технологии, которые заботятся о вашей красоте.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow border border-stone-100"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-powder rounded-2xl flex items-center justify-center text-gold mb-5 sm:mb-6">
                    <Icon size={24} className="sm:w-7 sm:h-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 text-stone-900">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-stone-500 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Quiz Section */}
      <InteractiveQuiz />

      {/* Footer CTA */}
      <section className="py-16 sm:py-24 bg-stone-900 text-white text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">Готовы сиять?</h2>
          <p className="text-stone-400 mb-8 sm:mb-10 text-base sm:text-lg md:text-xl font-light">
            Закажите Бьюти Миррор сегодня и преобразите свою ежедневную рутину ухода за собой.
          </p>
          <button 
            onClick={onBuy}
            className="w-full sm:w-auto bg-white text-stone-900 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-stone-100 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1"
          >
            Оформить заказ
          </button>
        </div>
        <div className="mt-16 sm:mt-20 text-stone-600 text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Бьюти Миррор. Учебный проект.
        </div>
      </section>
    </div>
  );
}
