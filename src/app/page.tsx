"use client";
import React, { useState } from 'react';
import { menuItems } from '../data/menuData'; 
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, ChevronRight, Utensils, Phone, MapPin, Flame, Minus, Plus, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CategoryType = 'all' | 'breakfast' | 'bakery' | 'lunch' | 'stews' | 'salads' | 'desserts' | 'drinks';

const categoryLabels: Record<CategoryType, string> = {
  all: 'الكل',
  breakfast: '☀️ الفطور',
  bakery: '🌾 المخبازه',
  lunch: '🔥 الغداء',
  stews: '🍲 الإيدامات',
  salads: '🥗 السلطات',
  desserts: '🍰 الحالي',
  drinks: '🥤 المشروبات',
};

export default function RestaurantHome() {
  const { cart, addToCart, removeFromCart, cartTotal, tableNumber, setTableNumber, sendToWhatsApp } = useCart();
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [tableError, setTableError] = useState('');

  // ✅ حماية رقم الطاولة: فقط أرقام من 1 إلى 1000
  const handleTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // السماح بالحقل الفارغ مؤقتاً
    if (val === '') {
      setTableNumber('');
      setTableError('');
      return;
    }

    // التحقق: فقط أرقام
    if (!/^\d+$/.test(val)) {
      setTableError('يرجى إدخال أرقام فقط');
      return;
    }

    const num = parseInt(val, 10);
    
    if (num < 1) {
      setTableError('رقم الطاولة يجب أن يكون 1 على الأقل');
    } else if (num > 1000) {
      setTableError('الحد الأقصى 1000 طاولة');
    } else {
      setTableError('');
      setTableNumber(num.toString());
    }
  };

  const isTableValid = tableNumber.trim() !== '' && 
                       /^\d+$/.test(tableNumber) && 
                       parseInt(tableNumber) >= 1 && 
                       parseInt(tableNumber) <= 1000;

  const filteredMenu = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen font-sans bg-[#0F0F0F] text-white">

      {/* --- شريط التنقل --- */}
      <nav className="sticky top-0 z-50 bg-[#0F0F0F]/95 backdrop-blur-md border-b border-[#D97706]/20 px-4 md:px-6 py-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#D97706] rounded-full flex items-center justify-center">
            <Utensils className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#F59E0B] tracking-tight">مطعم شواية الحطاب</span>
            <span className="hidden md:block text-[10px] text-gray-400 font-mono tracking-widest">جودة الطعم .. سر تميزنا</span>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative p-3 bg-[#D97706] rounded-full shadow-lg hover:bg-[#B45309] transition-all active:scale-95"
        >
          <ShoppingBag className="w-5 h-5 text-white" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0F0F0F] animate-bounce">
              {cartItemCount}
            </span>
          )}
        </button>
      </nav>

      {/* --- قسم الأبطال (Hero) مع صورة خلفية --- */}
      <section className="relative h-[60vh] md:h-[70vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* ✅ صورة الخلفية الجديدة */}
        <div className="absolute inset-0">
          <img 
            src="/path-to-your-image.png" 
            
            className="w-full h-full object-cover"
          />
          {/* طبقة داكنة فوق الصورة للقراءة */}
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        {/* النمط الزخرفي */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D97706' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D97706]/10 border border-[#D97706]/30 rounded-full mb-6 text-[#F59E0B] text-sm font-medium backdrop-blur-sm">
            <Flame className="w-4 h-4" /> شواية الحطاب
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight drop-shadow-lg">
            أشهى الأكلات <br /> <span className="text-[#F59E0B]">الجنوبية الأصيلة</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            استمتع بأصنافنا المتنوعة من الفطور والغداء والحلويات. اطلب من طاولتك بكل سهولة.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="#menu" className="px-8 py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-full transition-all shadow-xl shadow-[#D97706]/20 hover:scale-105 active:scale-95">
              تصفح القائمة
            </a>
            <a href="#contact" className="px-8 py-3 bg-transparent border-2 border-[#D97706] text-[#F59E0B] font-bold rounded-full transition-all hover:bg-[#D97706]/10 active:scale-95 backdrop-blur-sm">
              تواصل معنا
            </a>
          </div>
        </motion.div>
      </section>

      {/* --- خانة رقم الطاولة (مُحسَّنة) --- */}
      <section className="max-w-4xl mx-auto px-4 -mt-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a1a1a] border border-[#D97706]/30 rounded-2xl p-4 md:p-6 shadow-xl flex flex-col md:flex-row items-center gap-4"
        >
          <div className="flex items-center gap-3 flex-1 w-full">
            <div className="w-12 h-12 bg-[#D97706]/20 rounded-xl flex items-center justify-center shrink-0">
              <Utensils className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1"> ادخل رقم الطاولة </label>
              <input
                type="text" // نستخدم text مع تحقق يدوي لتحكم أفضل
                inputMode="numeric"
                pattern="[0-9]*"
                value={tableNumber}
                onChange={handleTableChange}
                placeholder="أدخل رقم طاولتك ..."
                className={`w-full bg-[#0F0F0F] border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                  tableError 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-[#D97706]/30 focus:border-[#D97706] focus:ring-[#D97706]'
                }`}
              />
              {tableError && (
                <p className="text-red-400 text-xs mt-1">{tableError}</p>
              )}
            </div>
          </div>
          {isTableValid && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-[#D97706]/20 text-[#F59E0B] px-4 py-2 rounded-lg font-bold text-sm"
            >
              طاولة #{tableNumber}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* --- القائمة الديناميكية مع صور --- */}
      <section id="menu" className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">قائمتنا</h2>
          <p className="text-gray-400 mb-8">اختر من أصنافنا المتنوعة</p>

          <div className="flex justify-center gap-2 flex-wrap">
            {(Object.keys(categoryLabels) as CategoryType[]).map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all border ${activeCategory === cat ? 'bg-[#D97706] text-white border-[#D97706] shadow-lg shadow-[#D97706]/20' : 'bg-[#1a1a1a] text-gray-300 border-[#333] hover:border-[#D97706]/50 hover:text-[#F59E0B]'}`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredMenu.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#333] hover:border-[#D97706]/40 shadow-sm hover:shadow-[0_10px_30px_rgba(217,119,6,0.1)] transition-all duration-300 group"
            >
              {/* صورة الصنف */}
              <div className="h-40 w-full relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name_ar}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
                  }}
                />
                <div className="absolute top-2 right-2 bg-[#D97706] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                  {item.price} ر.س
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-white text-base mb-1 text-center">{item.name_ar}</h3>
                <p className="text-gray-500 text-xs text-center mb-3">{item.name_en}</p>
                <button 
                  onClick={() => addToCart(item)} 
                  className="w-full py-2.5 bg-[#D97706] text-white rounded-xl text-sm font-bold hover:bg-[#B45309] transition-all shadow-lg shadow-[#D97706]/10 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> إضافة للطلب
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- معلومات التواصل --- */}
      <section id="contact" className="bg-[#1a1a1a] border-t border-[#333] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">📞 للطلب والاستفسار</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-[#333] hover:border-[#D97706]/40 transition-all">
              <div className="w-12 h-12 bg-[#D97706]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="font-bold text-white mb-2">الهاتف</h3>
              <a href="tel:0552873632" className="text-[#F59E0B] hover:text-[#D97706] transition-colors block mb-1">0552873632</a>
              <a href="tel:0541141707" className="text-[#F59E0B] hover:text-[#D97706] transition-colors block">0541141707</a>
            </div>
            <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-[#333] hover:border-[#D97706]/40 transition-all">
              <div className="w-12 h-12 bg-[#D97706]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="font-bold text-white mb-2">الموقع</h3>
              <p className="text-gray-400">جازان - محليه</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#333]">
            <p className="text-[#D97706] font-bold text-lg">🔥 جودة الطعم .. سر تميزنا</p>
          </div>
        </div>
      </section>

      {/* --- السلة --- */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsCartOpen(false)} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full md:w-[450px] h-full bg-[#0F0F0F] border-l border-[#333] shadow-2xl relative flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#333] flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <ShoppingBag className="w-5 h-5 text-[#F59E0B]" /> طلبك
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Table Number Display */}
              <div className="px-6 py-3 bg-[#1a1a1a] border-b border-[#333]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">رقم الطاولة:</span>
                  <span className={`font-bold text-sm ${isTableValid ? 'text-[#F59E0B]' : 'text-red-400'}`}>
                    {isTableValid ? `طاولة #${tableNumber}` : 'غير صالح (1-1000)'}
                  </span>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">السلة فارغة</p>
                    <p className="text-gray-600 text-sm mt-2">أضف بعض الأصناف للبدء</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.product.id} 
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-[#1a1a1a] p-4 rounded-xl border border-[#333]"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="font-bold text-white block">{item.product.name_ar}</span>
                            <span className="text-[#F59E0B] text-sm font-bold">{item.product.price} ر.س</span>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id)} 
                            className="text-gray-500 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4"/>
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => {
                              if (item.quantity > 1) {
                                const currentQty = item.quantity;
                                removeFromCart(item.product.id);
                                if (currentQty > 1) {
                                  for (let i = 0; i < currentQty - 1; i++) {
                                    addToCart(item.product);
                                  }
                                }
                              } else {
                                removeFromCart(item.product.id);
                              }
                            }}
                            className="w-8 h-8 bg-[#333] rounded-lg flex items-center justify-center text-white hover:bg-[#444] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-white w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => addToCart(item.product)}
                            className="w-8 h-8 bg-[#D97706] rounded-lg flex items-center justify-center text-white hover:bg-[#B45309] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#333] bg-[#0F0F0F]">
                  <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">ملاحظات الطلب (اختياري)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="أي ملاحظات خاصة بالطلب..."
                      className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D97706] transition-all resize-none h-20 text-sm"
                    />
                  </div>

                  <div className="flex justify-between items-center text-xl font-bold mb-4">
                    <span className="text-gray-300">الإجمالي:</span>
                    <span className="text-[#F59E0B]">{cartTotal} ر.س</span>
                  </div>

                  <button 
                    onClick={() => sendToWhatsApp(notes)} 
                    className="w-full py-4 bg-[#D97706] text-white font-bold rounded-2xl hover:bg-[#B45309] transition-all flex justify-center items-center gap-2 shadow-lg shadow-[#D97706]/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isTableValid}
                  >
                    <Send className="w-5 h-5" />
                    {!isTableValid ? 'أدخل رقم طاولة صالح (1-1000)' : 'إرسال الطلب عبر واتساب'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}