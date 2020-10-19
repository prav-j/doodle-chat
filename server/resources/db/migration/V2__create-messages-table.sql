create TABLE MESSAGES (
    id uuid primary key,
    content text NOT NULL,
    sent_by varchar(100) NOT NULL,
    sent_at timestamp default now(),
    FOREIGN KEY(sent_by) REFERENCES USERS(name)
);