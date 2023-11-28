-- postgres-init.sql
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'duplo') THEN
        CREATE DATABASE duplo;
    END IF;
END $$;
