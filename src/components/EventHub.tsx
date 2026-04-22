import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  ChevronRight, 
  Star, 
  Clock, 
  Filter, 
  ArrowLeft, 
  Bell, 
  Map as MapIcon, 
  ShoppingBasket,
  Flame,
  Zap,
  Sparkles
} from 'lucide-react';
import { Event, FoodItem, Store } from '../types';

interface EventHubProps {
  onBack: () => void;
  onNavigateToStall: (id: string) => void;
  onNavigateToMap: () => void;
}

const EVENTS: Event[] = [
  {
    id: 'e1',
    title: '日式美食週',
    description: '匯集逢甲最道地的日式攤位，從章魚燒到大阪燒，讓你一秒到日本！包含多家網路人氣名店，限時一週全面優惠。',
    startDate: '2026-04-20',
    endDate: '2026-04-27',
    image: 'https://images.unsplash.com/photo-1580442151529-343f2f5e0e27?auto=format&fit=crop&q=80&w=1000',
    badge: 'Limited',
    vendors: ['v1', 'v2', 'v3'],
    featuredDishes: [
      {
        id: 'd1',
        name: '特級章魚燒',
        price: 80,
        rating: 4.8,
        reviews: 120,
        description: '超大顆章魚丁，外酥內軟。',
        image: 'https://images.unsplash.com/photo-1598511757337-fe2cad875242?auto=format&fit=crop&q=80&w=500',
        tags: ['熱門', '道地']
      },
      {
        id: 'd2',
        name: '明太子大阪燒',
        price: 150,
        rating: 4.9,
        reviews: 85,
        description: '濃郁明太子醬，現點現做。',
        image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&q=80&w=500',
        tags: ['人氣', '限量']
      }
    ]
  },
  {
    id: 'e2',
    title: '深夜炸物祭',
    description: '集結台中最強炸雞排、深海大魷魚，宵夜首選都在這。',
    startDate: '2026-04-25',
    endDate: '2026-05-02',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=1000',
    badge: 'Hot',
    vendors: ['v4', 'v5'],
    featuredDishes: []
  },
  {
    id: 'e3',
    title: '甜食馬拉松',
    description: '草莓季末最後衝刺！',
    startDate: '2026-04-10',
    endDate: '2026-04-30',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=1000',
    badge: 'New',
    vendors: ['v6'],
    featuredDishes: []
  }
];

const VENDORS: Record<string, Store & { rating: number; category: string; queue: string }> = {
  'v1': { id: 'v1', name: '築地銀章魚燒', location: '慶和街', image: 'https://images.unsplash.com/photo-1598511757337-fe2cad875242?auto=format&fit=crop&q=80&w=500', rating: 4.7, category: '小吃', queue: '5組候位' },
  'v2': { id: 'v2', name: '大和大阪燒', location: '文華路', image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&q=80&w=500', rating: 4.5, category: '正餐', queue: '2組候位' },
  'v3': { id: 'v3', name: '京都宇治抹茶', location: '福星路', image: 'https://images.unsplash.com/photo-1582733315364-b499f57ebbf2?auto=format&fit=crop&q=80&w=500', rating: 4.9, category: '甜點', queue: '免排隊' },
};

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = new Date(targetDate).getTime() - new Date().getTime();
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 text-white">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg min-w-[36px] text-center border border-white/20">
          <p className="text-sm font-black leading-none">{value}</p>
          <p className="text-[7px] uppercase opacity-50">{unit}</p>
        </div>
      ))}
    </div>
  );
};

