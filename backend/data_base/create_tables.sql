
CREATE TABLE IF NOT EXISTS users (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(320) UNIQUE NOT NULL,
    password VARCHAR(192) NOT NULL
);

CREATE TABLE IF NOT EXISTS dogs (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer NOT NULL
-- TODO: add properties¬
);

CREATE TABLE IF NOT EXISTS questions (
    id integer NOT NULL PRIMARY KEY,
    content VARCHAR NOT NULL,
    section_id integer,
    answer_type VARCHAR(10),
    subscale VARCHAR
);

CREATE TABLE IF NOT EXISTS dog_questionnaires (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    dog_id integer NOT NULL,
    question_id integer NOT NULL,
    answer_id integer
);

CREATE TABLE IF NOT EXISTS sections (
    id integer NOT NULL PRIMARY KEY,
    title VARCHAR,
    descript VARCHAR
);

CREATE TABLE IF NOT EXISTS answers (
    id integer NOT NULL PRIMARY KEY,
    quastion_id integer NOT NULL,
    content VARCHAR,
    score integer
);
