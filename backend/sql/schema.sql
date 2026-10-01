-- =====================================================================
-- Esquema de base de datos de ActiveGym (PostgreSQL)
-- Es idempotente: se puede ejecutar varias veces sin romper nada.
-- =====================================================================

-- Tipos de dato controlados (evitan valores inválidos a nivel de BD)
DO $$ BEGIN
  CREATE TYPE rol_usuario AS ENUM ('administrador', 'entrenador');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE modo_pago AS ENUM ('efectivo', 'transferencia');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Usuarios del sistema (login)
CREATE TABLE IF NOT EXISTS usuarios (
  id            SERIAL PRIMARY KEY,
  nombre        VARCHAR(80)  NOT NULL,
  apellido      VARCHAR(80)  NOT NULL,
  celular       VARCHAR(20)  NOT NULL,
  correo        VARCHAR(120) NOT NULL UNIQUE,
  password_hash TEXT         NOT NULL,         -- NUNCA se guarda la contraseña en texto plano
  rol           rol_usuario  NOT NULL DEFAULT 'entrenador',
  activo        BOOLEAN      NOT NULL DEFAULT TRUE,
  creado_en     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Áreas del gimnasio
CREATE TABLE IF NOT EXISTS areas (
  id     SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO areas (nombre) VALUES
  ('Musculación'), ('Jumping'), ('Bailoterapia'), ('Baile moderno')
ON CONFLICT (nombre) DO NOTHING;

-- Inscripciones = cliente + mensualidad en un área
CREATE TABLE IF NOT EXISTS inscripciones (
  id             SERIAL PRIMARY KEY,
  area_id        INTEGER       NOT NULL REFERENCES areas(id),
  nombre         VARCHAR(80)   NOT NULL,
  apellido       VARCHAR(80)   NOT NULL,
  telefono       VARCHAR(20)   NOT NULL,
  peso           NUMERIC(5,2)  NOT NULL CHECK (peso > 0),
  pago           NUMERIC(8,2)  NOT NULL CHECK (pago >= 0),
  modo_pago      modo_pago     NOT NULL,
  fecha_inicio   DATE          NOT NULL,
  fecha_fin      DATE          NOT NULL,
  registrado_por INTEGER       REFERENCES usuarios(id) ON DELETE SET NULL,
  creado_en      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  CHECK (fecha_fin > fecha_inicio)
);

-- Índices para las consultas más frecuentes (listar por área y buscar vencimientos)
CREATE INDEX IF NOT EXISTS idx_inscripciones_area  ON inscripciones(area_id);
CREATE INDEX IF NOT EXISTS idx_inscripciones_fin   ON inscripciones(fecha_fin);
