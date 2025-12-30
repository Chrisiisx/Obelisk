-- 1. Crea un database dedicato (se non esiste già)
-- Nota: Il container PostgreSQL crea già il DB 'obelisk' dalla variabile POSTGRES_DB,
-- quindi possiamo partire direttamente dalle tabelle.

-- 2. Connettiti al database 'obelisk'
\c obelisk;

-- 3. Crea l'estensione per UUID (se non esiste)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 4. Crea la tabella 'users'
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    -- public_key TEXT, -- Per la crittografia asimmetrica (condivisione)
    -- private_key_encrypted TEXT, -- Chiave privata cifrata con master password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);