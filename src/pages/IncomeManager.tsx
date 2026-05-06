import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  ArrowUpCircle, 
  Calendar, 
  Repeat, 
  Trash2, 
  Wallet,
  TrendingUp,
  Briefcase,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Income } from '../types';

export default function IncomeManager() {
  const [incomes, setIncomes] = useState<Income[]>([
    { id: '1', source: 'Salário Mensal', amount: 8500, date: '2024-06-05', isRecurring: true, category: 'salary' },
    { id: '2', source: 'Projeto Freelance', amount: 2400, date: '2024-06-12', isRecurring: false, category: 'freelance' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newIncome, setNewIncome] = useState({
    source: '',
    amount: '',
    category: 'salary',
    isRecurring: false,
    date: new Date().toISOString().split('T')[0]
  });

  const handleAdd = () => {
    if (!newIncome.source || !newIncome.amount) return;
    
    const income: Income = {
      id: Math.random().toString(36).substr(2, 9),
      source: newIncome.source,
      amount: parseFloat(newIncome.amount),
      category: newIncome.category as any,
      isRecurring: newIncome.isRecurring,
      date: newIncome.date
    };

    setIncomes([income, ...incomes]);
    setIsAdding(false);
    setNewIncome({
      source: '',
      amount: '',
      category: 'salary',
      isRecurring: false,
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deleteIncome = (id: string) => {
    setIncomes(incomes.filter(i => i.id !== id));
  };

  const totalMonthly = incomes.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Gestão de Créditos</h1>
          <p className="text-white/50 font-medium">Controle seus ganhos manuais e recebíveis mensais.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-500 text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={20} /> Novo Recebimento
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 text-indigo-500/10 group-hover:scale-110 transition-transform">
            <ArrowUpCircle size={64} />
          </div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Total Estimado (Mês)</p>
          <h3 className="text-4xl font-black text-white">R$ {totalMonthly.toLocaleString('pt-BR')}</h3>
          <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <TrendingUp size={14} /> +12% em relação ao mês anterior
          </div>
        </div>

        <div className="glass p-8 relative overflow-hidden border-white/5 bg-indigo-500/5">
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Recebíveis Recorrentes</p>
          <h3 className="text-3xl font-black text-white">
            {incomes.filter(i => i.isRecurring).length} <span className="text-lg opacity-40 font-bold">itens</span>
          </h3>
          <p className="text-white/30 text-[11px] mt-2">Garantidos todo dia 05 e 10</p>
        </div>

        <div className="glass p-8 relative overflow-hidden border-white/5 bg-pink-500/5">
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Dica do Betinho</p>
          <p className="text-white/70 text-xs font-medium leading-relaxed italic">
            "Sempre reserve pelo menos 15% dos ganhos variáveis para sua reserva de emergência."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Income List */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-xl font-black text-white px-2">Histórico de Entradas</h2>
          <div className="space-y-3">
            {incomes.map((income) => (
              <motion.div 
                layout
                key={income.id}
                className="glass-card p-5 group hover:border-white/20 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    income.category === 'salary' ? "bg-indigo-500/20 text-indigo-400" :
                    income.category === 'freelance' ? "bg-emerald-500/20 text-emerald-400" :
                    "bg-pink-500/20 text-pink-400"
                  )}>
                    {income.category === 'salary' ? <Briefcase size={22} /> : 
                     income.category === 'freelance' ? <Sparkles size={22} /> : <Layers size={22} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{income.source}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-white/30 flex items-center gap-1 font-bold">
                        <Calendar size={12} /> {new Date(income.date).toLocaleDateString('pt-BR')}
                      </span>
                      {income.isRecurring && (
                        <span className="text-[10px] text-indigo-400 flex items-center gap-1 font-black uppercase tracking-wider">
                          <Repeat size={12} /> Mensal
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-lg font-black text-white">R$ {income.amount.toLocaleString('pt-BR')}</span>
                  <button 
                    onClick={() => deleteIncome(income.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-500/10 text-rose-500 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories / Side Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-8">
            <h3 className="text-xl font-bold text-white mb-6">Por Categoria</h3>
            <div className="space-y-6">
              {[
                { label: 'Salário Fixos', icon: Briefcase, color: 'bg-indigo-500', percent: 75 },
                { label: 'Freelance & Extra', icon: Sparkles, color: 'bg-emerald-400', percent: 20 },
                { label: 'Investimentos', icon: TrendingUp, color: 'bg-pink-400', percent: 5 },
              ].map((cat) => (
                <div key={cat.label}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 text-white/60 text-xs font-bold">
                       <cat.icon size={14} /> {cat.label}
                    </div>
                    <span className="text-white text-xs font-black">{cat.percent}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", cat.color)} style={{ width: `${cat.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal Overlay */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass p-8 max-w-lg w-full relative z-10 border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-white">Registrar Entrada</h3>
                <button onClick={() => setIsAdding(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] block mb-3">FONTE DO RECURSO</label>
                  <input 
                    type="text"
                    value={newIncome.source}
                    onChange={(e) => setNewIncome({...newIncome, source: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-400 focus:bg-white/10 rounded-2xl p-4 text-sm font-medium transition-all text-white placeholder:text-white/20"
                    placeholder="Ex: Salário, Venda de Produto..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] block mb-3">VALOR</label>
                    <input 
                      type="number"
                      value={newIncome.amount}
                      onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-indigo-400 focus:bg-white/10 rounded-2xl p-4 text-sm font-medium transition-all text-white placeholder:text-white/20"
                      placeholder="0,00"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] block mb-3">DATA</label>
                    <input 
                      type="date"
                      value={newIncome.date}
                      onChange={(e) => setNewIncome({...newIncome, date: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 focus:border-indigo-400 focus:bg-white/10 rounded-2xl p-4 text-sm font-medium transition-all text-white accent-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] block mb-3">CATEGORIA</label>
                  <select 
                    value={newIncome.category}
                    onChange={(e) => setNewIncome({...newIncome, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-400 focus:bg-white/10 rounded-2xl p-4 text-sm font-medium transition-all text-white appearance-none"
                  >
                    <option value="salary">Salário Fixo</option>
                    <option value="freelance">Freelance / Extra</option>
                    <option value="investment">Investimento</option>
                    <option value="other">Outros</option>
                  </select>
                </div>

                <div 
                  onClick={() => setNewIncome({...newIncome, isRecurring: !newIncome.isRecurring})}
                  className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                      newIncome.isRecurring ? "bg-indigo-500 text-white" : "bg-white/5 text-white/20"
                    )}>
                      <Repeat size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Recebimento Mensal</p>
                      <p className="text-[11px] text-white/30">Repetir automaticamente todo mês</p>
                    </div>
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center",
                    newIncome.isRecurring ? "border-indigo-500 bg-indigo-500" : "border-white/10"
                  )}>
                    {newIncome.isRecurring && <Check size={14} className="text-white" />}
                  </div>
                </div>

                <button 
                  onClick={handleAdd}
                  className="w-full py-5 bg-indigo-500 text-white font-black text-lg rounded-2xl hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/20"
                >
                  Confirmar Registro
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

function Check({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
