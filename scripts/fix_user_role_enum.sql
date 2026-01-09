-- ==========================================
-- FIX: Agregar valor 'admin' al enum user_role
-- ==========================================

-- Primero, verificar si el tipo enum existe y agregarlo si no
DO $$ 
BEGIN
    -- Intentar agregar 'admin' al enum si no existe
    IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'admin' 
        AND enumtypid = 'user_role'::regtype
    ) THEN
        ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'admin';
    END IF;
EXCEPTION
    WHEN undefined_object THEN
        -- Si el enum no existe, crearlo
        CREATE TYPE user_role AS ENUM ('user', 'admin');
END $$;

-- Actualizar la columna role en users para usar el enum si no lo está usando
DO $$
BEGIN
    -- Verificar si la columna role existe
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'role'
    ) THEN
        -- Si existe pero no es del tipo correcto, convertirla
        ALTER TABLE users 
        ALTER COLUMN role TYPE user_role 
        USING role::user_role;
    ELSE
        -- Si no existe, agregarla
        ALTER TABLE users 
        ADD COLUMN role user_role DEFAULT 'user';
    END IF;
END $$;

-- Notificar
NOTIFY pgrst, 'reload schema';
