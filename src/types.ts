export interface Income {
  id: string;
  source: string;
  amount: number;
  date: string;
  isRecurring: boolean;
  category: 'salary' | 'investment' | 'freelance' | 'other';
}

export interface ReceiptItem {
  name: string;
  amount: number;
}

export interface ReceiptData {
  merchant: string;
  total: number;
  date: string;
  items: ReceiptItem[];
  category: string;
  currency: string;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
}

export interface ScamAnalysis {
  id: string;
  content: string;
  riskScore: number;
  type: string;
  evidence: string[];
  recommendations: string[];
  timestamp: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  data?: any;
}
