-- store timestamp as ISO date string so it supports timezones
ALTER TABLE game_info MODIFY timestamp VARCHAR(30);