-- ============================================================
-- BASE DE DATOS: SSBU
-- Sistema de Compras + Super Smash Bros. Ultimate
-- ============================================================
-- Ejecutar con: mysql -u root -p < database.sql
-- O copiar y pegar en MySQL Workbench / phpMyAdmin
-- ============================================================

CREATE DATABASE IF NOT EXISTS SSBU
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE SSBU;

-- ============================================================
-- TABLA: usuarios
-- ============================================================
CREATE TABLE IF NOT EXISTS usuarios (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(100)  NOT NULL,
    email       VARCHAR(150)  NOT NULL UNIQUE,
    created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: productos
-- ============================================================
CREATE TABLE IF NOT EXISTS productos (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(150)    NOT NULL,
    precio      DECIMAL(10, 2)  NOT NULL,
    created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: compras
-- ============================================================
CREATE TABLE IF NOT EXISTS compras (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id  INT             NOT NULL,
    producto_id INT             NOT NULL,
    cantidad    INT             NOT NULL DEFAULT 1,
    fecha_compra DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_compras_usuario
        FOREIGN KEY (usuario_id)  REFERENCES usuarios(id)  ON DELETE CASCADE,
    CONSTRAINT fk_compras_producto
        FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: ssbu_personajes
-- ============================================================
CREATE TABLE IF NOT EXISTS ssbu_personajes (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    nombre  VARCHAR(100)    NOT NULL,
    saga    VARCHAR(100)    NOT NULL,
    peso    DECIMAL(5, 1)   NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- DATOS: usuarios (3 registros)
-- ============================================================
INSERT INTO usuarios (nombre, email) VALUES
    ('Ana García',    'ana.garcia@email.com'),
    ('Carlos López',  'carlos.lopez@email.com'),
    ('Sofía Martínez','sofia.martinez@email.com');

-- ============================================================
-- DATOS: productos (4 registros)
-- ============================================================
INSERT INTO productos (nombre, precio) VALUES
    ('Nintendo Switch OLED',    349.99),
    ('Super Smash Bros. Ultimate', 59.99),
    ('Control Pro Nintendo',    69.99),
    ('Tarjeta Nintendo eShop $50', 50.00);

-- ============================================================
-- DATOS: compras (5 registros)
-- ============================================================
INSERT INTO compras (usuario_id, producto_id, cantidad) VALUES
    (1, 1, 1),
    (1, 2, 1),
    (2, 2, 1),
    (2, 3, 2),
    (3, 4, 1);

-- ============================================================
-- DATOS: ssbu_personajes (30 personajes con datos reales)
-- Nombre y Saga: https://es.ssbwiki.com/wiki/Super_Smash_Bros._Ultimate
-- Peso: https://ultimateframedata.com/stats (via upcomer.com)
-- ============================================================
INSERT INTO ssbu_personajes (nombre, saga, peso) VALUES
    -- Super Mario
    ('Mario',               'Super Mario',                    98.0),
    ('Luigi',               'Super Mario',                    97.0),
    ('Peach',               'Super Mario',                    89.0),
    ('Bowser',              'Super Mario',                   135.0),
    ('Rosalina y Destello', 'Super Mario',                    82.0),
    ('Bowsy',               'Super Mario',                   108.0),

    -- The Legend of Zelda
    ('Link',                'The Legend of Zelda',           104.0),
    ('Zelda',               'The Legend of Zelda',            85.0),
    ('Sheik',               'The Legend of Zelda',            78.0),
    ('Ganondorf',           'The Legend of Zelda',           118.0),
    ('Link niño',           'The Legend of Zelda',            88.0),

    -- Pokémon
    ('Pikachu',             'Pokémon',                        79.0),
    ('Jigglypuff',          'Pokémon',                        68.0),
    ('Mewtwo',              'Pokémon',                        79.0),
    ('Lucario',             'Pokémon',                        92.0),
    ('Greninja',            'Pokémon',                        88.0),
    ('Incineroar',          'Pokémon',                       116.0),

    -- Donkey Kong
    ('Donkey Kong',         'Donkey Kong',                   127.0),
    ('Diddy Kong',          'Donkey Kong',                    90.0),
    ('King K. Rool',        'Donkey Kong',                   133.0),

    -- Fire Emblem
    ('Marth',               'Fire Emblem',                    90.0),
    ('Roy',                 'Fire Emblem',                    95.0),
    ('Ike',                 'Fire Emblem',                   107.0),
    ('Byleth',              'Fire Emblem',                    97.0),

    -- Metroid
    ('Samus',               'Metroid',                       108.0),
    ('Ridley',              'Metroid',                       107.0),

    -- Kirby
    ('Kirby',               'Kirby',                          79.0),
    ('Meta Knight',         'Kirby',                          80.0),
    ('King Dedede',         'Kirby',                         127.0),

    -- Star Fox
    ('Fox',                 'Star Fox',                       77.0);


-- ============================================================
-- VERIFICACIÓN
-- ============================================================
SELECT 'usuarios'        AS tabla, COUNT(*) AS registros FROM usuarios
UNION ALL
SELECT 'productos',      COUNT(*) FROM productos
UNION ALL
SELECT 'compras',        COUNT(*) FROM compras
UNION ALL
SELECT 'ssbu_personajes',COUNT(*) FROM ssbu_personajes;
