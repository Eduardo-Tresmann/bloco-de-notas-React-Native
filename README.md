# Bloco de Notas React Native

Projeto acadêmico desenvolvido para criar um bloco de notas mobile utilizando React Native, Expo e Supabase.

## 🚀 Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- AsyncStorage
- Expo Router
- Supabase (backend e banco de dados)

## 👥 Participantes

- Eduardo Henrique Tresmann
- Cristiano Cardozo Lopes
- Kaique Caldas Gotardo
- José Victor B.L. Domingues

---

## 🗄️ Configuração do Banco de Dados (Supabase)

1. Crie uma conta gratuita em [supabase.com](https://supabase.com/) e crie um novo projeto.
2. Crie a tabela `notes` executando o SQL abaixo no editor do Supabase:
   ```sql
   create table notes (
     id uuid primary key default uuid_generate_v4(),
     user_id uuid not null,
     title text not null,
     content text not null,
     created_at timestamp with time zone default now()
   );
   ```
3. Habilite Row Level Security (RLS) e adicione políticas para permitir que cada usuário acesse apenas suas próprias notas.
4. No painel do projeto, copie a `Project URL` e a `anon public key` (Settings > API).
5. No projeto, crie ou edite o arquivo `src/constants/supabase.ts` e adicione:
   ```ts
   export const supaUrl = 'SUA_SUPABASE_URL';
   export const supaAnonKey = 'SUA_SUPABASE_ANON_KEY';
   ```
   Substitua pelos valores do seu projeto.

---

## 🛠️ Passo a Passo para Rodar o Projeto

### 1. Pré-requisitos
- Node.js instalado (recomendado versão LTS)
- npm ou yarn
- Expo CLI (global):
  ```bash
  npm install -g expo-cli
  ```
- Emulador Android/iOS ou dispositivo físico com o app Expo Go

### 2. Clonando o repositório
```bash
git clone https://github.com/Eduardo-Tresmann/bloco-de-notas-React-Native.git
cd bloco-de-notas-React-Native
```

### 3. Instalando as dependências
```bash
npm install
# ou
yarn install
```

### 4. Configurando as variáveis do Supabase
- Edite o arquivo `src/constants/supabase.ts` com as suas chaves do Supabase, conforme instruções acima.

### 5. Executando o projeto
```bash
npx expo start
```
- O Expo abrirá uma interface web.
- Para rodar no dispositivo físico, escaneie o QR Code com o app Expo Go.
- Para rodar no emulador Android:
  - Inicie o emulador e clique em "Run on Android device/emulator" na interface do Expo.
- Para rodar no emulador iOS (Mac):
  - Inicie o simulador e clique em "Run on iOS simulator".

### 6. Rodando os testes
```bash
npm test
```

---

Se tiver dúvidas, consulte a documentação do Expo: https://docs.expo.dev/
