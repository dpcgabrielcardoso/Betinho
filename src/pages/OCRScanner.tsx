import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Upload, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  X, 
  TrendingUp, 
  Calendar, 
  MapPin,
  RefreshCcw,
  Zap,
  Receipt
} from 'lucide-react';
import { cn } from '../lib/utils';
import { analyzeReceipt } from '../services/ocrService';
import { ReceiptData } from '../types';

export default function OCRScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ReceiptData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = (event.target?.result as string).split(',')[1];
      setImage(event.target?.result as string);
      processImage(base64, file.type);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (base64: string, mimeType: string) => {
    setAnalyzing(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeReceipt(base64, mimeType);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Não conseguimos ler esta nota. Tente uma foto mais nítida.");
    } finally {
      setAnalyzing(false);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Scanner de Notas</h1>
          <p className="text-white/50 font-medium">Capture e catalogue seus gastos instantaneamente com IA.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Input */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass p-8 premium-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-4xl opacity-5 font-black uppercase select-none tracking-tighter">SCAN</div>
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
              capture="environment"
            />

            {!image ? (
              <div 
                onClick={triggerUpload}
                className="group cursor-pointer border-2 border-dashed border-white/10 rounded-[32px] p-12 flex flex-col items-center justify-center text-center transition-all hover:border-indigo-500/50 hover:bg-white/5 min-h-[350px]"
              >
                <div className="w-20 h-20 bg-indigo-500/10 text-indigo-400 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/5">
                  <Camera size={40} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Tirar foto da nota</h3>
                <p className="text-white/40 text-sm max-w-[200px]">Posicione a nota em um local iluminado para melhor leitura.</p>
                
                <div className="mt-8 flex gap-3">
                   <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40">
                      <Zap size={12} /> OCR Ativo
                   </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative rounded-[32px] overflow-hidden border border-white/10 aspect-[3/4] bg-neutral-900">
                  <img src={image} alt="Receipt preview" className="w-full h-full object-cover opacity-80" />
                  {analyzing && (
                    <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                      <Loader2 size={48} className="animate-spin mb-4 text-indigo-400" />
                      <span className="font-black uppercase tracking-[4px] text-xs">Analisando...</span>
                    </div>
                  )}
                  <button 
                    onClick={reset}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {!analyzing && (
                  <button 
                    onClick={triggerUpload}
                    className="w-full py-5 bg-white text-slate-900 font-black text-lg rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3"
                  >
                    <RefreshCcw size={20} /> Tentar outra foto
                  </button>
                )}
              </div>
            )}

            <div className="mt-8 p-6 bg-indigo-500/10 rounded-[28px] border border-indigo-500/10 text-white flex items-start gap-4">
               <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 flex-shrink-0">
                  <FileText size={24} />
               </div>
               <div>
                  <h4 className="font-bold mb-1 text-sm">O que o Betinho lê?</h4>
                  <p className="text-white/40 text-[11px] leading-relaxed">Nossa IA identifica automaticamente o estabelecimento, data, itens e valores total de qualquer cupom ou nota fiscal eletrônica.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            {!result && !analyzing && !error ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="bg-white/5 border-2 border-dashed border-white/10 rounded-[40px] h-[600px] flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-20 h-20 glass-card flex items-center justify-center text-white/20 mb-6 shadow-sm">
                  <Receipt size={40} />
                </div>
                <h3 className="text-xl font-bold text-white/40 mb-2">Relatório de Gastos</h3>
                <p className="text-white/30 max-w-xs">Anexe uma imagem do seu cupom para ver a mágica acontecer aqui.</p>
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center">
                  <X size={40} />
                </div>
                <h3 className="text-2xl font-black text-white">{error}</h3>
                <button 
                  onClick={triggerUpload}
                  className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl"
                >
                  Tentar novamente
                </button>
              </motion.div>
            ) : result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="glass premium-shadow overflow-hidden flex flex-col h-full"
              >
                {/* Header Result */}
                <div className="p-8 md:p-10 border-b border-white/5 bg-indigo-500/5">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                        Documento Digitalizado
                      </div>
                      <h2 className="text-3xl font-black text-white">{result.merchant}</h2>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-1">VALOR TOTAL</p>
                       <p className="text-4xl font-black text-white">R$ {result.total.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass-card p-4">
                      <Calendar size={16} className="text-indigo-400 mb-2" />
                      <p className="text-[9px] font-black text-white/30 uppercase mb-1">Data</p>
                      <p className="text-xs font-bold text-white">{result.date || 'Hoje'}</p>
                    </div>
                    <div className="glass-card p-4">
                      <Zap size={16} className="text-indigo-400 mb-2" />
                      <p className="text-[9px] font-black text-white/30 uppercase mb-1">Categoria</p>
                      <p className="text-xs font-bold text-white">{result.category}</p>
                    </div>
                    <div className="glass-card p-4">
                      <MapPin size={16} className="text-indigo-400 mb-2" />
                      <p className="text-[9px] font-black text-white/30 uppercase mb-1">Status</p>
                      <p className="text-xs font-bold text-emerald-400">Verificado</p>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="flex-1 p-8 overflow-y-auto">
                  <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[2px] mb-6">ITENS DETALHADOS</h4>
                  <div className="space-y-4">
                    {result.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-white/40">
                            {idx + 1}
                          </div>
                          <span className="text-sm font-bold text-white/80">{item.name}</span>
                        </div>
                        <span className="text-sm font-black text-white">R$ {item.amount.toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t border-white/5 bg-white/5 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => alert('Gasto catalogado com sucesso!')}
                    className="flex-1 py-5 bg-indigo-500 text-white font-black rounded-2xl hover:bg-indigo-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                  >
                    <CheckCircle2 size={20} />
                    Confirmar e Salvar
                  </button>
                  <button 
                    onClick={reset}
                    className="flex-1 py-5 glass border border-white/10 text-white font-black rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCcw size={20} />
                    Digitalizar Outro
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
