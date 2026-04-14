import React from 'react';
import { Home, Map as MapIcon, ReceiptText, User, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function BottomNav({ currentView, onViewChange }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: '首頁', icon: Home },
    { id: 'map', label: '地圖', icon: MapIcon },
    { id: 'ranking', label: '排行', icon: Trophy },
    { id: 'orders', label: '訂單', icon: ReceiptText },
    { id: 'profile', label: '我的', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 bg-background/90 backdrop-blur-md border-t border-outline flex justify-around items-center px-4 pb-4 z-50 soft-shadow-lg rounded-t-[2rem]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id || (currentView === 'route-planning' && item.id === 'map') || (currentView === 'stall-detail' && item.id === 'home');
        
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={`flex flex-col items-center justify-center transition-all duration-300 relative ${
              isActive 
                ? 'text-primary' 
                : 'text-on-surface-variant hover:text-primary/70'
            }`}
          >
            {isActive && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute -top-1 w-1 h-1 bg-primary rounded-full"
              />
            )}
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
            <span className="text-[10px] font-black tracking-widest mt-1 relative z-10 uppercase">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
