import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { 
  Utensils, 
  Coffee, 
  Gamepad2, 
  Navigation, 
  LocateFixed, 
  Info, 
  Car, 
  Trash2, 
  User as UserIcon, 
  Store, 
  Star,
  MapPin
} from 'lucide-react';

interface MapProps {
  onNavigateToStall: (id: string) => void;
}

const STALLS = [
  { id: '1', name: '大甲芋頭城', rating: 5.0, queueTime: '15 min', popularity: 'High', type: 'snacks', position: { lat: 24.1788, lng: 120.6465 } },
  { id: '2', name: '明倫蛋餅', rating: 4.8, queueTime: '25 min', popularity: 'Very High', type: 'snacks', position: { lat: 24.1795, lng: 120.6458 } },
  { id: '3', name: '激旨燒鳥', rating: 4.7, queueTime: '10 min', popularity: 'Medium', type: 'snacks', position: { lat: 24.1802, lng: 120.6472 } },
  { id: '4', name: '老虎堂黑糖專賣', rating: 4.6, queueTime: '5 min', popularity: 'Medium', type: 'drinks', position: { lat: 24.1782, lng: 120.6480 } },
  { id: '5', name: '射擊氣球王', rating: 4.5, queueTime: '2 min', popularity: 'Medium', type: 'games', position: { lat: 24.1810, lng: 120.6450 } },
  { id: '6', name: '套圈圈大師', rating: 4.3, queueTime: '0 min', popularity: 'Low', type: 'games', position: { lat: 24.1775, lng: 120.6455 } },
];

const TYPE_CONFIG = {
  snacks: { color: '#FF4D12', icon: Utensils, label: '小吃' },
  drinks: { color: '#00B4D8', icon: Coffee, label: '飲料' },
  games: { color: '#7209B7', icon: Gamepad2, label: '遊戲' },
};

