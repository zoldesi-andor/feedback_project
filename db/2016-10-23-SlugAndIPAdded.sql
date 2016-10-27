INSERT INTO migrationhistory (migration) VALUES ('2016-10-23-SlugAndIPAdded');

ALTER TABLE game_info ADD urlslug VARCHAR(50) NULL;
ALTER TABLE game_info ADD ip VARCHAR(50) NULL;