INSERT INTO migrationhistory (migration) VALUES ('2016-10-24-timestamp-as-string');

-- store timestamp as ISO date string so it supports timezones
ALTER TABLE game_info MODIFY timestamp VARCHAR(30);