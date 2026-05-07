// src/vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // Pode adicionar outras variáveis de ambiente aqui no futuro, se precisar!
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}