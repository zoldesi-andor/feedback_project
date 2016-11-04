INSERT INTO migrationhistory (migration) VALUES ('2016-11-4-AddGameTimerToGameEvent');

ALTER TABLE game_event ADD gametimer INT;