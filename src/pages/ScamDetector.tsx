import React from 'react';
import { 
  ShieldAlert, 
  Upload, 
  Link as LinkIcon, 
  QrCode, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCcw,
  Flag,
  Timer,
  Zap,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function ScamDetector() {
  const [analyzing, setAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState<boolean | null>(null);
  const [content, setContent] = React.useState("Invista R$ 500 e receba R$ 2000 em apenas 24h via Pix direto na sua conta. Sem taxas extras, lucro garantido e imediato. Restam poucas vagas para esse grupo VIP.");

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 2000);
  };

  const reset = () => {
    setResult(null);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Input */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass p-8 premium-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-4xl opacity-5 font-black uppercase select-none tracking-tighter">SECURE</div>
            <h2 className="text-2xl font-extrabold mb-2 text-white relative z-10">Análise de Segurança</h2>
            <p className="text-white/50 mb-8 relative z-10">Cole mensagens suspeitas ou links para verificação instantânea.</p>

            <div className="space-y-6 relative z-10">
              <div>
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[2px] block mb-3">CONTEÚDO DO INCIDENTE</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-400 focus:bg-white/10 rounded-2xl p-4 text-sm font-medium transition-all resize-none focus:ring-0 min-h-[160px] text-white placeholder:text-white/20"
                  placeholder="Cole aqui a mensagem ou link suspeito..."
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Upload, label: 'Print' },
                  { icon: LinkIcon, label: 'URL' },
                  { icon: QrCode, label: 'Pix/Cód' },
                ].map((item) => (
                  <button key={item.label} className="flex flex-col items-center justify-center p-4 border border-white/5 rounded-2xl hover:border-white/20 hover:bg-white/5 transition-all group">
                    <item.icon size={20} className="mb-2 text-white/30 group-hover:text-white transition-colors" />
                    <span className="text-[11px] font-bold text-white/40 group-hover:text-white">{item.label}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full py-5 bg-indigo-500 text-white font-black text-lg rounded-2xl hover:bg-indigo-400 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 disabled:opacity-50"
              >
                {analyzing ? (
                  <>
                    <RefreshCcw size={22} className="animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <ShieldAlert size={22} />
                    Analisar Risco agora
                  </>
                )
              }
              </button>
            </div>
          </div>

          <div className="glass p-8 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Escudo Betinho</h3>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">Sua conta está sendo protegida em tempo real por nossa IA antifraude.</p>
              <div className="flex items-center gap-2 text-indigo-400">
                <CheckCircle2 size={20} />
                <span className="text-[11px] font-black uppercase tracking-widest">Monitoramento Ativo</span>
              </div>
            </div>
            <Lock size={160} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="bg-white/5 border-2 border-dashed border-white/10 rounded-[40px] h-[600px] flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-20 h-20 glass-card flex items-center justify-center text-white/20 mb-6 shadow-sm">
                  <ShieldAlert size={40} />
                </div>
                <h3 className="text-xl font-bold text-white/40 mb-2">Aguardando análise</h3>
                <p className="text-white/30 max-w-xs">Insira os dados à esquerda para que o Betinho possa verificar a segurança.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="glass premium-shadow overflow-hidden"
              >
                {/* Gauge Section */}
                <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-10 border-b border-white/5">
                   <div className="relative w-48 h-48 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="96" cy="96" r="88" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                        <circle 
                          cx="96" cy="96" r="88" fill="transparent" stroke="#f43f5e" strokeWidth="12" 
                          strokeDasharray={2 * Math.PI * 88}
                          strokeDashoffset={2 * Math.PI * 88 * (1 - 0.98)}
                          strokeLinecap="round"
                          className="drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-rose-500">98<span className="text-xl">%</span></span>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter">Risco</span>
                      </div>
                   </div>
                   <div className="flex-1 text-center md:text-left text-white">
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-full text-[11px] font-black uppercase tracking-widest mb-4">
                       <AlertTriangle size={14} className="fill-rose-400/20" />
                       Alto Risco Detectado
                     </div>
                     <h2 className="text-3xl font-black mb-3">Fraude de Investimento</h2>
                     <p className="text-white/60 font-medium leading-relaxed">Identificamos padrões de crimes cibernéticos comuns em pirâmides financeiras e golpes de retorno rápido.</p>
                   </div>
                </div>

                <div className="p-8 space-y-10">
                  {/* Evidence Chips */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[2px] flex items-center gap-2">
                       <Flag size={14} className="text-indigo-400" />
                       Evidências de Fraude
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { icon: Timer, label: 'Urgência Artificial' },
                        { icon: Zap, label: 'Lucro Irreal' },
                        { icon: TrendingDown, label: 'Pix Antecipado' },
                      ].map((chip) => (
                        <div key={chip.label} className="glass-card p-4 flex items-center gap-3">
                          <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400 shadow-sm border border-rose-500/10">
                             <chip.icon size={18} />
                          </div>
                          <span className="text-xs font-bold text-white/70">{chip.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation Box */}
                  <div className="bg-indigo-500/10 rounded-[32px] border border-indigo-500/20 p-8 space-y-8">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                          <CheckCircle2 size={28} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">Protocolo de Segurança</h4>
                          <p className="text-indigo-400/60 text-xs font-bold">Siga estes passos para sua proteção</p>
                        </div>
                     </div>

                     <div className="space-y-6">
                        {[
                          { step: 1, title: 'Não transfira nenhum valor', desc: 'Promessas de retorno de 400% em 24h são fraudulentas. Instituições sérias não operam desta forma.' },
                          { step: 2, title: 'Bloqueie o remetente', desc: 'O uso de escassez ("últimas vagas") é técnica de engenharia social para impedir o raciocínio lógico.' },
                          { step: 3, title: 'Denúncia Integrada', desc: 'Clique no botão abaixo para que o Betinho notifique o Banco Central sobre esta tentativa de fraude.' },
                        ].map((item) => (
                          <div key={item.step} className="flex gap-4">
                            <div className={cn(
                              "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black",
                              item.step === 3 ? "bg-indigo-500/20 text-indigo-400" : "bg-rose-500/20 text-rose-400"
                            )}>
                              {item.step}
                            </div>
                            <div>
                               <p className="font-bold text-white mb-1">{item.title}</p>
                               <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 py-4 border border-rose-500/30 text-rose-400 font-bold rounded-2xl hover:bg-rose-500/10 transition-all flex items-center justify-center gap-2">
                       <Flag size={18} />
                       Reportar Crime
                    </button>
                    <button 
                      onClick={reset}
                      className="flex-1 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                    >
                       <RefreshCcw size={18} />
                       Nova Consulta
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
