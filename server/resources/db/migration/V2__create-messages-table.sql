create TABLE MESSAGES (
    id uuid primary key,
    content text NOT NULL,
    "user" uuid NOT NULL,
    sent_at timestamp default now(),
    FOREIGN KEY("user") REFERENCES USERS(id)
);