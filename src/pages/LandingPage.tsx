import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Bot, 
  BarChart3, 
  Zap, 
  Lock, 
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  Receipt,
  UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function LandingPage() {
  return (
    <div className="bg-deep-navy -m-6 min-h-screen overflow-x-hidden relative">
      <div className="mesh-bg"></div>
      
      {/* Header Landing */}
      <header className="fixed top-0 z-50 w-full glass-card rounded-none border-t-0 border-x-0 backdrop-blur-md h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
              <Zap size={18} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">Betinho</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-sm font-bold border-b-2 border-indigo-400 text-white">Início</a>
            <a href="#" className="text-sm font-bold text-white/50 hover:text-white">Soluções</a>
            <a href="#" className="text-sm font-bold text-white/50 hover:text-white">Tecnologia</a>
          </nav>
          <div className="flex gap-4">
             <button className="text-sm font-black text-white px-4 py-2 rounded-lg hover:bg-white/5">Login</button>
             <Link to="/" className="bg-white text-slate-900 px-5 py-2 rounded-lg text-sm font-black shadow-lg">Abrir Conta</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 backdrop-blur-md">
            <Zap size={12} className="fill-indigo-400" />
            Fintech de Próxima Geração
          </div>
          <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tight">
            Betinho: Inteligência que <span className="text-indigo-400 underline decoration-4 underline-offset-8">valoriza seu dinheiro.</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-lg font-medium">
            A plataforma definitiva para organizar faturas, evitar fraudes e investir com a segurança de uma IA de elite. O futuro da sua vida financeira começa aqui.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/" className="bg-white text-slate-900 px-8 py-5 rounded-2xl font-black text-lg flex items-center gap-2 shadow-2xl transition-transform hover:-translate-y-1 active:scale-95">
               Começar agora <TrendingUp size={20} />
            </Link>
            <Link to="/detector" className="glass px-8 py-5 rounded-2xl font-black text-lg text-white flex items-center gap-2 border-white/10 hover:border-white/30 transition-all active:scale-95">
               Verificar Fraude <ShieldCheck size={20} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="bg-white/10 backdrop-blur-2xl p-4 rounded-[42px] border border-white/10 shadow-2xl relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" 
              alt="Betinho App" 
              className="rounded-[32px] w-full"
            />
          </div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-pink-500/20 blur-[120px] rounded-full"></div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
           <h2 className="text-4xl font-black tracking-tight text-white">Gestão financeira sem fricção</h2>
           <p className="text-white/50 max-w-2xl mx-auto font-medium">Utilizamos algoritmos proprietários para transformar dados complexos em decisões lucrativas e seguras.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { icon: BarChart3, title: 'Análise Preditiva', desc: 'Antecipe gastos e identifique padrões de consumo com nossa IA treinada em milhões de transações.', color: 'bg-indigo-500/20 text-indigo-400' },
             { icon: Lock, title: 'Blindagem Digital', desc: 'Proteção ativa contra links maliciosos, boletos adulterados e engenharia social em tempo real.', color: 'bg-pink-500/20 text-pink-400' },
             { icon: Receipt, title: 'Fluxo Automatizado', desc: 'Importação e categorização automática de todos os seus comprovantes e notas fiscais via nuvem.', color: 'bg-white/5 text-white/70' },
           ].map((item, idx) => (
             <div key={idx} className="glass p-8 premium-shadow border border-white/5 hover:border-white/20 transition-all group">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg", item.color)}>
                   <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white">{item.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">{item.desc}</p>
             </div>
           ))}

           <div className="md:col-span-3 glass rounded-[48px] p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative border border-white/10 shadow-2xl">
              <div className="flex-1 space-y-6 z-10">
                <span className="bg-white/10 text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">Exclusivo Betinho</span>
                <h3 className="text-5xl font-black leading-tight text-white">Copiloto Financeiro IA</h3>
                <p className="text-white/50 text-lg leading-relaxed">Converse com seu dinheiro. Peça orçamentos, simule investimentos ou descubra como economizar 20% no próximo mês com uma IA que entende seu perfil.</p>
                <Link to="/chat" className="bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-lg inline-flex items-center gap-2 hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20">
                   Ativar Copiloto <Bot size={22} />
                </Link>
              </div>
              <div className="flex-1 z-10 w-full">
                 <div className="bg-slate-900/50 backdrop-blur-md rounded-[32px] p-2 border border-white/10 shadow-2xl translate-y-6">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
                      className="rounded-[28px] w-full" 
                      alt="Chart AI" 
                    />
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent"></div>
           </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 glass rounded-none border-x-0 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 text-center space-y-20 relative z-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tight text-white">Experiência simplificada em 3 etapas</h2>
              <div className="w-16 h-1.5 bg-indigo-500 mx-auto rounded-full shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { step: '01', title: 'Conecte seus Dados', desc: 'Integração segura com bancos e upload instantâneo de arquivos digitais.' },
                 { step: '02', title: 'Processamento IA', desc: 'Nossa rede neural analisa cada detalhe em busca de inconsistências e oportunidades.' },
                 { step: '03', title: 'Domine suas Finanças', desc: 'Receba insights acionáveis e visualize seu patrimônio crescer com clareza total.' },
               ].map((item, idx) => (
                 <div key={idx} className="relative space-y-6 group px-4">
                    <div className="w-20 h-20 glass-card rounded-full flex items-center justify-center mx-auto text-3xl font-black text-white group-hover:bg-indigo-500/20 group-hover:border-indigo-500 transition-all duration-500 shadow-xl">
                      {item.step}
                    </div>
                    <h4 className="text-xl font-bold text-white">{item.title}</h4>
                    <p className="text-white/40 font-medium">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full -z-10"></div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
         <div className="max-w-5xl mx-auto glass p-16 text-center relative overflow-hidden shadow-2xl border-white/10 rounded-[56px]">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/20 blur-[120px] rounded-full"></div>
            <div className="relative z-10 space-y-8">
               <h2 className="text-5xl font-black text-white tracking-tight">Otimize seu capital com Betinho.</h2>
               <p className="text-white/50 text-xl max-w-2xl mx-auto font-medium leading-relaxed">Junte-se a elite financeira que utiliza tecnologia de ponta para gestão e proteção patrimonial.</p>
               <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                  <Link to="/" className="bg-white text-slate-900 px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-indigo-500/20">
                     Criar Conta Gratuita
                  </Link>
                  <button className="glass-card text-white border border-white/20 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/20 transition-all backdrop-blur-md">
                     Agendar Demonstração
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 glass rounded-none border-b-0 border-x-0">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Zap size={22} className="text-indigo-400" />
              <span className="text-xl font-black uppercase tracking-tighter text-white">BETINHO</span>
            </div>
            <p className="text-white/30 font-bold text-sm">© 2024 Betinho Finance. Inteligência para seu patrimônio.</p>
            <div className="flex gap-8">
               <a href="#" className="text-white/30 hover:text-white font-bold text-sm transition-colors">Privacidade</a>
               <a href="#" className="text-white/30 hover:text-white font-bold text-sm transition-colors">Segurança</a>
               <a href="#" className="text-white/30 hover:text-white font-bold text-sm transition-colors">Termos</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
