import React, { useState } from 'react';
import { Clock, Star, Wallet, CreditCard, Banknote, ShieldCheck, Leaf, ShoppingBasket, Zap, Heart, Navigation as NavigationIcon, Smartphone, QrCode } from 'lucide-react';
import { motion } from 'motion/react';
import { FoodItem } from '../types';

interface StallDetailProps {
  stallId: string;
  onOrderNow: () => void;
}

export default function StallDetail({ stallId, onOrderNow }: StallDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Generate a random mock Food Business Registration Number
  const regNumber = React.useMemo(() => {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
    const num1 = Math.floor(10000000 + Math.random() * 90000000); 
    const num2 = Math.floor(10000 + Math.random() * 90000);
    return `${letter}-${num1}-${num2}-1`;
  }, []);

  // Mock data for the stall
  const stall = {
    id: stallId,
    name: stallId === '1' ? '大甲芋頭城' : stallId === '2' ? '明倫蛋餅' : stallId === '3' ? '激旨燒鳥' : '阿財碳烤大香腸',
    rating: 4.8,
    reviews: 2400,
    description: '炭火慢烤，鮮嫩多汁，傳承三十年的特製蒜泥醬汁。',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000', // Better food stall image
    tags: ['OPEN NOW', 'MICHELIN GUIDE'],
    location: '逢甲夜市 • 慶和街 12 號',
    origin: '台灣本土豬肉',
    safetyBadges: ['GHP 認證評分：良'],
    dietary: ['Halal Friendly', 'Vegetarian Available']
  };

  const menuItems = [
    { name: '招牌碳烤大香腸', price: 60, calories: '420 kcal', allergens: '大豆、大蒜', ingredients: '本土豬後腿肉、高粱酒、大蒜', image: 'https://images.unsplash.com/photo-1532636875304-0c89119d9b4d?auto=format&fit=crop&q=80&w=500' },
    { name: '糯米腸包香腸', price: 85, calories: '680 kcal', allergens: '花生、蝦米', ingredients: '圓糯米、花生、香腸、酸菜', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500' },
    { name: '秘製鹹豬肉', price: 120, calories: '550 kcal', allergens: '胡椒', ingredients: '五花肉、黑胡椒、五香粉', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500' }
  ];

  return (
    <div className="pb-48 bg-background">
      {/* Registration Number Header */}
      <div className="bg-surface-container-low px-6 py-2 border-b border-outline">
        <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">
          食品業者登錄字號：{regNumber}
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 w-full overflow-hidden">
        <img className="w-full h-full object-cover opacity-80" src={stall.image} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        <div className="absolute bottom-8 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex gap-2 mb-3">
              {stall.tags.map(tag => (
                <span key={tag} className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">{tag}</span>
              ))}
            </div>
            <h2 className="text-5xl font-headline font-black text-on-surface leading-tight mb-2">{stall.name}</h2>
            <p className="text-on-surface-variant font-black flex items-center gap-2 text-xs uppercase tracking-widest opacity-80">
              <Clock className="text-primary" size={16} />
              17:00 - 01:00 • {stall.location}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Action Bar */}
      <section className="px-6 py-6 flex gap-4">
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border transition-all soft-shadow ${isFavorite ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-outline text-on-surface-variant'}`}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          <span className="font-black text-xs uppercase tracking-widest">{isFavorite ? '已收藏' : '加入收藏'}</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-on-primary font-black text-xs uppercase tracking-widest soft-shadow-lg active:scale-95 transition-transform">
          <NavigationIcon size={20} />
          導航前往
        </button>
      </section>

      {/* Status Bento Grid */}
      <section className="px-6 grid grid-cols-2 gap-4">
        <div className="col-span-2 bg-white p-6 rounded-3xl border border-outline flex items-center justify-between soft-shadow-lg">
          <div>
            <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-2 opacity-70">即時候位狀態</p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-headline font-black text-primary">#14</span>
              <span className="text-on-surface-variant text-xs font-black uppercase tracking-widest opacity-60">號碼正在點餐</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-on-surface text-3xl font-black">~15 min</p>
            <p className="text-on-surface-variant text-[10px] font-black tracking-widest uppercase opacity-60">預計等候</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="bg-white p-5 rounded-3xl border border-outline flex flex-col justify-between h-32 soft-shadow">
          <p className="text-on-surface-variant text-[10px] font-black tracking-widest uppercase opacity-60">食材來源</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-primary" size={18} />
            </div>
            <span className="text-xs font-black text-on-surface uppercase tracking-widest">{stall.origin}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-outline flex flex-col justify-between h-32 soft-shadow">
          <p className="text-on-surface-variant text-[10px] font-black tracking-widest uppercase opacity-60">支付方式</p>
          <div className="flex gap-2 flex-wrap">
            <div className="w-8 h-8 bg-surface-container rounded-lg flex items-center justify-center text-on-surface" title="現金">
              <Banknote size={16} />
            </div>
            <div className="w-8 h-8 bg-surface-container rounded-lg flex items-center justify-center text-on-surface" title="電子支付">
              <Smartphone size={16} />
            </div>
            <div className="w-8 h-8 bg-surface-container rounded-lg flex items-center justify-center text-on-surface" title="第三方支付">
              <QrCode size={16} />
            </div>
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary" title="信用卡">
              <CreditCard size={16} />
            </div>
          </div>
        </div>

        {/* Badges & Dietary */}
        <div className="col-span-2 flex flex-wrap gap-3 mt-2">
          {stall.safetyBadges.map(badge => (
            <div key={badge} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-outline soft-shadow">
              <ShieldCheck className="text-primary" size={14} />
              <span className="text-[10px] font-black text-on-surface uppercase tracking-widest">{badge}</span>
            </div>
          ))}
          {stall.dietary.map(diet => (
            <div key={diet} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-outline soft-shadow">
              <Leaf className="text-secondary" size={14} />
              <span className="text-[10px] font-black text-on-surface uppercase tracking-widest">{diet}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section className="px-6 mt-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-headline font-black text-on-surface">經典菜單</h3>
            <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase opacity-70">Signature Menu</p>
          </div>
        </div>
        <div className="space-y-8">
          {menuItems.map((item, index) => (
            <div key={index} className="flex gap-6 group">
              <div className="w-28 h-28 rounded-3xl overflow-hidden flex-shrink-0 border border-outline soft-shadow">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={item.image} />
              </div>
              <div className="flex-grow flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-xl font-black text-on-surface group-hover:text-primary transition-colors">{item.name}</h4>
                    <span className="text-primary font-black text-lg">NT$ {item.price}</span>
                  </div>
                  <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest opacity-60 leading-relaxed mb-2">成分：{item.ingredients}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-md font-black uppercase tracking-widest border border-outline">{item.calories}</span>
                    <span className="text-[9px] text-primary font-black uppercase tracking-widest">過敏原：{item.allergens}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setCartCount(c => c + 1)}
                  className="mt-3 w-full py-2 bg-surface-container hover:bg-primary/10 hover:text-primary text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-xl border border-outline transition-all active:scale-95"
                >
                  Add to Cart +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fixed Online Order Button */}
      <div className="fixed bottom-24 left-0 w-full px-6 z-40">
        <button 
          onClick={onOrderNow}
          className="w-full h-16 bg-primary text-on-primary font-headline font-black text-lg rounded-2xl soft-shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <Zap size={22} fill="currentColor" />
          立即線上點餐 (候位 3 組)
        </button>
      </div>

      {/* Cart FAB */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
        <button className="relative bg-white text-primary w-16 h-16 rounded-full soft-shadow-lg flex items-center justify-center scale-110 active:scale-95 transition-all border border-outline">
          <ShoppingBasket size={30} fill="currentColor" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
