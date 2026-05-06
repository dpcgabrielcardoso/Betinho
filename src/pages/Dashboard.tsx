import React from 'react';
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  AlertTriangle, 
  ChevronRight,
  Scan,
  ShieldCheck,
  Bot,
  ShoppingBag,
  Plane
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

const data = [
  { name: 'JAN', value: 3200 },
  { name: 'FEV', value: 4000 },
  { name: 'MAR', value: 4250 },
  { name: 'ABR', value: 3600 },
  { name: 'MAI', value: 4400 },
  { name: 'JUN', value: 4800 },
];

const distributionData = [
  { name: 'Alimentação', value: 1240, color: '#000000' },
  { name: 'Mercado', value: 890, color: '#006d40' },
  { name: 'Outros', value: 2120, color: '#c4c6cf' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-1">Olá, Gabriel.</h2>
          <p className="text-white/50 text-lg">Sua inteligência financeira está em dia.</p>
        </div>
        <div className="bg-emerald-500/10 text-emerald-400 px-5 py-2.5 rounded-full flex items-center gap-2 border border-emerald-500/20 font-bold text-sm backdrop-blur-md">
          <ShieldCheck size={18} className="fill-emerald-400/10" />
          <span>Protegido pelo Betinho</span>
        </div>
      </section>

      {/* Summary Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: 'Gastos do mês', 
            value: 'R$ 4.250,00', 
            trend: '+12% maior que o mês passado', 
            trendColor: 'text-pink-400',
            icon: TrendingUp
          },
          { 
            label: 'Limite mensal', 
            value: 'R$ 8.000,00', 
            progress: 53,
            icon: Wallet
          },
          { 
            label: 'Disponível', 
            value: 'R$ 3.750,00', 
            sub: 'Saldo em conta corrente',
            icon: ArrowUpRight,
            iconColor: 'text-indigo-400'
          },
          { 
            label: 'Alertas ativos', 
            value: '2', 
            alert: true,
            icon: AlertTriangle
          },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-6 glass premium-shadow flex flex-col justify-between h-full group transition-all hover:bg-white/10",
              item.alert && "bg-red-500/10 border-red-500/20"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={cn("text-[11px] font-extrabold uppercase tracking-widest", item.alert ? "text-red-400" : "text-white/40")}>
                {item.label}
              </span>
              <item.icon size={20} className={cn(item.alert ? "text-red-400" : item.iconColor || "text-white/30")} />
            </div>
            
            <div className="mb-4">
              <span className={cn("text-3xl font-black", item.alert ? "text-red-400" : "text-white")}>
                {item.value}
              </span>
            </div>

            {item.trend && (
              <div className={cn("flex items-center gap-1 text-[11px] font-bold", item.trendColor)}>
                <TrendingUp size={12} />
                <span>{item.trend}</span>
              </div>
            )}

            {item.progress !== undefined && (
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)]" style={{ width: `${item.progress}%` }}></div>
              </div>
            )}

            {item.sub && (
              <span className="text-[11px] font-bold text-white/40">{item.sub}</span>
            )}

            {item.alert && (
              <Link to="/alertas" className="text-[11px] font-bold text-red-400 flex items-center gap-1 hover:underline">
                Ver detalhes <ChevronRight size={14} />
              </Link>
            )}
          </motion.div>
        ))}
      </section>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly evolution */}
        <div className="lg:col-span-8 glass p-8 premium-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-6xl opacity-5 font-black uppercase select-none tracking-tighter">BETINHO</div>
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-xl font-bold text-white">Evolução Mensal</h3>
            <select className="bg-white/5 border border-white/10 text-white/70 text-xs font-bold rounded-lg px-3 py-2 cursor-pointer focus:ring-0 backdrop-blur-sm">
              <option>Últimos 6 meses</option>
              <option>Este ano</option>
            </select>
          </div>
          <div className="h-64 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: 'rgba(255,255,255,0.4)' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: 'rgba(255,255,255,0.4)' }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#818cf8' : 'rgba(255,255,255,0.1)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <Link to="/scanner" className="flex-1 bg-white text-slate-900 p-6 rounded-3xl shadow-xl flex items-center gap-4 transition-transform hover:-translate-y-1 active:translate-y-0 group">
            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
              <Scan size={26} />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">Scanner de Notas</p>
              <p className="text-slate-500 text-xs font-semibold">Catalogue notas e cupons com IA</p>
            </div>
          </Link>
          
          <Link to="/detector" className="flex-1 glass p-6 premium-shadow flex items-center gap-4 transition-transform hover:-translate-y-1 active:translate-y-0 group">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <AlertTriangle size={26} />
            </div>
            <div className="text-left text-white">
              <p className="font-bold text-lg">Verificar golpe</p>
              <p className="text-white/40 text-xs font-semibold">Link ou mensagem suspeita</p>
            </div>
          </Link>

          <Link to="/chat" className="flex-1 bg-emerald-500 text-white p-6 rounded-3xl shadow-lg flex items-center gap-4 transition-transform hover:-translate-y-1 active:translate-y-0 group">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot size={26} />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">Assistente Betinho</p>
              <p className="text-emerald-100 text-xs text-opacity-80 font-semibold">IA Financeira em tempo real</p>
            </div>
          </Link>
        </div>

        {/* Distribution */}
        <div className="lg:col-span-5 glass p-8 premium-shadow">
          <h3 className="text-xl font-bold mb-8 text-white">Distribuição</h3>
          <div className="flex flex-col items-center gap-8">
            <div className="h-48 w-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[
                      { color: '#818cf8' },
                      { color: '#10b981' },
                      { color: 'rgba(255,255,255,0.1)' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-extrabold text-white/40 uppercase tracking-widest">Total</span>
                <span className="text-2xl font-black text-white">100%</span>
              </div>
            </div>

            <div className="w-full space-y-3">
              {[
                { name: 'Alimentação', value: 1240, color: '#818cf8' },
                { name: 'Mercado', value: 890, color: '#10b981' },
                { name: 'Outros', value: 2120, color: 'rgba(255,255,255,0.1)' }
              ].map((item) => (
                <div key={item.name} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-bold text-white/60">{item.name}</span>
                  </div>
                  <span className="font-extrabold text-white">R$ {item.value.toLocaleString('pt-BR')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Spendings */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass p-8 premium-shadow">
            <h3 className="text-xl font-bold mb-6 text-white">Gastos Recentes</h3>
            <div className="space-y-1">
              {[
                { name: 'Apple Store São Paulo', date: '12 Mar, 2024', category: 'Eletrônicos', amount: 'R$ 849,00', icon: ShoppingBag },
                { name: 'Latam Airlines', date: '10 Mar, 2024', category: 'Viagem', amount: 'R$ 1.120,00', icon: Plane },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors group cursor-pointer border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 glass-card flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">{item.name}</p>
                      <p className="text-[11px] text-white/40 font-bold">{item.date} • {item.category}</p>
                    </div>
                  </div>
                  <span className="font-black text-white">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-6 premium-shadow">
            <h4 className="text-[11px] font-extrabold text-white/30 uppercase tracking-widest mb-4">Categorias com Atenção</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                <span className="text-[11px] font-bold text-pink-400">Lazer: +15% acima da meta</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <span className="text-[11px] font-bold text-white/50">4 Assinaturas recorrentes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
