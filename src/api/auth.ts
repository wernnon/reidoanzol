// src/api/auth.ts
import { supabase } from '../libs/supabase';
import { Profile } from '../types';

export const authAPI = {
  
  // 1. REGISTAR NOVO UTILIZADOR
  registerUser: async ({ email, password, fullName, cpf, birthDate }: any) => {
    try {
      // A. Cria o usuário no sistema de Auth do Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Erro ao gerar utilizador.");

      // B. Salva os dados de negócio na NOSSA tabela 'profiles' com a regra das 4 letras
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            prof_id: authData.user.id,
            prof_full_name: fullName,
            prof_cpf: cpf,
            prof_birth_date: birthDate,
            prof_role: 'USER', // Padrão inicial
          }
        ])
        .select()
        .single();

      if (profileError) {
        // Se der erro ao salvar o perfil, idealmente apagamos o auth.user para não ter dados fantasma
        console.error("Erro ao criar perfil:", profileError);
        throw profileError;
      }

      return { user: authData.user, profile: profileData as Profile };
    } catch (error) {
      console.error('Erro no Registo:', error);
      throw error;
    }
  },

  // 2. FAZER LOGIN
  loginUser: async ({ email, password }: any) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro no Login:', error);
      throw error;
    }
  },

  // 3. FAZER LOGOUT (Sair da conta)
  logoutUser: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // 4. BUSCAR PERFIL COMPLETO (Usado quando o utilizador atualiza a página)
  getCurrentProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('prof_id', userId)
      .single();

    if (error) throw error;
    return data as Profile;
  }
};