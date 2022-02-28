DROP DATABASE IF EXISTS `share-a-meal`;
CREATE DATABASE `share-a-meal`;
USE `share-a-meal`;

DROP USER IF EXISTS 'share-a-meal-user'@'localhost';
CREATE USER 'share-a-meal-user'@'localhost' IDENTIFIED BY 'secret';
GRANT SELECT, CREATE, INSERT, INDEX, ALTER, DELETE, UPDATE ON `share-a-meal`.* TO 'share-a-meal-user'@'localhost';
