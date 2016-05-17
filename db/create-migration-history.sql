CREATE TABLE MigrationHistory (id LONG, migration VARCHAR(128));
CREATE TABLE heroku_83cf4143360f78c.MigrationHistory
(
    id LONG PRIMARY KEY AUTO_INCREMENT,
    migration VARCHAR(256) NOT NULL
);
CREATE UNIQUE INDEX MigrationHistory_migration_uindex ON heroku_83cf4143360f78c.MigrationHistory (migration)