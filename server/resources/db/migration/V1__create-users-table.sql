create TABLE USERS (
    id uuid primary key,
    name varchar(100) unique,
    password varchar(100)
);