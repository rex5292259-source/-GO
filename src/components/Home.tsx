import React from 'react';
import { Search, Mic, Star, MapPin, ArrowRight, Flame, Sparkles, Calendar, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { FoodItem, Store } from '../types';

interface HomeProps {
  onNavigateToStall: (id: string) => void;
  onNavigateToRoute: () => void;
  onNavigateToMap: () => void;
  onNavigateToRanking: () => void;
  onNavigateToEvents: () => void;
}

export default function Home({ onNavigateToStall, onNavigateToRoute, onNavigateToMap, onNavigateToRanking, onNavigateToEvents }: HomeProps) {
  const trendingFoods: FoodItem[] = [
    {
      id: '1',
      name: '脆皮大雞排',
      rating: 4.9,
      reviews: 1248,
      description: '外酥內嫩的極致口感，搭配特製胡椒粉，是每位老饕必點的經典。',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=500',
      tags: ['逢甲必吃', '銅板美食']
    },
    {
      id: '2',
      name: '黑糖珍珠鮮奶',
      rating: 4.8,
      reviews: 2100,
      description: '手工熬煮黑糖珍珠，搭配小農鮮奶，每一口都是濃醇香的幸福感。',
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=500',
      tags: ['一中商圈', '台中之光']
    }
  ];

  const newStores: Store[] = [
    {
      id: 's1',
      name: '極味拉麵屋',
      location: '大慶夜市',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=500',
      isNew: true
    },
    {
      id: 's2',
      name: '炭火漢堡製造所',
      location: '東海夜市',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=500',
      isNew: true
    }
  ];

  return (
    <div className="space-y-10 pb-24 bg-background">
      {/* Hero Banner */}
      <section className="relative h-[440px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            alt="Taichung Night Market" 
            className="w-full h-full object-cover opacity-60 scale-105" 
            src="https://images.unsplash.com/photo-1570133435647-1839a21c7289?auto=format&fit=crop&q=80&w=1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>
        <div className="relative z-10 px-6 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-headline font-black text-[10px] tracking-[0.4em] uppercase mb-3 block opacity-80">Taichung NightGo</span>
            <h2 className="font-headline text-5xl font-black tracking-tighter leading-[0.9] mb-6 text-on-surface">
              探索<span className="text-primary">夜市</span><br/>中的美味
            </h2>
            <p className="text-on-surface-variant font-medium mb-8 max-w-[260px] text-sm leading-relaxed">
              即時推薦台中夜市最道地的小吃、熱門攤位與智慧路徑規劃。
            </p>
          </motion.div>
          
          {/* Search Bar */}
          <div className="relative group max-w-md">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-primary" size={20} />
            </div>
            <input 
              className="w-full h-14 pl-12 pr-12 bg-white border border-outline rounded-2xl text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all outline-none soft-shadow-lg" 
              placeholder="搜尋美食、攤位或地點..." 
              type="text"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <Mic className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Bento */}
      <section className="px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-4 gap-4">
          <button 
            onClick={onNavigateToMap}
            className="col-span-2 h-44 bg-white border border-outline rounded-3xl p-6 flex flex-col justify-between group hover:border-primary transition-all text-left soft-shadow-lg"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <MapPin className="text-primary" size={28} />
            </div>
            <div>
              <span className="block text-xl font-black font-headline mb-1 text-on-surface">設施地圖</span>
              <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-60">Navigation</span>
            </div>
          </button>
          <button 
            onClick={onNavigateToRoute}
            className="col-span-2 h-44 bg-white border border-outline rounded-3xl p-6 flex flex-col justify-between group hover:border-primary transition-all text-left soft-shadow-lg"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Sparkles className="text-primary" size={28} />
            </div>
            <div>
              <span className="block text-xl font-black font-headline mb-1 text-on-surface">AI 推薦</span>
              <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-60">Smart Route</span>
            </div>
          </button>
          <button 
            onClick={onNavigateToRanking}
            className="col-span-2 h-20 bg-white border border-outline rounded-2xl px-5 flex items-center gap-4 hover:border-primary transition-all text-left soft-shadow"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Trophy className="text-primary" size={22} />
            </div>
            <span className="font-black text-lg font-headline text-on-surface">熱門排行</span>
          </button>
          <button 
            onClick={onNavigateToEvents}
            className="col-span-2 h-20 bg-white border border-outline rounded-2xl px-5 flex items-center gap-4 hover:border-primary transition-all soft-shadow"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Calendar className="text-primary" size={22} />
            </div>
            <span className="font-black text-lg font-headline text-on-surface">限時活動</span>
          </button>
        </div>
      </section>

      {/* Trending Foods */}
      <section className="space-y-6 px-6">
        <div className="flex justify-between items-end px-2">
          <div>
            <h3 className="font-headline text-2xl font-black text-on-surface">熱門趨勢</h3>
            <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase opacity-70">MOST TRENDING NOW</p>
          </div>
          <button onClick={onNavigateToRanking} className="text-primary font-black text-[10px] hover:underline tracking-widest uppercase">查看全部</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trendingFoods.map((food) => (
            <div 
              key={food.id} 
              onClick={() => onNavigateToStall(food.id)}
              className="relative bg-white border border-outline rounded-[2rem] overflow-hidden flex flex-col soft-shadow-lg cursor-pointer group hover:border-primary transition-all"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  alt={food.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src={food.image} 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-outline">
                  <Star size={12} fill="currentColor" className="text-primary" />
                  <span className="text-xs font-black text-on-surface">{food.rating}</span>
                </div>
              </div>
              <div className="p-8">
                <h4 className="font-headline text-2xl font-black text-on-surface mb-2 group-hover:text-primary transition-colors">{food.name}</h4>
                <p className="text-on-surface-variant text-xs font-medium line-clamp-2 leading-relaxed mb-6 opacity-80">{food.description}</p>
                <div className="flex flex-wrap gap-2">
                  {food.tags.map(tag => (
                    <span key={tag} className="px-4 py-1 bg-surface-container border border-outline rounded-full text-[10px] font-black text-on-surface-variant uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Stores */}
      <section className="space-y-6 px-6">
        <div className="px-2">
          <h3 className="font-headline text-2xl font-black text-on-surface">新駐店家</h3>
          <p className="text-secondary text-[10px] font-black tracking-[0.2em] uppercase opacity-70">FRESH ARRIVALS</p>
        </div>
        <div className="flex overflow-x-auto gap-6 px-2 pb-8 hide-scrollbar">
          {newStores.map((store) => (
            <div key={store.id} className="flex-none w-56 space-y-4 group cursor-pointer">
              <div className="h-56 bg-white rounded-3xl overflow-hidden relative border border-outline group-hover:border-primary transition-all soft-shadow">
                <img alt={store.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={store.image} />
                {store.isNew && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-black tracking-widest shadow-lg">NEW</div>
                )}
              </div>
              <div className="px-2">
                <h5 className="text-lg font-black text-on-surface group-hover:text-primary transition-colors">{store.name}</h5>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <MapPin size={12} />
                  <p className="text-xs font-bold opacity-60">{store.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