export default function Map({ onNavigateToStall }: MapProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedStall, setSelectedStall] = useState<typeof STALLS[0] | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAUOA0i3XTL0Eex8s701l1t5Fze74KRkb4';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserLocation({ lat: 24.1788, lng: 120.6465 });
        }
      );
    } else {
      setUserLocation({ lat: 24.1788, lng: 120.6465 });
    }
  }, []);

  return (
    <div className="px-4 space-y-6 pb-24 bg-background">
      <header className="pt-4 flex justify-between items-end px-2">
        <div>
          <h2 className="font-headline text-3xl font-black tracking-tight text-on-surface">設施地圖</h2>
          <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase opacity-70">Nearby Facilities & Crowds</p>
        </div>
        <button 
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={`px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all border ${showHeatmap ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20' : 'bg-surface-container border-outline text-on-surface-variant'}`}
        >
          {showHeatmap ? '人潮擁擠程度：開啟' : '人潮擁擠程度：關閉'}
        </button>
      </header>

      {/* Map Canvas Section */}
      <section className="relative h-[480px] w-full rounded-[2rem] overflow-hidden soft-shadow-lg border border-outline">
        <APIProvider apiKey={apiKey}>
          <GoogleMap
            defaultCenter={userLocation || { lat: 24.1788, lng: 120.6465 }}
            defaultZoom={17}
            mapId="night_market_map_light"
            disableDefaultUI={true}
            className="w-full h-full"
          >
            {/* Mock Heatmap Overlay - Representing Crowd Congestion Levels */}
            {showHeatmap && (
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Extremely Crowded - Red Zones */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-500/25 rounded-full blur-[70px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-red-600/20 rounded-full blur-[60px]"></div>
                
                {/* Crowded - Orange/Yellow Zones */}
                <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-orange-400/15 rounded-full blur-[50px]"></div>
                <div className="absolute bottom-1/2 left-1/3 w-48 h-48 bg-yellow-400/10 rounded-full blur-[40px]"></div>
                
                {/* Indicator text (Floating) */}
                <div className="absolute top-1/4 left-1/4 bg-red-500/80 text-white text-[8px] font-black px-2 py-0.5 rounded-full backdrop-blur-sm shadow-lg z-10 uppercase tracking-tighter">
                  極度擁擠
                </div>
                <div className="absolute bottom-1/4 right-1/3 bg-red-500/80 text-white text-[8px] font-black px-2 py-0.5 rounded-full backdrop-blur-sm shadow-lg z-10 uppercase tracking-tighter">
                  人潮高峰
                </div>
              </div>
            )}

            {userLocation && (
              <AdvancedMarker
                position={userLocation}
                title="您的位置"
              >
                <Pin background={'#FF8C00'} glyphColor={'#FFF'} borderColor={'#FFF'}>
                  <UserIcon size={12} className="text-white" />
                </Pin>
              </AdvancedMarker>
            )}

            {STALLS.map((stall) => {
              const config = TYPE_CONFIG[stall.type as keyof typeof TYPE_CONFIG];
              const Icon = config.icon;
              
              return (
                <AdvancedMarker
                  key={stall.id}
                  position={stall.position}
                  onClick={() => setSelectedStall(stall)}
                  title={stall.name}
                >
                  <Pin 
                    background={config.color} 
                    glyphColor={'#FFF'} 
                    borderColor={'#FFFFFF'}
                    scale={selectedStall?.id === stall.id ? 1.2 : 1}
                  >
                    <Icon size={12} className="text-white" />
                  </Pin>
                </AdvancedMarker>
              );
            })}

            {selectedStall && (
              <InfoWindow
                position={selectedStall.position}
                onCloseClick={() => setSelectedStall(null)}
              >
                <div className="p-4 min-w-[220px] bg-white rounded-2xl">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-black text-lg text-on-surface">{selectedStall.name}</h3>
                    <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full">
                      <Star size={10} fill="currentColor" className="text-primary" />
                      <span className="text-[10px] font-black text-primary">{selectedStall.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-5">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-on-surface-variant uppercase tracking-widest">預計等候</span>
                      <span className="text-primary">{selectedStall.queueTime}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-on-surface-variant uppercase tracking-widest">人氣程度</span>
                      <span className="text-secondary">{selectedStall.popularity}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigateToStall(selectedStall.id)}
                    className="w-full bg-primary text-on-primary text-[10px] py-3 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                  >
                    進入店家資訊 <Store size={14} />
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </APIProvider>

        {/* Map Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-10">
          <button 
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                  setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                });
              }
            }}
            className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary border border-outline soft-shadow-lg active:scale-90 transition-transform"
          >
            <LocateFixed size={24} />
          </button>
        </div>
      </section>

      {/* Facility List */}
      <section className="space-y-4">
        {/* Toilet Card */}
        <div className="group relative bg-white rounded-3xl p-6 flex items-center justify-between overflow-hidden transition-all hover:border-primary border border-outline soft-shadow">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
              <UserIcon className="text-primary" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-on-surface mb-1 font-headline">最近化妝室</h3>
              <p className="text-on-surface-variant flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60">
                <Navigation size={14} className="text-primary" /> 距離 50m • 乾淨度 4.5
              </p>
            </div>
          </div>
          <button className="bg-primary text-on-primary px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2">
            導航 <Navigation size={16} />
          </button>
        </div>

        {/* Trash Card */}
        <div className="group relative bg-white rounded-3xl p-6 flex items-center justify-between overflow-hidden transition-all hover:border-primary border border-outline soft-shadow">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary/5 flex items-center justify-center border border-secondary/10">
              <Trash2 className="text-secondary" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-on-surface mb-1 font-headline">最近垃圾桶</h3>
              <p className="text-on-surface-variant flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60">
                <Navigation size={14} className="text-secondary" /> 距離 120m • 剩餘空間 60%
              </p>
            </div>
          </div>
          <button className="border border-secondary text-secondary px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-secondary/5 active:scale-95 transition-all flex items-center gap-2">
            導航 <Navigation size={16} />
          </button>
        </div>

        {/* Legend Bento */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-surface-container rounded-2xl p-5 border border-outline flex flex-col justify-between h-36">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center soft-shadow">
              <Info className="text-secondary" size={20} />
            </div>
            <p className="text-[10px] font-black text-on-surface-variant leading-relaxed uppercase tracking-widest opacity-70">所有化妝室皆配備<br/><span className="text-secondary">無障礙設施</span>與育嬰室</p>
          </div>
          <div className="bg-surface-container rounded-2xl p-5 border border-outline flex flex-col justify-between h-36">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center soft-shadow">
              <Car className="text-primary" size={20} />
            </div>
            <p className="text-[10px] font-black text-on-surface-variant leading-relaxed uppercase tracking-widest opacity-70">查看最近<br/><span className="text-primary">停車場</span>即時車位資訊</p>
          </div>
        </div>
      </section>
    </div>
  );
}
