CREATE DATABASE gunsnroses;
USE gunsnroses;

-- Entidades: membro, usuario
-- Relacionamento: membro (1) ---< usuario (N)
--   Um membro pode ser o favorito de vários usuários.

CREATE TABLE membro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE,
    instrumento VARCHAR(50) NOT NULL
);

INSERT INTO membro (nome, instrumento) VALUES
    ('Axl Rose', 'Vocal'),
    ('Slash', 'Guitarra'),
    ('Duff McKagan','Baixo'),
    ('Izzy Stradlin','Guitarra'),
    ('Steven Adler', 'Bateria');

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    fk_membro INT,    
    conhece_banda CHAR(1),             -- 'S' para sim, 'N' para não
    CONSTRAINT fk_usuario_membro
        FOREIGN KEY (fk_membro)
        REFERENCES membro(id)
);