set search_path to scheamaweb;

select * from users;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    passwort VARCHAR(255),
    rolle VARCHAR(255)
);


select * from users;

Insert into users(id,username,email,passwort,rolle)values(2,'Waro','waro@','123','Admin');
Insert into users(id,username,email,passwort,rolle)values(3,'Waro2','waro@2','123','Editor');

create table fragen(

	id SERIAL primary key,
	frageStellung text,
	antwort1 text,
	antwort2 text,
	antwort3 text,
	antwort4 text
);

select * from fragen;

create table users_ergebnis(

	id SERIAL primary key,
	ergebnis int,
	username VARCHAR(255),
	status VARCHAR(255),
	timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	foreign key(username) references users(username)

);


select * from users_ergebnis;






