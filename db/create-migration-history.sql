CREATE TABLE migrationhistory
(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    migration VARCHAR(128) NOT NULL
);
CREATE UNIQUE INDEX migrationhistory_migration_uindex ON migrationhistory (migration)