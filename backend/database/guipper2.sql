-- MySQL Script generated by MySQL Workbench
-- Tue Oct 13 17:44:32 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering



SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`countries`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`countries` ;

CREATE TABLE IF NOT EXISTS `mydb`.`countries` (
  `idCountry` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCountry`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `sex` VARCHAR(45) NOT NULL,
  `birthday` DATE NULL,
  `phone` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NULL,
  `isPremium` TINYINT NULL,
  `countries_idCountry` INT NOT NULL,
  PRIMARY KEY (`idUser`),
  INDEX `fk_users_countries1_idx` (`countries_idCountry` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  CONSTRAINT `fk_users_countries1`
    FOREIGN KEY (`countries_idCountry`)
    REFERENCES `mydb`.`countries` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`musicStyles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`musicStyles` ;

CREATE TABLE IF NOT EXISTS `mydb`.`musicStyles` (
  `idMusicStyle` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idMusicStyle`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`posts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`posts` ;

CREATE TABLE IF NOT EXISTS `mydb`.`posts` (
  `idPost` INT NOT NULL AUTO_INCREMENT,
  `users_idUser` INT NOT NULL,
  `postDate` DATE NULL,
  `content` TEXT NULL,
  PRIMARY KEY (`idPost`),
  INDEX `fk_posts_users1_idx` (`users_idUser` ASC) ,
  CONSTRAINT `fk_posts_users1`
    FOREIGN KEY (`users_idUser`)
    REFERENCES `mydb`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`records`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`records` ;

CREATE TABLE IF NOT EXISTS `mydb`.`records` (
  `idRecord` INT NOT NULL AUTO_INCREMENT,
  `recordDate` DATE NULL,
  `recordPath` VARCHAR(45) NULL,
  `posts_idPost` INT NOT NULL,
  PRIMARY KEY (`idRecord`),
  INDEX `fk_records_posts1_idx` (`posts_idPost` ASC) ,
  CONSTRAINT `fk_records_posts1`
    FOREIGN KEY (`posts_idPost`)
    REFERENCES `mydb`.`posts` (`idPost`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`likes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`likes` ;

CREATE TABLE IF NOT EXISTS `mydb`.`likes` (
  `users_idUser` INT NOT NULL,
  `posts_idPost` INT NOT NULL,
  `likeDate` VARCHAR(45) NULL,
  PRIMARY KEY (`users_idUser`, `posts_idPost`),
  INDEX `fk_users_has_posts_posts1_idx` (`posts_idPost` ASC) ,
  INDEX `fk_users_has_posts_users_idx` (`users_idUser` ASC) ,
  CONSTRAINT `fk_users_has_posts_users`
    FOREIGN KEY (`users_idUser`)
    REFERENCES `mydb`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_posts_posts1`
    FOREIGN KEY (`posts_idPost`)
    REFERENCES `mydb`.`posts` (`idPost`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users_has_musicStyles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users_has_musicStyles` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users_has_musicStyles` (
  `users_idUser` INT NOT NULL,
  `musicStyles_idMusicStyle` INT NOT NULL,
  PRIMARY KEY (`users_idUser`, `musicStyles_idMusicStyle`),
  INDEX `fk_users_has_musicStyles_musicStyles1_idx` (`musicStyles_idMusicStyle` ASC) ,
  INDEX `fk_users_has_musicStyles_users1_idx` (`users_idUser` ASC) ,
  CONSTRAINT `fk_users_has_musicStyles_users1`
    FOREIGN KEY (`users_idUser`)
    REFERENCES `mydb`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_musicStyles_musicStyles1`
    FOREIGN KEY (`musicStyles_idMusicStyle`)
    REFERENCES `mydb`.`musicStyles` (`idMusicStyle`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`comments` ;

CREATE TABLE IF NOT EXISTS `mydb`.`comments` (
  `idComment` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `users_idUser` INT NOT NULL,
  `posts_idPost` INT NOT NULL,
  `commentDate` VARCHAR(45) NULL,
  PRIMARY KEY (`idComment`),
  INDEX `fk_comment_users1_idx` (`users_idUser` ASC) ,
  INDEX `fk_comment_posts1_idx` (`posts_idPost` ASC) ,
  CONSTRAINT `fk_comment_users1`
    FOREIGN KEY (`users_idUser`)
    REFERENCES `mydb`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_posts1`
    FOREIGN KEY (`posts_idPost`)
    REFERENCES `mydb`.`posts` (`idPost`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
