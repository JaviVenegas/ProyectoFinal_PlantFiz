-- ==================================================
--  SCRIPT DE CREACION DE TABLAS EN POSTGRESQL
-- ==================================================

-- Opcional: Seleccionar el esquema donde se crearán las tablas 
-- (si no se usa, las tablas van a public por defecto).
-- CREATE SCHEMA PLANTFIZ;
-- SET search_path TO PLANTFIZ;

-- ===============================
-- 1. TABLA: usuarios
-- ===============================

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(15) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

-- ===============================
-- 2. TABLA: direcciones
-- ===============================
CREATE TABLE direcciones (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(20),
    CONSTRAINT fk_usuario_direccion FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- ===============================
-- 3. TABLA: plantas
-- ===============================
CREATE TABLE plantas (
    id SERIAL PRIMARY KEY,
    nombre_planta VARCHAR(100) NOT NULL,
    precio INT NOT NULL,
    origen VARCHAR(100),
    descripcion_hojas TEXT,
    ideal_para TEXT,
    agua VARCHAR(50),
    luz VARCHAR(50),
);

-- ===============================
-- 4. TABLA: categorias de plantas
-- ===============================
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
);

-- ===============================
-- 5. TABLA: stock
-- ===============================
CREATE TABLE stock_plantas (
    id SERIAL PRIMARY KEY,
    id_planta INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad >= 0),
    CONSTRAINT fk_stock_planta FOREIGN KEY (id_planta) REFERENCES plantas (id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- ===============================
-- 6. TABLA: pedidos
-- ===============================
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_direccion INT NOT NULL,
    fecha_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) NOT NULL,
    direccion_texto VARCHAR(200) NOT NULL,
    ciudad_texto VARCHAR(100) NOT NULL,
    region_texto VARCHAR(100) NOT NULL,
    codigo_postal_texto VARCHAR(20) DEFAULT NULL,
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_pedido_direccion FOREIGN KEY (id_direccion) REFERENCES direcciones (id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- ===============================
-- 7. TABLA: pedido_plantas
--    (Detalle de las plantas en cada pedido)
-- ===============================
CREATE TABLE pedido_plantas (
    id_pedido INT NOT NULL,
    id_planta INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad >= 1),
    precio_unitario_planta INT NOT NULL,
    PRIMARY KEY (id_pedido, id_planta),
    CONSTRAINT fk_pedidoplantas_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_pedidoplantas_planta FOREIGN KEY (id_planta) REFERENCES plantas (id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- ===============================
-- 8. TABLA INTERMEDIA: planta_categoria
--    (Relación muchos-a-muchos entre plantas y categorías)
-- ===============================
CREATE TABLE planta_categoria (
    id_planta INT NOT NULL,
    id_categoria INT NOT NULL,
    PRIMARY KEY (id_planta, id_categoria),
    CONSTRAINT fk_plantacategoria_planta FOREIGN KEY (id_planta) REFERENCES plantas (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_plantacategoria_categoria FOREIGN KEY (id_categoria) REFERENCES categorias (id) ON UPDATE CASCADE ON DELETE CASCADE
);