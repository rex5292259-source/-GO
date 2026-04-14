import React, { useState } from 'react';
import { Clock, Bell, Wallet, CreditCard, Banknote, QrCode, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type OrderStatus = 'payment' | 'confirmed';

export default function Orders() {
  const [status, setStatus] = useState<OrderStatus>('payment');
  const [paymentMethod, setPaymentMethod] = useState<string>('wallet');

  const paymentMethods = [
    { id: 'wallet', name: '電子錢包', icon: Wallet },
    { id: 'credit', name: '信用卡', icon: CreditCard },
    { id: 'cash', name: '現金支付', icon: Banknote },
    { id: 'qr', name: '掃碼支付', icon: QrCode },
  ];

  const cartItems = [
    {
      name: '酥炸大魷魚',
      option: '大份 / 辣味',
      price: 120,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=500' // Better squid/fried food image
    },
    {
      name: '木瓜牛奶',
      option: '去冰 / 微糖',
      price: 65,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=500' // Better drink image
    }
  ];

  const handleConfirmOrder = () => {
    setStatus('confirmed');
  };

  return (
    <div className="px-6 pb-32 space-y-10 bg-background min-h-screen pt-6">
      <AnimatePresence mode="wait">
        {status === 'confirmed' && (
          <motion.section 
            key="queue"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="relative overflow-hidden rounded-[2rem] bg-white p-10 text-center border border-outline soft-shadow-lg"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-[60px]"></div>
            <p className="text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4 opacity-70">當前叫號 Current No.</p>
            <h2 className="text-8xl font-black text-on-surface font-headline tracking-tighter mb-6">105</h2>
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-surface-container rounded-full border border-outline">
              <Clock className="text-primary" size={16} />
              <span className="text-on-surface font-black text-[10px] tracking-widest uppercase">預計等候：15 MIN</span>
            </div>
            <div className="mt-8 flex items-start gap-4 text-left bg-surface-container p-5 rounded-2xl border border-outline">
              <Bell className="text-primary shrink-0" size={24} />
              <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest leading-relaxed opacity-60">餐點準備完成後，您將收到即時推播通知。請於通知後 5 分鐘內前往攤位取餐。</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Cart Summary - Always visible or only after confirmation? 
          User said: "之後訂單頁面才會顯示訂單內容、之前選擇的支付方式、等待時間"
          This implies in 'payment' mode we might only show payment selection and total.
          But usually you want to see what you are paying for.
          I'll keep it visible but style it differently if needed.
      */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-headline text-2xl font-black text-on-surface">
            {status === 'confirmed' ? '訂單詳情' : '確認訂單內容'}
          </h3>
          <span className="text-primary text-[10px] font-black tracking-widest uppercase opacity-60">Order Details</span>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-5 p-5 rounded-3xl bg-white border border-outline soft-shadow">
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-outline">
                <img className="w-full h-full object-cover" src={item.image} referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow">
                <h4 className="font-headline font-black text-lg text-on-surface">{item.name}</h4>
                <p className="text-on-surface-variant text-[10px] font-black tracking-widest uppercase opacity-60">{item.option}</p>
              </div>
              <div className="text-right">
                <p className="font-headline font-black text-primary text-xl">${item.price}</p>
                <p className="text-on-surface-variant text-[10px] font-black opacity-40">x {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {status === 'confirmed' && (
          <div className="bg-surface-container p-6 rounded-3xl border border-outline space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">支付方式</span>
              <div className="flex items-center gap-2 text-primary">
                {React.createElement(paymentMethods.find(m => m.id === paymentMethod)?.icon || Wallet, { size: 16 })}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {paymentMethods.find(m => m.id === paymentMethod)?.name}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">訂單編號</span>
              <span className="text-[10px] font-black text-on-surface uppercase tracking-widest">#TW-20240414-105</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">下單時間</span>
              <span className="text-[10px] font-black text-on-surface uppercase tracking-widest">10:24 AM</span>
            </div>
          </div>
        )}
      </section>

      {/* Payment Selection - Only visible during checkout */}
      <AnimatePresence>
        {status === 'payment' && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6 overflow-hidden"
          >
            <div className="flex items-center justify-between px-2">
              <h3 className="font-headline text-2xl font-black text-on-surface">選擇支付方式</h3>
              <span className="text-primary text-[10px] font-black tracking-widest uppercase opacity-60">Payment</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <button 
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center justify-center p-6 rounded-3xl transition-all soft-shadow border-2 ${
                    paymentMethod === method.id 
                      ? 'bg-primary/5 border-primary text-primary' 
                      : 'bg-white border-outline text-on-surface-variant hover:border-primary/50'
                  }`}
                >
                  <method.icon className="mb-3" size={36} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{method.name}</span>
                </button>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Total and CTA */}
      <section className="pt-8 border-t border-outline space-y-8">
        <div className="flex justify-between items-end px-2">
          <div>
            <p className="text-on-surface-variant text-[10px] font-black tracking-widest uppercase opacity-60">
              {status === 'confirmed' ? '實付金額' : '應付總計'} TOTAL
            </p>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">含 5% 智慧服務費</p>
          </div>
          <p className="text-5xl font-headline font-black text-on-surface tracking-tighter">$185</p>
        </div>
        
        {status === 'payment' ? (
          <button 
            onClick={handleConfirmOrder}
            className="w-full h-16 rounded-2xl bg-primary text-on-primary font-headline font-black text-lg soft-shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-3"
          >
            確認下單並領取號碼牌
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3 py-4 bg-secondary/10 text-secondary rounded-2xl border border-secondary/20">
            <CheckCircle2 size={20} />
            <span className="font-black text-xs uppercase tracking-widest">訂單已確認，請留意推播通知</span>
          </div>
        )}
      </section>
    </div>
  );
}
