import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Ranking from './components/Ranking';
import Map from './components/Map';
import Orders from './components/Orders';
import Profile from './components/Profile';
import StallDetail from './components/StallDetail';
import RoutePlanning from './components/RoutePlanning';
import EventHub from './components/EventHub';
import { View } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedStallId, setSelectedStallId] = useState<string | null>(null);

  const handleNavigateToStall = (id: string) => {
    setSelectedStallId(id);
    setCurrentView('stall-detail');
  };

  const handleBack = () => {
    if (currentView === 'stall-detail') {
      setCurrentView('home');
    } else if (currentView === 'route-planning') {
      setCurrentView('map');
    } else if (currentView === 'event-hub') {
      setCurrentView('home');
    } else {
      setCurrentView('home');
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'home': return '台中夜市GO';
      case 'ranking': return '熱門排行';
      case 'map': return '設施地圖';
      case 'orders': return '我的訂單';
      case 'profile': return '個人中心';
      case 'stall-detail': return '攤位詳情';
      case 'route-planning': return 'AI 智慧路徑';
      case 'event-hub': return '限時活動專區';
      default: return '台中夜市GO';
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home 
            onNavigateToStall={handleNavigateToStall} 
            onNavigateToRoute={() => setCurrentView('route-planning')}
            onNavigateToMap={() => setCurrentView('map')}
            onNavigateToRanking={() => setCurrentView('ranking')}
            onNavigateToEvents={() => setCurrentView('event-hub')}
          />
        );
      case 'ranking':
        return <Ranking onNavigateToStall={handleNavigateToStall} />;
      case 'map':
        return <Map onNavigateToStall={handleNavigateToStall} />;
      case 'orders':
        return <Orders />;
      case 'profile':
        return <Profile onNavigateToStall={handleNavigateToStall} />;
      case 'stall-detail':
        return (
          <StallDetail 
            stallId={selectedStallId || '1'} 
            onOrderNow={() => setCurrentView('orders')}
          />
        );
      case 'route-planning':
        return <RoutePlanning onBack={handleBack} />;
      case 'event-hub':
        return (
          <EventHub 
            onBack={handleBack} 
            onNavigateToStall={handleNavigateToStall}
            onNavigateToMap={() => setCurrentView('map')}
          />
        );
      default:
        return (
          <Home 
            onNavigateToStall={handleNavigateToStall} 
            onNavigateToRoute={() => setCurrentView('route-planning')} 
            onNavigateToMap={() => setCurrentView('map')} 
            onNavigateToRanking={() => setCurrentView('ranking')} 
            onNavigateToEvents={() => setCurrentView('event-hub')} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body selection:bg-primary/30">
      <TopNav 
        title={getTitle()} 
        showBack={currentView === 'stall-detail' || currentView === 'route-planning' || currentView === 'event-hub'}
        onBack={handleBack}
        showFavorite={currentView === 'stall-detail'}
        isFavorite={false}
      />
      
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentView !== 'route-planning' && (
        <BottomNav currentView={currentView} onViewChange={setCurrentView} />
      )}
    </div>
  );
}
