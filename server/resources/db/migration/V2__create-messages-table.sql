create TABLE MESSAGES (
    id uuid primary key,
    content text NOT NULL,
    sent_by varchar(100) NOT NULL,
    sent_at bigint default extract(epoch from now()) * 1000,
    FOREIGN KEY(sent_by) REFERENCES USERS(name)
);