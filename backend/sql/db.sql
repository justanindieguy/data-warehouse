CREATE DATABASE data_warehouse CHARACTER SET
utf8 COLLATE utf8_spanish_ci;

USE data_warehouse;

CREATE TABLE IF NOT EXISTS channels(
	id INT(2) UNSIGNED AUTO_INCREMENT,
	name VARCHAR(40) NOT NULL CHECK (name <> ""),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS regions(
	id INT(2) UNSIGNED AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL CHECK (name <> ""),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS roles(
	id INT(2) UNSIGNED AUTO_INCREMENT,
	name VARCHAR(40) NOT NULL CHECK (name <> ""),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users(
	id INT(11) UNSIGNED AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL CHECK (name <> ""),
	last_name_one VARCHAR(100) NOT NULL CHECK (last_name_one <> ""),
	last_name_two VARCHAR(100) NOT NULL CHECK (last_name_two <> ""),
	rol_id INT(2) UNSIGNED NOT NULL DEFAULT 1,
	email VARCHAR(150) NOT NULL CHECK (email <> ""),
	password VARCHAR(500) NOT NULL CHECK (password <> ""),
	PRIMARY KEY (id),
	FOREIGN KEY (rol_id)
		REFERENCES roles(id)
		ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS countries(
	id INT(4) UNSIGNED AUTO_INCREMENT,
	region_id INT(2) UNSIGNED NOT NULL,
	name VARCHAR(150) NOT NULL CHECK (name <> ""),
	PRIMARY KEY (id),
	FOREIGN KEY (region_id)
		REFERENCES regions(id)
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cities(
	id INT(6) UNSIGNED AUTO_INCREMENT,
	country_id INT(4) UNSIGNED NOT NULL,
	name VARCHAR(150) NOT NULL CHECK (name <> ""),
	PRIMARY KEY (id),
	FOREIGN KEY (country_id)
		REFERENCES countries(id)
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS companies(
	id INT(6) UNSIGNED AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL CHECK (name <> ""),
	address VARCHAR(500) NOT NULL CHECK (address <> ""),
	email VARCHAR(150) NOT NULL CHECK (email <> ""),
	phone VARCHAR(20) NOT NULL CHECK (phone <> ""),
	city_id INT(6) UNSIGNED NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (city_id)
		REFERENCES cities(id)
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contacts(
	id INT(8) UNSIGNED AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL CHECK (name <> ""),
	last_name_one VARCHAR(100) NOT NULL CHECK (last_name_one <> ""),
	last_name_two VARCHAR(100) NOT NULL CHECK (last_name_two <> ""),
	email VARCHAR(150) NOT NULL CHECK (email <> ""),
	company_id INT(6) UNSIGNED NOT NULL,
	city_id INT(6) UNSIGNED NOT NULL,
	position VARCHAR(200) NOT NULL CHECK (position <> ""),
	interest INT(3) UNSIGNED NOT NULL DEFAULT 0,
	PRIMARY KEY (id),
	FOREIGN KEY (company_id)
		REFERENCES companies(id)
		ON DELETE CASCADE,
	FOREIGN KEY (city_id)
		REFERENCES cities(id)
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS accounts(
	channel_id INT(2) UNSIGNED,
	contact_id INT(8) UNSIGNED,
	account VARCHAR(200) NOT NULL CHECK (account <> ""),
	PRIMARY KEY (channel_id, contact_id),
	FOREIGN KEY (channel_id)
		REFERENCES channels(id)
		ON DELETE CASCADE,
	FOREIGN KEY (contact_id)
		REFERENCES contacts(id)
		ON DELETE CASCADE
);

-- Insertar regiones. --
INSERT
	INTO
	regions(name)
VALUES ('Sudamérica'),
('Norteamérica');

-- Insertar países. --
INSERT
	INTO
	countries(name, region_id)
VALUES ('Argentina', 1),
('Colombia', 1),
('Chile', 1),
('Uruguay', 1),
('México', 2),
('Estados Unidos', 2);

-- Insertar ciudades.
INSERT
INTO
	cities(name, country_id)
VALUES ('Buenos Aires', 1),
('Córdoba', 1),
('Bogotá', 2),
('Cúcuta', 2),
('Medellín', 2),
('Atacama', 3),
('Santiago', 3),
('Valparaíso', 3),
('Canelones', 4),
('Maldonado', 4),
('Montevideo', 4),
('Ciudad de México', 5),
('Tijuana', 5),
('Los Angeles', 6),
('San Francisco', 6);

-- Insertar roles. --
INSERT
	INTO
	roles(name)
VALUES ('user'),
('admin');

-- Insertar canales. --
INSERT
	INTO
	channels(name)
VALUES ('Teléfono'),
('WhatsApp'),
('Instagram'),
('Facebook'),
('LinkedIn');