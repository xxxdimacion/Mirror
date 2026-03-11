import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CreditCard, Smartphone, Trophy, CheckCircle2 } from 'lucide-react';
import DinoGame from './DinoGame';

export default function Checkout({ onBack }: { onBack: () => void }) {
  const [paymentMethod, setPaymentMethod] = useState<'sbp' | 'card'>('sbp');
  const [showGame, setShowGame] = useState(false);
  const [discountWon, setDiscountWon] = useState(false);

  const originalPrice = 14900;
  const discountedPrice = 11700;
  const finalPrice = discountWon ? discountedPrice : originalPrice;

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Вернуться назад
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Form & Payment */}
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-stone-100"
            >
              <h2 className="text-2xl font-serif text-stone-900 mb-6">Оформление заказа</h2>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Имя и фамилия</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all" placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Телефон</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all" placeholder="+7 (999) 000-00-00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Адрес доставки</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all" placeholder="г. Москва, ул. Пушкина..." />
                </div>
              </div>

              {/* Payment Methods */}
              <h3 className="text-lg font-medium text-stone-900 mb-4">Способ оплаты</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setPaymentMethod('sbp')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === 'sbp' 
                      ? 'border-stone-900 bg-stone-50' 
                      : 'border-stone-100 hover:border-stone-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${paymentMethod === 'sbp' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500'}`}>
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-stone-900">СБП</div>
                    <div className="text-xs text-stone-500">Быстро и без комиссии</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === 'card' 
                      ? 'border-stone-900 bg-stone-50' 
                      : 'border-stone-100 hover:border-stone-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${paymentMethod === 'card' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500'}`}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-stone-900">Картой онлайн</div>
                    <div className="text-xs text-stone-500">Visa, Mastercard, МИР</div>
                  </div>
                </button>
              </div>

              {/* Game Trigger */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-1 rounded-2xl">
                <div className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-amber-100/50">
                  <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                        <Trophy size={24} />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-900">Скидка 20% за игру</h4>
                        <p className="text-sm text-stone-500">Пройдите мини-игру, чтобы получить скидку</p>
                      </div>
                    </div>
                    {!discountWon ? (
                      <button
                        onClick={() => setShowGame(!showGame)}
                        className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-colors text-sm whitespace-nowrap"
                      >
                        {showGame ? 'Скрыть игру' : 'Играть'}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-600 font-medium px-4 py-2 bg-green-50 rounded-full">
                        <CheckCircle2 size={18} />
                        Скидка ваша!
                      </div>
                    )}
                  </div>

                  <AnimatePresence>
                    {showGame && !discountWon && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6">
                          <DinoGame onWin={() => {
                            setDiscountWon(true);
                            setTimeout(() => setShowGame(false), 2000);
                          }} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-100 sticky top-6"
            >
              <h3 className="text-lg font-medium text-stone-900 mb-4">Ваш заказ</h3>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
                <div className="w-16 h-16 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                  <img src="https://i.ibb.co/RGwLgSFs/hero.jpg" alt="Зеркало" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-medium text-stone-900">Умное зеркало</div>
                  <div className="text-sm text-stone-500">1 шт.</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Товары</span>
                  <span>{originalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Доставка</span>
                  <span className="text-green-600">Бесплатно</span>
                </div>
                {discountWon && (
                  <div className="flex justify-between text-amber-600 font-medium">
                    <span>Скидка за игру (20%)</span>
                    <span>-{(originalPrice - discountedPrice).toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end mb-8 pt-6 border-t border-stone-100">
                <span className="text-stone-900 font-medium">Итого</span>
                <div className="text-right">
                  {discountWon && (
                    <div className="text-sm text-stone-400 line-through mb-1">
                      {originalPrice.toLocaleString('ru-RU')} ₽
                    </div>
                  )}
                  <div className="text-2xl font-serif text-stone-900">
                    {finalPrice.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </div>

              <button className="w-full bg-stone-900 text-white py-4 rounded-full font-medium hover:bg-stone-800 transition-all hover:shadow-lg hover:-translate-y-0.5">
                Оплатить {finalPrice.toLocaleString('ru-RU')} ₽
              </button>
              
              <p className="text-xs text-stone-400 text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с условиями оферты
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
