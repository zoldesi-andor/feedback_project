INSERT INTO migrationhistory (migration) VALUES ('2016-9-9-RestructureResultSaving');

CREATE TABLE game_info
(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    timestamp BIGINT,
    githash varchar(50),
    experimentname NVARCHAR(255),
    feedbackoption TEXT,
    trackingtoken NVARCHAR(255),
    hasclickedplayagain BOOLEAN,
    hasplayedbefore BOOLEAN,
    age INT,
    gender NVARCHAR(10),
    country NVARCHAR(20),
    istouchscreen BOOLEAN,
    nickname NVARCHAR(255),
    isplayingoften BOOLEAN,
    isgoodatgames BOOLEAN,
    score INT
);

CREATE TABLE game_event
(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    gameinfoid BIGINT,
    sequence BIGINT,
    data TEXT,
    eventtype INT,
    time BIGINT,
    score INT,

    CONSTRAINT table_name_game_info_id_fk FOREIGN KEY (gameinfoid) REFERENCES game_info (id)
)