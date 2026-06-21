// Supabase Database Types
export type Role = 'customer' | 'agent' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  avatar_url?: string;
  created_at: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  customer_id: string;
  agent_id?: string;
  category_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  ticket_id: string;
  started_at: string;
  ended_at?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_ai: boolean;
  created_at: string;
}

export interface TicketCategory {
  id: string;
  name: string;
  description?: string;
}

export interface SentimentLog {
  id: string;
  ticket_id: string;
  score: number; // 0 to 1
  label: 'positive' | 'neutral' | 'negative';
  analyzed_at: string;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  ticket_id: string;
  uploaded_by: string;
  file_url: string;
  file_type: string;
  created_at: string;
}

export interface WorkflowLog {
  id: string;
  ticket_id: string;
  action: string;
  executed_by: string;
  created_at: string;
}

// System types
export interface SidebarItem {
  name: string;
  href: string;
  icon: any; // Lucide Icon
}