export default function EventHub({ onBack, onNavigateToStall, onNavigateToMap }: EventHubProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState('All');

  const activeEvent = EVENTS[0];

  const handleNotify = () => {
    // Simulate push notification trigger
    alert('通知已設定！當有新活動時我們將第一時間通知您 🔔');
  };

  const renderBadge = (badge?: string) => {
    if (!badge) return null;
    const colors = {
      'Limited': 'bg-orange-500 text-white',
      'Hot': 'bg-red-500 text-white',
      'New': 'bg-primary text-white'
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${colors[badge as keyof typeof colors]}`}>
        {badge}
      </span>
    );
  };

  if (selectedEvent) {
    return (
      <div className="bg-white min-h-screen pb-32">
        {/* Detail Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-outline px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSelectedEvent(null)} className="w-10 h-10 rounded-full border border-outline flex items-center justify-center text-on-surface">
            <ArrowLeft size={20} />
          </button>
          <h3 className="font-headline font-black text-xl text-on-surface">{selectedEvent.title}</h3>
          <button onClick={handleNotify} className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
            <Bell size={20} />
          </button>
        </header>

        {/* Detail Content */}
        <div className="px-6 space-y-10 pt-6">
          <section className="rounded-[2.5rem] overflow-hidden relative aspect-video border border-outline soft-shadow-lg">
            <img src={selectedEvent.image} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4">
              {renderBadge(selectedEvent.badge)}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 text-orange-600 mb-4">
              <Calendar size={18} />
              <span className="text-[10px] font-black tracking-widest uppercase">{selectedEvent.startDate} - {selectedEvent.endDate}</span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
              {selectedEvent.description}
            </p>
          </section>

          {/* Participating Vendors */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-headline font-black text-on-surface">參與店家</h4>
              <p className="text-orange-600 text-[9px] font-black tracking-widest uppercase opacity-70">Participating Vendors</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {selectedEvent.vendors.map(id => {
                const vendor = VENDORS[id];
                if (!vendor) return null;
                return (
                  <motion.div 
                    key={id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigateToStall(id)}
                    className="flex items-center gap-4 p-4 bg-white border border-outline rounded-3xl soft-shadow hover:border-orange-500/50 transition-all cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-outline">
                      <img src={vendor.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-headline font-black text-lg text-on-surface">{vendor.name}</h5>
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[8px] font-black rounded-md border border-orange-100">{vendor.category}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-primary">
                          <Star size={12} fill="currentColor" />
                          <span className="text-[10px] font-black">{vendor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-on-surface-variant opacity-60">
                          <Clock size={12} />
                          <span className="text-[10px] font-black">{vendor.queue}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-outline" size={20} />
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Featured Dishes */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-headline font-black text-on-surface">活動限定必吃</h4>
              <p className="text-orange-600 text-[9px] font-black tracking-widest uppercase opacity-70">Featured Dishes</p>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar -mx-6 px-6">
              {selectedEvent.featuredDishes.map((dish) => (
                <div key={dish.id} className="flex-none w-64 space-y-4 group cursor-pointer">
                  <div className="aspect-square bg-white rounded-[2rem] overflow-hidden relative border border-outline group-hover:border-orange-500 transition-all soft-shadow">
                    <img src={dish.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {dish.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-md text-[8px] font-black tracking-tight rounded-full border border-outline">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="text-lg font-black text-on-surface group-hover:text-orange-600 transition-colors uppercase tracking-tight">{dish.name}</h5>
                      <span className="text-orange-600 font-black text-xs">NT${dish.price}</span>
                    </div>
                    <button className="mt-3 w-full py-2.5 bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white text-[9px] font-black uppercase tracking-widest rounded-xl border border-orange-100 transition-all flex items-center justify-center gap-2">
                      <ShoppingBasket size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        {/* Detail CTA */}
        <div className="fixed bottom-24 left-0 w-full px-6 z-40">
          <button 
            onClick={onNavigateToMap}
            className="w-full h-16 bg-orange-600 text-white font-headline font-black text-lg rounded-2xl soft-shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
          >
            <MapIcon size={22} fill="currentColor" />
            查看活動美食地圖
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <header className="px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="w-12 h-12 rounded-full border border-outline flex items-center justify-center text-on-surface soft-shadow">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3">
            <button onClick={handleNotify} className="w-12 h-12 rounded-full border border-outline flex items-center justify-center text-orange-600 soft-shadow active:scale-90 transition-transform">
              <Bell size={20} />
            </button>
            <button className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 soft-shadow">
              <Filter size={20} />
            </button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-5xl font-headline font-black text-on-surface leading-[0.9] tracking-tighter mb-4">
            限時<span className="text-orange-600">活動</span>專區
          </h2>
          <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest leading-relaxed opacity-60 max-w-[200px]">
            即時追蹤台中夜市最新主題活動與限定美食。
          </p>
        </motion.div>
      </header>

      {/* Main Banner Section */}
      <motion.section 
        className="px-6 mb-12"
        whileTap={{ scale: 0.98 }}
      >
        <div 
          onClick={() => setSelectedEvent(activeEvent)}
          className="relative h-[360px] rounded-[3rem] overflow-hidden border border-outline soft-shadow-lg cursor-pointer"
        >
          <img src={activeEvent.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute top-8 left-8 flex gap-3">
            {renderBadge(activeEvent.badge)}
            <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/20">
              <Sparkles size={12} className="text-orange-600" />
              <span className="text-[9px] font-black text-on-surface">官方精選推薦</span>
            </div>
          </div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="mb-4">
              <p className="text-orange-400 text-[10px] font-black tracking-[0.2em] mb-2 uppercase">限時倒數中</p>
              <CountdownTimer targetDate={activeEvent.endDate} />
            </div>
            <h3 className="text-4xl font-headline font-black text-white mb-2 leading-[0.9] tracking-tight">{activeEvent.title}</h3>
            <div className="flex items-center justify-between">
              <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">{activeEvent.startDate} - {activeEvent.endDate}</p>
              <div className="px-5 py-2.5 bg-orange-600 text-white text-[10px] font-black tracking-widest rounded-full uppercase flex items-center gap-2 shadow-lg">
                View Details
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Filters */}
      <section className="px-6 mb-10">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-6 px-6">
          {['全部活動', '近期舉辦', '熱門專區', '美食主題', '遊戲快閃'].map(tag => (
             <button 
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap border transition-all ${
                filter === tag ? 'bg-orange-600 text-white border-orange-600 shadow-md' : 'bg-white text-on-surface-variant border-outline'
              }`}
             >
               {tag}
             </button>
          ))}
        </div>
      </section>

      {/* Event List Section */}
      <section className="px-6 space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-2xl font-headline font-black text-on-surface">其他精采活動</h3>
          <p className="text-orange-600 text-[9px] font-black tracking-widest uppercase opacity-70">More Events</p>
        </div>
        <div className="space-y-4">
          {EVENTS.slice(1).map(event => (
            <motion.div 
              key={event.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedEvent(event)}
              className="flex items-center gap-4 p-4 bg-white border border-outline rounded-3xl soft-shadow hover:border-orange-500/50 transition-all cursor-pointer"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-outline">
                <img src={event.image} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow py-1 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  {renderBadge(event.badge)}
                  <h4 className="font-headline font-black text-lg text-on-surface truncate">{event.title}</h4>
                </div>
                <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest opacity-60 line-clamp-1 mb-2">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-on-surface-variant opacity-40">
                  <Calendar size={12} />
                  <span className="text-[9px] font-black uppercase">{event.startDate}</span>
                </div>
              </div>
              <ChevronRight className="text-outline" size={20} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global CTA */}
      <div className="fixed bottom-24 left-0 w-full px-6 z-40">
        <button 
          onClick={onNavigateToMap}
          className="w-full h-16 bg-white border border-orange-600 text-orange-600 font-headline font-black text-lg rounded-2xl soft-shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <Flame size={22} fill="currentColor" />
          立即開始探索所有活動
        </button>
      </div>
    </div>
  );
}
