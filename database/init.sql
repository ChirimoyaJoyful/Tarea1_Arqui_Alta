CREATE DATABASE IF NOT EXISTS homework;
CREATE TABLE IF NOT EXISTS Games(Id SERIAL PRIMARY KEY, GName VARCHAR(100), Release_Date DATE, Rating FLOAT, Comment TEXT);
INSERT INTO Games(GName, Release_Date, Rating, Comment) VALUES ('DOOM','2016-05-13', 4, 'rip n tear');
INSERT INTO Games(GName, Release_Date) VALUES ('Super Mario 64','1996-06-23');
INSERT INTO Games(GName, Release_Date) VALUES ('Mega Man X','1993-12-17');
INSERT INTO Games(GName, Release_Date) VALUES ('Hades','2020-09-17');
INSERT INTO Games(GName, Release_Date) VALUES ('Metroid Prime','2002-09-19');
INSERT INTO Games(GName, Release_Date) VALUES ('Final Fantasy VII','1997-09-07');