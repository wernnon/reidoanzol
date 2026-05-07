// src/types/index.ts

// 1. ENUMS (Mapeamento exato do Banco de Dados)
export type UserRole = 'ADMIN' | 'ORGANIZER' | 'STORE_OWNER' | 'GUIDE' | 'USER';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELED';

// 2. PERFIL DE USUÁRIO (A Tabela Profiles)
export interface Profile {
  prof_id: string; // Relacionado ao auth.users do Supabase
  prof_role: UserRole;
  prof_full_name: string;
  prof_cpf: string;
  prof_birth_date: string; // ISO Date String (YYYY-MM-DD)
  prof_avatar_url?: string | null;
  prof_created_at: string;
  prof_updated_at: string;
}

// 3. (Adicionaremos as interfaces de Torneios, Piloteiros e Diário conforme construímos essas telas)