import React from 'react';
import { Sparkles, Flame, IceCream, Leaf, Utensils, Users, Timer, Navigation, X } from 'lucide-react';
import { motion } from 'motion/react';

interface RoutePlanningProps {
  onBack: () => void;
}

export default function RoutePlanning({ onBack }: RoutePlanningProps) {
  const [selectedPrefs, setSelectedPrefs] = React.useState<string[]>(['Spicy']);

  const togglePref = (pref: string) => {
    setSelectedPrefs(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const routeItems = [
    { 
      id: 1, 
      name: '麻辣臭豆腐', 
      time: '8 min', 
      desc: '人氣首選，建議小辣。', 
      image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=500',
      tag: '熱門',
      dist: '150m'
    },
    { 
      id: 2, 
      name: '豪大大雞排', 
      time: '15 min', 
      desc: '現點現炸，排隊稍久。', 
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=500',
      tag: '稍擁擠',
      dist: '300m',
      isCrowded: true
    },
    { 
      id: 3, 
      name: '黑糖珍珠鮮奶', 
      time: '5 min', 
      desc: '解膩聖品，多層次口感。', 
      image: 'https://images.unsplash.com/photo-1544259509-d03499c9303e?auto=format&fit=crop&q=80&w=500',
      tag: '推薦搭配',
      dist: '100m'
    }
  ];

  return (
    <div className="px-6 pb-48 bg-background min-h-screen">
      {/* AI Assistant Intro */}
      <section className="mb-10 flex items-start gap-5 pt-8">
        <div className="bg-primary/10 p-4 rounded-3xl border border-primary/10 soft-shadow">
          <Sparkles className="text-primary" size={36} />
        </div>
        <div>
          <h2 className="text-3xl font-headline font-black text-on-surface mb-1 tracking-tight">AI 智慧路徑規劃</h2>
          <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest leading-relaxed opacity-60">正在為您避開人潮，規劃最順暢的美味行程...</p>
        </div>
      </section>

      {/* Preference Section */}
      <section className="mb-12">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-6 opacity-70">您的飲食偏好 Preference</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { id: 'Spicy', label: '辣味 Spicy', icon: Flame, color: 'text-error' },
            { id: 'Sweet', label: '甜點 Sweet', icon: IceCream, color: 'text-secondary' },
            { id: 'Vegetarian', label: '蔬食 Veg', icon: Leaf, color: 'text-green-600' },
            { id: 'Halal', label: '清真 Halal', icon: Utensils, color: 'text-primary' }
          ].map(pref => (
            <button 
              key={pref.id}
              onClick={() => togglePref(pref.id)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all border soft-shadow ${
                selectedPrefs.includes(pref.id) 
                  ? 'bg-primary text-on-primary border-primary scale-105' 
                  : 'bg-white border-outline text-on-surface-variant hover:border-primary/50'
              }`}
            >
              <pref.icon size={16} className={selectedPrefs.includes(pref.id) ? 'text-on-primary' : pref.color} />
              {pref.label}
            </button>
          ))}
        </div>
      </section>

      {/* Map Preview */}
      <section className="mb-12 relative group">
        <div className="absolute -top-4 -right-2 z-10 bg-error text-on-error px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
          <Users size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">避開人潮中</span>
        </div>
        <div className="w-full h-56 rounded-[2.5rem] overflow-hidden relative border border-outline soft-shadow-lg">
          <div className="absolute inset-0 bg-black/20 z-[1]"></div>
          <img 
            className="w-full h-full object-cover grayscale brightness-75" 
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=1000" 
          />
          <div className="absolute inset-0 z-[2] flex items-center justify-center">
            <div className="w-full h-full p-8 flex flex-col justify-end">
              <div className="flex items-center gap-4">
                <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-white/20 shadow-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></div>
                  <span className="text-[10px] font-black tracking-widest uppercase text-on-surface">預估總長 1.2 KM</span>
                </div>
                <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-white/20 shadow-lg">
                  <Timer size={14} className="text-secondary" />
                  <span className="text-[10px] font-black tracking-widest uppercase text-on-surface">約 45 MIN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route List */}
      <section className="space-y-8">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-6 opacity-70">推薦行程 Optimized Route</h3>
        {routeItems.map((item, index) => (
          <div key={item.id} className="relative pl-12">
            {index < routeItems.length - 1 && (
              <div className="absolute left-[15px] top-10 bottom-[-32px] w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent opacity-20"></div>
            )}
            <div className={`absolute left-0 top-1 w-8 h-8 rounded-2xl flex items-center justify-center z-10 border-2 border-white shadow-lg ${index === 0 ? 'bg-primary' : 'bg-surface-container'}`}>
              <span className={`text-xs font-black ${index === 0 ? 'text-on-primary' : 'text-on-surface-variant'}`}>{index + 1}</span>
            </div>
            <div className="bg-white rounded-3xl p-5 flex gap-5 items-center group hover:border-primary border border-outline transition-all soft-shadow">
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-outline">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.image} />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-headline font-black text-xl group-hover:text-primary transition-colors">{item.name}</h4>
                  <div className="flex items-center gap-1.5 text-secondary">
                    <Timer size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.time}</span>
                  </div>
                </div>
                <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest mb-4 opacity-40">{item.desc}</p>
                <div className="flex gap-3">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${item.isCrowded ? 'bg-error/5 text-error border-error/20' : 'bg-primary/5 text-primary border-primary/20'}`}>
                    {item.tag}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-surface-container text-on-surface-variant border border-outline">
                    {item.dist}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Action Buttons */}
      <div className="fixed bottom-20 left-0 w-full z-[60] px-6 pb-8 flex gap-4 bg-gradient-to-t from-background via-background/95 to-transparent pt-12">
        <button 
          onClick={onBack}
          className="flex-1 h-16 rounded-2xl bg-white text-on-surface font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-surface-container transition-all border border-outline soft-shadow"
        >
          <X size={18} />
          返回
        </button>
        <button className="flex-[2] h-16 rounded-2xl bg-primary text-on-primary font-headline font-black text-lg flex items-center justify-center gap-3 soft-shadow-lg hover:brightness-110 active:scale-[0.98] transition-all">
          <Navigation size={22} fill="currentColor" />
          開始導航
        </button>
      </div>
    </div>
  );
}
