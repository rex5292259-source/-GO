import React, { useState } from 'react';
import { Languages, CheckCircle2, ChevronRight, Settings, Shield, HelpCircle, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Profile() {
  const [showLanguageSwitch, setShowLanguageSwitch] = useState(false);
  const [selectedLang, setSelectedLang] = useState('zh-TW');

  const languages = [
    { id: 'zh-TW', name: '繁体中文', sub: 'Traditional Chinese', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh0OOOle65qywFt6ZbcgWM4i6RcKZREQUkH_-LXpEXpGyXGD5e-RBYNIvSeEw1G5isFj-_rcRUDdHHp-9roFqrbcVObDNR5QmrFrSm5BnAyua8wZZva4SnipBAg3GIfEy6Q2uAUoJnO6tptXaHAY3v3xwcaMJSTVwxSrY4n91qJfTljZZxOI6QaQK2DXbT9SAfr9DGk-A6gtg5E-gn0-PMPRLWqTWzDoqrfdJk0Wx7IjHQoZfTURoZjYYisrDG6NsuAYmLEKQdKsau' },
    { id: 'en', name: 'English', sub: '英語', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArhUzGgp2Sd959bqGSEMsMXwNNCxG5bgk5mOpRhEfw1sqZxa8Kft99YiWI63dCL2Yks7aqzZeFmt7T-GFtd0k-ZQdrvlrk81-C7UcpVhCJ9w8ZeEtKQTg3S6IYETaHfrCimyJ1eDdBUdTJDySvL01_9-EHhYgeFyWR9sLEccgbWMsK1G8WqPV_zQD_42BHasVYgyAiitEUzhGc0eb5ybu49JVdYFzQlXcsN3aZGvEsPuxD4CrZbnloIjSeHJXSuKMM2uDEFjDM64Tf' },
    { id: 'ja', name: '日本語', sub: 'Japanese', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2jMyuwabcPl0SMeHRvjLi2PNrSNrdx1dvgyFnM0P6Z_0TdvKv9p1llylqTf5XEfvoG203-VlCdCAZHo00Fhabh2xtkTGfbbPoKsu04i7vBfN053qmO6vMfB4QSyR_l_CjNv6F1UODv-0qhmMGlwPbpkzGsYXh3YUMQwvQAjnrTkVl-pA3AQn9TTF_WtifA_RzgLBCXTs8iuajA7SSQcFcuHadDFGj1r_IPiojOnmS1mkFGdRRhtD68UMpO8z1s7sE2P9bmogk0kyT' },
    { id: 'ko', name: '한국어', sub: 'Korean', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpTgmUp3xJ9sbmv-oZGuVgF_Ot90OpVNnrMl97n8BHHJQUWT7fnRngVmG-CODKyechFscKa8-IbZiT7_3gyDlZjVk9zWb9CFgN7WlOE5GpmG6xWlx2TSlL-pHicoqTBXLT2qafPpkhwkglwzF36nHQweQhT6dA8Qv9he0stq0rlKwaLW-U9eiy2XqJLIRH3LuYux7qstS_XJuH6gRJOjpxT5HvItzfyMLCe5HV2BSurZyt-acmoObdirsuauDSueZR6d9OaaV_5_wE' }
  ];

  if (showLanguageSwitch) {
    return (
    <div className="px-6 pb-32 bg-background min-h-screen">
      <div className="mb-12 text-center pt-12">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-primary/10 mb-8 border border-primary/10 soft-shadow">
          <Languages className="text-primary" size={48} />
        </div>
        <h2 className="text-3xl font-headline font-black mb-3 text-on-surface">選擇您的語言</h2>
        <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest opacity-60">Choose your preferred language for the best experience.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {languages.map((lang) => (
          <button 
            key={lang.id}
            onClick={() => setSelectedLang(lang.id)}
            className={`relative group w-full text-left p-6 rounded-3xl transition-all duration-300 border soft-shadow ${
              selectedLang === lang.id 
                ? 'bg-primary/5 border-primary' 
                : 'bg-white border-outline hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl overflow-hidden border-2 ${selectedLang === lang.id ? 'border-primary' : 'border-outline opacity-60 group-hover:opacity-100'}`}>
                  <img className="w-full h-full object-cover" src={lang.image} />
                </div>
                <div>
                  <span className={`block text-xl font-black ${selectedLang === lang.id ? 'text-primary' : 'text-on-surface'}`}>{lang.name}</span>
                  <span className="text-[10px] text-on-surface-variant font-black tracking-widest uppercase opacity-60">{lang.sub}</span>
                </div>
              </div>
              {selectedLang === lang.id ? (
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-primary text-on-primary shadow-lg">
                  <CheckCircle2 size={24} fill="currentColor" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl border-2 border-outline group-hover:border-primary/50 transition-colors"></div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-16">
        <button 
          onClick={() => setShowLanguageSwitch(false)}
          className="w-full py-6 rounded-2xl bg-primary text-on-primary font-headline font-black text-lg soft-shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
        >
          確認語言變更
          <CheckCircle2 size={24} />
        </button>
        <p className="text-center text-on-surface-variant text-[10px] font-black tracking-widest uppercase mt-8 opacity-60">
          變更後將重新加載應用程式介面。
        </p>
      </div>
    </div>
    );
  }

  return (
    <div className="px-6 pb-32 bg-background min-h-screen">
      {/* Profile Header */}
      <section className="pt-12 mb-12 text-center">
        <div className="relative inline-block">
          <div className="w-40 h-40 rounded-[3rem] overflow-hidden border-4 border-primary/10 soft-shadow-lg">
            <img 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=500" 
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary px-4 py-1.5 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
            <span className="text-[10px] font-black tracking-widest uppercase">LV.5</span>
          </div>
        </div>
        <h2 className="text-3xl font-headline font-black mt-8 text-on-surface">台中食客</h2>
        <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest opacity-60 mt-1">Taichung Foodie • rex5292259@gmail.com</p>
      </section>

      {/* Profile Menu */}
      <section className="space-y-4">
        {[
          { icon: Languages, label: '語言切換', sub: '繁体中文', color: 'text-primary', onClick: () => setShowLanguageSwitch(true) },
          { icon: Settings, label: '帳號設定', color: 'text-primary' },
          { icon: Shield, label: '隱私與安全', color: 'text-secondary' },
          { icon: HelpCircle, label: '幫助與支援', color: 'text-on-surface-variant' }
        ].map((item, idx) => (
          <button 
            key={idx}
            onClick={item.onClick}
            className="w-full flex items-center justify-between p-6 rounded-3xl bg-white border border-outline hover:border-primary transition-all group soft-shadow"
          >
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center ${item.color}`}>
                <item.icon size={24} />
              </div>
              <span className="font-black text-lg text-on-surface uppercase tracking-widest">{item.label}</span>
            </div>
            <div className="flex items-center gap-3">
              {item.sub && <span className="text-[10px] font-black tracking-widest uppercase text-primary opacity-70">{item.sub}</span>}
              <ChevronRight size={20} className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}

        <button className="w-full flex items-center justify-between p-6 rounded-3xl bg-error/5 border border-error/10 hover:bg-error/10 transition-all group mt-10 soft-shadow">
          <div className="flex items-center gap-5 text-error">
            <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center">
              <LogOut size={24} />
            </div>
            <span className="font-black text-lg uppercase tracking-widest">登出帳號</span>
          </div>
        </button>
      </section>
    </div>
  );
}
