import React from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Lightbulb, 
  ShieldCheck, 
  Receipt,
  Search,
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Message } from '@/src/types';

export default function Assistant() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Gabriel, analisei seus movimentos recentes. Notei que suas assinaturas subiram 15% este mês. Algumas delas você quase não usa. Quer dar uma olhadinha e economizar uma grana?',
      timestamp: '10:42'
    },
    {
      id: '2',
      role: 'user',
      content: 'Com certeza, Betinho! Mostra aí onde estou gastando mais com isso.',
      timestamp: '10:43'
    },
    {
      id: '3',
      role: 'assistant',
      content: 'Aqui está sua fatura detalhada de assinaturas programadas:',
      timestamp: '10:44',
      data: {
        type: 'receipt',
        title: 'Extrato de Assinaturas (Junho)',
        items: [
          { name: 'Streaming & Lazer', amount: 145.90, progress: 70, color: 'bg-emerald-500' },
          { name: 'Produtividade', amount: 89.00, progress: 40, color: 'bg-indigo-400' }
        ],
        tip: 'Sacada do Betinho: Notei que você não acessa o "MegaStream" há 60 dias. Cancelando ele, você economiza R$ 39,90 todo mês!'
      }
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    
    // Simulate thinking
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Entendido! Estou processando as informações dos seus últimos extratos.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] md:h-[calc(100vh-120px)] max-w-4xl mx-auto w-full">
      {/* Intro Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center mt-4 mb-10"
      >
        <div className="w-20 h-20 bg-indigo-500 text-white rounded-[28px] flex items-center justify-center mb-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300 shadow-indigo-500/20">
           <Bot size={40} />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Olá, eu sou o Betinho!</h1>
        <p className="text-white/50 max-w-lg font-medium">Sou seu assistente financeiro pessoal. Estou aqui para cuidar do seu bolso com inteligência e segurança.</p>
      </motion.div>

      {/* Quick Actions */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {[
          'Meus gastos do mês',
          'Dicas de economia',
          'Alertas de segurança',
          'Investimentos'
        ].map((action) => (
          <button 
            key={action}
            className="px-5 py-2.5 glass-card border border-white/10 hover:border-white/30 text-white/70 font-bold text-xs transition-all premium-shadow hover:shadow-lg active:scale-95"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-8 px-2 pb-32">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, x: msg.role === 'assistant' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "flex items-start gap-4 max-w-[90%] md:max-w-[85%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg",
              msg.role === 'assistant' ? "bg-indigo-500 text-white shadow-indigo-500/20" : "bg-white/10 border-white/20 border-2"
            )}>
              {msg.role === 'assistant' ? <Bot size={20} /> : <div className="w-full h-full rounded-2xl overflow-hidden"><img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80" alt="Me" /></div>}
            </div>

            <div className="space-y-4 w-full">
              <div className={cn(
                "p-5 rounded-3xl shadow-sm",
                msg.role === 'assistant' 
                  ? "glass border border-white/10 text-white rounded-tl-none" 
                  : "bg-white text-slate-900 rounded-tr-none shadow-xl"
              )}>
                <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                <span className={cn(
                  "text-[10px] mt-3 block font-bold",
                  msg.role === 'assistant' ? "text-white/30" : "text-slate-400"
                )}>{msg.timestamp}</span>
              </div>

              {msg.data?.type === 'receipt' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass p-6 border border-white/10 shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                       <Receipt size={20} />
                    </div>
                    <h4 className="font-bold text-white">{msg.data.title}</h4>
                  </div>

                  <div className="space-y-6 text-white">
                    {msg.data.items.map((item: any) => (
                      <div key={item.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-white/60">{item.name}</span>
                          <span className="font-black text-white">R$ {item.amount.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full shadow-[0_0_8px_rgba(129,140,248,0.5)]", item.color)} style={{ width: `${item.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-emerald-400 shadow-sm">
                      <Lightbulb size={18} />
                    </div>
                     <p className="text-xs text-emerald-100 leading-relaxed">
                        <span className="font-black block mb-1">Sacada do Betinho</span>
                        {msg.data.tip.split('Sacada do Betinho:')[1]}
                     </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-4 left-0 right-0 px-2 py-4 mt-auto">
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors">
              <Search size={20} />
            </div>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full pl-16 pr-20 py-5 glass border border-white/10 rounded-[28px] shadow-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm font-medium placeholder:text-white/20 text-white"
              placeholder="Pergunte qualquer coisa ao Betinho..."
              type="text"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white text-slate-900 w-12 h-12 rounded-[20px] hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
