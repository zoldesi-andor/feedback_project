INSERT INTO migrationhistory (migration) VALUES ('2016-9-1-AddGitVersionToResult');

ALTER TABLE result ADD githash varchar(50);