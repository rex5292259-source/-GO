import React from 'react';
import { Trophy, TrendingUp, Star, Timer, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface RankingProps {
  onNavigateToStall: (id: string) => void;
}

export default function Ranking({ onNavigateToStall }: RankingProps) {
  const rankings = [
    { id: '1', name: '麻辣臭豆腐', category: '經典小吃', rating: 4.9, reviews: 1250, time: '8 min', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500', trend: '+12%' },
    { id: '2', name: '豪大大雞排', category: '炸物', rating: 4.8, reviews: 2100, time: '15 min', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=500', trend: '+8%' },
    { id: '3', name: '黑糖珍珠鮮奶', category: '飲品', rating: 4.7, reviews: 1800, time: '5 min', image: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=500', trend: '+15%' },
    { id: '4', name: '酥炸大魷魚', category: '海鮮', rating: 4.6, reviews: 950, time: '10 min', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=500', trend: '+5%' },
    { id: '5', name: '大腸包小腸', category: '經典小吃', rating: 4.5, reviews: 3200, time: '12 min', image: 'https://images.unsplash.com/photo-1532636875304-0c89119d9b4d?auto=format&fit=crop&q=80&w=500', trend: '-2%' },
  ];

  return (
    <div className="px-6 pb-32 space-y-8 bg-background">
      <section className="pt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-4 rounded-2xl border border-primary/10 soft-shadow">
            <Trophy className="text-primary" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-headline font-black text-on-surface">人氣排行榜</h2>
            <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest opacity-60">即時更新的美味指南</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-primary text-[10px] font-black tracking-widest uppercase">Live Updates</span>
          <div className="flex items-center gap-1.5 text-secondary mt-1">
            <TrendingUp size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Trending Now</span>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {rankings.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onNavigateToStall(item.id)}
            className="w-full flex items-center gap-5 p-5 rounded-3xl bg-white border border-outline hover:border-primary transition-all group soft-shadow"
          >
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-outline">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} alt={item.name} />
              </div>
              <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs border-2 border-white shadow-lg ${
                index === 0 ? 'bg-primary text-on-primary' : 
                index === 1 ? 'bg-secondary text-on-secondary' :
                index === 2 ? 'bg-tertiary text-on-tertiary' :
                'bg-surface-container-highest text-on-surface-variant'
              }`}>
                {index + 1}
              </div>
            </div>

            <div className="flex-grow text-left">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-headline font-black text-lg text-on-surface group-hover:text-primary transition-colors">{item.name}</h4>
                <span className={`text-[10px] font-black ${item.trend.startsWith('+') ? 'text-green-600' : 'text-error'}`}>
                  {item.trend}
                </span>
              </div>
              <p className="text-on-surface-variant text-[10px] font-black tracking-widest uppercase opacity-60 mb-3">{item.category}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-primary">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs font-black">{item.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-secondary">
                  <Timer size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.time}</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
                  {item.reviews} 則評論
                </div>
              </div>
            </div>

            <ChevronRight size={20} className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
