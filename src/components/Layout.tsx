import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShieldAlert, 
  MessageSquare, 
  Camera, 
  TrendingUp,
  Settings, 
  Bell,
  Menu,
  X,
  CreditCard,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Camera, label: 'Scanner IA', path: '/scanner' },
  { icon: TrendingUp, label: 'Créditos', path: '/credits' },
  { icon: ShieldAlert, label: 'Detector de Golpes', path: '/detector' },
  { icon: MessageSquare, label: 'Consultor IA', path: '/chat' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans relative">
      <div className="mesh-bg"></div>
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 h-[calc(100vh-2rem)] sticky top-4 m-4 glass py-8 px-6 overflow-hidden">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
            <CreditCard size={24} />
          </div>
          <span className="text-2xl font-extrabold tracking-tighter text-white">Betinho</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-4 p-4 rounded-xl font-bold transition-all group",
                isActive 
                  ? "bg-white/10 text-white shadow-xl" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={22} className={cn("transition-transform group-hover:scale-110", isActive ? "text-indigo-400" : "")} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-4 glass-card flex items-center gap-3 border border-white/10">
          <div className="w-11 h-11 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white border-2 border-white/20 shadow-sm overflow-hidden">
             <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-sm truncate text-white">Gabriel Barroso</p>
            <p className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest">Premium Betinho</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-4 z-40 m-4 mb-0 glass h-20 flex items-center justify-between px-6">
          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
              <CreditCard size={18} />
            </div>
            <span className="text-xl font-extrabold tracking-tighter text-white">Betinho</span>
          </div>

          <div className="hidden md:block">
             <h1 className="text-xl font-bold text-white">
               {navItems.find(item => item.path === location.pathname)?.label || 'Bem-vindo'}
             </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative text-white/70">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-deep-navy"></span>
            </button>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/70">
              <Settings size={22} />
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 max-w-7xl mx-auto w-full pb-28 md:pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 glass-card rounded-t-3xl rounded-b-none border-x-0 border-b-0 backdrop-blur-xl flex justify-around items-center px-4 z-50 shadow-2xl">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center gap-1 transition-all",
              isActive ? "text-white" : "text-white/40"
            )}
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "p-2 rounded-xl transition-all",
                  isActive && "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 -mt-8"
                )}>
                  <item.icon size={isActive ? 24 : 22} />
                </div>
                {!isActive && (
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
        <NavLink
            to="/profile"
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center gap-1 transition-all",
              isActive ? "text-white" : "text-white/40"
            )}
          >
            <User size={22} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Perfil</span>
          </NavLink>
      </nav>
    </div>
  );
}
