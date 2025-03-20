-- Active: 1729978767201@@127.0.0.1@5432@plantfiz

-- ==================================================
--  SCRIPT DE CREACION DE TABLAS EN POSTGRESQL
-- ==================================================

CREATE DATABASE plantfiz;

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
    agua VARCHAR(250),
    luz VARCHAR(250)
);


-- Se debe subir la  cantidad de caracteres de 50 a 250 ya que los textos son mas largos 
ALTER TABLE plantas 
    ALTER COLUMN agua TYPE VARCHAR(250),
    ALTER COLUMN luz TYPE VARCHAR(250);


 SELECT * FROM plantas;

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


select * from stock_plantas

-- ===============================
-- 6. TABLA: imagenes
-- ===============================


CREATE TABLE imagenes_plantas (
    id SERIAL PRIMARY KEY,
    id_planta INT NOT NULL,
    imagen_url TEXT NOT NULL,  
    CONSTRAINT fk_imagenes_plantas FOREIGN KEY (id_planta) 
        REFERENCES plantas (id) ON UPDATE CASCADE ON DELETE CASCADE
);

select * from imagenes_plantas

-- ===============================
-- 7. TABLA: pedidos
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
-- 8. TABLA: pedido_plantas
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
-- 9. TABLA INTERMEDIA: planta_categoria
--    (Relación muchos-a-muchos entre plantas y categorías)
-- ===============================
CREATE TABLE planta_categoria (
    id_planta INT NOT NULL,
    id_categoria INT NOT NULL,
    PRIMARY KEY (id_planta, id_categoria),
    CONSTRAINT fk_plantacategoria_planta FOREIGN KEY (id_planta) REFERENCES plantas (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_plantacategoria_categoria FOREIGN KEY (id_categoria) REFERENCES categorias (id) ON UPDATE CASCADE ON DELETE CASCADE
);


-- ==================================================
--  SCRIPT DE CREACION DE REGISTROS PARA PROBAR LA BASE DE DATOS POSTGRESQL
-- ==================================================

-- ===============================
-- 1. TABLA: usuarios
-- ===============================

INSERT INTO usuarios (rut, nombre, apellido, correo, contrasena, rol, telefono) VALUES
('1-9', 'Juan', 'Pérez', 'juan.perez@example.com', 'password123', 'admin', '123456789'),
('2-7', 'María', 'González', 'maria.gonzalez@example.com', 'securepassword', 'user', '987654321'),
('3-5', 'Carlos', 'López', 'carlos.lopez@example.com', 'mypassword', 'user', '456789123'),
('4-3', 'Ana', 'Martínez', 'ana.martinez@example.com', 'password2023', 'user', '789123456'),
('5-1', 'Luis', 'Hernández', 'luis.hernandez@example.com', 'adminpass', 'admin', '321654987'),
('6-8', 'Laura', 'Díaz', 'laura.diaz@example.com', 'userpassword', 'user', '654987321'),
('7-6', 'Pedro', 'Sánchez', 'pedro.sanchez@example.com', 'password456', 'user', '147258369'),
('8-4', 'Carmen', 'Ramírez', 'carmen.ramirez@example.com', 'mysecurepassword', 'user', '963852741'),
('9-2', 'José', 'Fernández', 'jose.fernandez@example.com', 'password789', 'user', '258369147'),
('10-0', 'Marta', 'Ruiz', 'marta.ruiz@example.com', 'user2023', 'user', '369147258');





INSERT INTO plantas (nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz) VALUES
('Aphelandra', 5500, 'América tropical (principalmente Brasil)', 
 'Hojas grandes, alargadas, de color verde brillante con venas prominentes. Pueden presentar tonos de color blanco o amarillento en algunas especies.', 
 'Es una planta de interior que necesita ambientes cálidos y luminosos, protegidos de la luz directa del sol.', 
 'Riego moderado, permite que la capa superior del suelo se seque.', 
 'Luz indirecta brillante, tolera luz más baja.' 
),

('Dólar Blanco', 7000, 'China', 
 'Hojas redondas, de un verde brillante con un contorno más claro, en forma de disco o moneda. Tienen un aspecto muy decorativo.', 
 'Interior. Es perfecta para interiores con buena luz natural indirecta, como escritorios o estanterías.', 
 'Regar cuando el sustrato esté seco, evitando exceso de agua.', 
 'Luz indirecta brillante, evitar luz solar directa.' 
),

('Musa Velutina (chica)', 15000, 'Sudeste Asiático', 
 'Hojas largas, de un verde intenso, de textura aterciopelada. La planta en su fase joven tiene un porte más compacto.', 
 'Interior o Exterior. En climas cálidos, se puede mantener afuera en sombra parcial, pero generalmente se prefiere en interiores con buena luz y temperatura cálida.', 
 'Mantener el sustrato ligeramente húmedo, regar de manera regular.', 
 'Luz brillante indirecta, tolera algo de luz directa.' 
),

('Cinta (Chlorophytum comosum)', 3500, 'África tropical y Asia', 
 'Hojas largas, estrechas, de color verde. Son muy decorativas y se desarrollan en forma de roseta.', 
 'Interior o Exterior. Puede crecer tanto en interiores como en exteriores, siempre que esté protegido del sol directo fuerte. Se adapta bien a ambos ambientes.', 
 'Requiere riego moderado, permitiendo que la tierra se seque entre riegos.', 
 'Prefiere luz indirecta brillante, se adapta a luz baja.' 
),

('Helecho Polystichum', 11000, 'Sur y oeste de Europa', 
 'Hojas frondosas y pinnadas, de un verde brillante, con una textura suave. A menudo forman un helecho de tamaño mediano a grande.', 
 'Interior o Exterior. Es adecuado tanto para ambientes interiores como exteriores en zonas sombreadas o semi sombreadas, en climas templados.', 
 'Requiere un suelo constantemente húmedo, pero no encharcado.', 
 'Prefiere sombra parcial o luz indirecta brillante.' 
),

('Ficus Lyrata', 14000, 'África Occidental', 
 'Hojas grandes, brillantes, de forma lobulada que recuerdan a una lira, de color verde oscuro.', 
 'Interior. Esta planta se disfruta mejor en interiores debido a su sensibilidad al frío.', 
 'Regar moderadamente, dejando que el sustrato se seque parcialmente.', 
 'Luz indirecta brillante, tolera algo de luz directa.' 
),

('Philodendro paraguayo', 9000, 'Paraguay, Brasil y Bolivia', 
 'Las hojas son grandes, de color verde brillante y tienen una forma triangular con márgenes ligeramente ondulados.', 
 'Interiores, en lugares con luz indirecta.', 
 'Mantener el sustrato ligeramente húmedo, sin encharcar.', 
 'Prefiere luz indirecta brillante, tolera poca luz.' 
),

('Singonio Plateado (Chico)', 5000, 'América tropical, especialmente en Brasil', 
 'Hojas en forma de flecha, color verde plateado o gris con vetas más claras. Es una planta trepadora.', 
 'Interior, ya que le gusta el calor y la humedad.', 
 'Mantener el sustrato húmedo, pero no saturado. Regar cuando la capa superior del suelo se seque.', 
 'Requiere luz brillante indirecta, tolera sombra parcial.' 
),

('Singonio Plateado (Grande)', 10500, 'América tropical, especialmente en Brasil', 
 'Hojas en forma de flecha, color verde plateado o gris con vetas más claras. Es una planta trepadora.', 
 'Interior, ya que le gusta el calor y la humedad.', 
 'Mantener el sustrato húmedo, pero no saturado. Regar cuando la capa superior del suelo se seque.', 
 'Requiere luz brillante indirecta, tolera sombra parcial.' 
),

('Fiscus Ali', 8000, 'Sudeste asiático', 
 'Hojas alargadas, de un verde oscuro brillante, bastante resistentes. La planta tiene una apariencia arbustiva.', 
 'Interiores, en lugares con luz indirecta.', 
 'Necesita riego cuando el sustrato esté seco al tacto, evitar el exceso de agua.', 
 'Requiere luz indirecta brillante, puede tolerar sombra.' 
);



INSERT INTO stock_plantas (id_planta, cantidad) 
VALUES 
    (1, 3),
    (2, 3),
    (3, 4),
    (4, 10),
    (5, 3),
    (6, 0),
    (7, 0),
    (8, 2),
    (9, 4);

INSERT INTO imagenes_plantas (id_planta, imagen_url) 
VALUES 
(1, 'http://localhost:3000/uploads/public/1740176072437-1b_Afelandra.jpg'),
(2, 'http://localhost:3000/uploads/public/1740176135452-2b_DolarBlanco.jpg'),
(3, 'http://localhost:3000/uploads/public/1740184379797-3b_MusaVelutina.jpg'),
(4, 'http://localhost:3000/uploads/public/1740174097265-4b_Cinta.jpg'),
(5, 'http://localhost:3000/uploads/public/1740184482686-5b_HelechoPolystichum.jpg'),
(6, 'http://localhost:3000/uploads/public/1740184530219-6b_ficusLyrata.jpg'),
(7, 'http://localhost:3000/uploads/public/1740184690607-7b_PhilodendroParaguayo.jpg'),
(8, 'http://localhost:3000/uploads/public/1740174262978-8b_Singonio.jpg'),
(9, 'http://localhost:3000/uploads/public/1740174290417-9b_Singonio.jpg'),
(10, 'http://localhost:3000/uploads/public/1740174365177-10b_ficusAli.jpg');



select * from plantas;

select * from plantas where id='14';
select * from stock_plantas where id_planta='14';

select * from imagenes_plantas WHERE id_planta='14';

select * from stock_plantas
-- Insertar datos en la tabla "direcciones"
INSERT INTO direcciones (id_usuario, direccion, ciudad, region, codigo_postal) VALUES
(33, 'Av. Siempre Viva 742', 'Springfield', 'Illinois', '62704'),
(33, 'Calle Falsa 123', 'Ciudad Gótica', 'Nueva York', '10001'),
(33, 'Paseo del Prado 56', 'Madrid', 'Madrid', '28014');
