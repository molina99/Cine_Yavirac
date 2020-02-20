create table horarios(
	id serial primary key,
	hora varchar(10)
);

select * from horario

create table peliculas(
	id serial primary key,
	titulo varchar(255),
	resumen varchar(255),
	categoria varchar(255),
	valorBoleto varchar(255),
	imagen text,
	estado boolean
);

create table personas(
	id serial primary key,
	nombre varchar(50),
	correo varchar(255),
	clave varchar(50)
);

create table salas(
	id serial primary key,
	nombre varchar(50),
	descripcion varchar(255)
);

create table sala_peliculas(
	id serial primary key,
	idpelicula integer,
	idhorario integer,
	idsala integer,
	foreign key (idpelicula) references pelicula(id),
	foreign key (idhorario) references horario(id),
	foreign key (idsala) references sala(id)
);

create table compras(
	id serial primary key,
	numero_boletos integer,
	idpersona integer,
	idsala_peliculas integer,
	foreign key (idpersona) references persona(id),
	foreign key (idsala_peliculas) references sala_pelicula(id)
);