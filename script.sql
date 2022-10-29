DROP DATABASE IF EXISTS mytrip;

CREATE DATABASE IF NOT EXISTS mytrip;

USE mytrip;

# ---------------------------------------------------------------------- #
# Add table "customers"                                                  #
# ---------------------------------------------------------------------- #
 
CREATE TABLE IF NOT EXISTS `customers` (
`customerId` INTEGER , 
`lastName` VARCHAR(50) DEFAULT NULL, 
`firstName` VARCHAR(50) DEFAULT NULL, 
`address` DATETIME DEFAULT NULL, 
`phone` VARCHAR(11) DEFAULT NULL, 
`lat` FLOAT(6, 2) DEFAULT NULL, 
`long` FLOAT(6, 2) DEFAULT NULL, 
PRIMARY KEY (`customerId`)
) ENGINE=InnoDB;


CREATE INDEX `Address` ON `Customers` (`Address`);

# ---------------------------------------------------------------------- #
# Add table "drivers"                                                  #
# ---------------------------------------------------------------------- #

CREATE TABLE `drivers` (
    `driverID` INTEGER NOT NULL AUTO_INCREMENT,
    `lastName` VARCHAR(20) NOT NULL,
    `firstName` VARCHAR(10) NOT NULL,
    `birthDate` DATETIME,
    `address` VARCHAR(60),
    `phone` VARCHAR(24),
    `photo` LONGBLOB,
	`lat` FLOAT(10,6),
	`Long` FLOAT(10,6),
    CONSTRAINT `PK_Drivers` PRIMARY KEY (`driverID`)
);

CREATE INDEX `lat` ON `drivers` (`lat`);
CREATE INDEX `long` ON `drivers` (`long`);

# ---------------------------------------------------------------------- #
# Add table "Orders"                                                     #
# ---------------------------------------------------------------------- #

CREATE TABLE IF NOT EXISTS `orders` (
 `orderId` INTEGER auto_increment , 
 `customerId` INTEGER DEFAULT NULL, 
 `driverId` INTEGER DEFAULT NULL, 
 `departure` VARCHAR(255) DEFAULT NULL, 
 `destination` VARCHAR(255) DEFAULT NULL, 
 `startLat` FLOAT(6, 2) DEFAULT NULL, 
 `startLong` FLOAT(6, 2) DEFAULT NULL, 
 `endLat` FLOAT(6, 2) DEFAULT NULL, 
 `endLong` FLOAT(6, 2) DEFAULT NULL, 
 `loai_xe` VARCHAR(3) DEFAULT NULL, 
 `flag` VARCHAR(1) DEFAULT NULL, 
 PRIMARY KEY (`orderId`)) ENGINE=InnoDB;

CREATE TABLE `customers` (
    `customerId` INT NOT NULL,
    `lastName` VARCHAR(40) NULL,
    `firstName` VARCHAR(30),    
    `address` VARCHAR(60),
    `city` VARCHAR(15),
    `region` VARCHAR(15),
    `country` VARCHAR(15),
    `phone` VARCHAR(24),
	`lat` FLOAT(10, 6),
	`long` FLOAT(10, 6),
    CONSTRAINT `PK_Customers` PRIMARY KEY (`customerId`)
);

# ---------------------------------------------------------------------- #
# Foreign key constraints                                                #
# ---------------------------------------------------------------------- #

ALTER TABLE `orders` ADD CONSTRAINT `FK_Orders_Customers` 
    FOREIGN KEY (`customerId`) REFERENCES `customers` (`customerId`);


 CREATE TABLE IF NOT EXISTS `users` 
 (`id` INTEGER NOT NULL auto_increment ,
 `username` VARCHAR(255),
 `email` VARCHAR(255), 
 `password` VARCHAR(255), 
 `createdAt` DATETIME NOT NULL, 
 `updatedAt` DATETIME NOT NULL, 
 PRIMARY KEY (`id`)
 ) ENGINE=InnoDB;
 
  CREATE TABLE IF NOT EXISTS `roles` 
  (`id` INTEGER , `name` VARCHAR(255), 
  `createdAt` DATETIME NOT NULL, 
  `updatedAt` DATETIME NOT NULL, 
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB;
  
  CREATE TABLE IF NOT EXISTS `user_roles` 
  (`createdAt` DATETIME NOT NULL, `updatedAt`
  DATETIME NOT NULL, 
  `roleId` INTEGER , 
  `userId` INTEGER , 
  PRIMARY KEY (`roleId`, `userId`), 
  FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (`userId`)
  REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)
  ENGINE=InnoDB;
  
INSERT INTO roles VALUES (1, 'user', now(), now());
INSERT INTO roles VALUES (2, 'driver', now(), now());
INSERT INTO roles VALUES (3, 'admin', now(), now());

INSERT INTO `mytrip`.`drivers` (`driverID`, `lastName`, `firstName`, `lat`, `Long`) VALUES ('1', 'Nguyen', 'Thang', '11.894620', '106.755170');
INSERT INTO `mytrip`.`drivers` (`driverID`, `lastName`, `firstName`, `lat`, `Long`) VALUES ('2', 'Thu', 'Nguyen', '10.762622', '106.660172');
INSERT INTO `mytrip`.`drivers` (`lastName`, `firstName`, `lat`, `Long`) VALUES ('Dung', 'Vu Thi', '10.802029', '106.649307');

UPDATE `mytrip`.`drivers` SET `lat` = '11.986355', `Long` = '106.805089' WHERE (`driverID` = '2');
INSERT INTO `mytrip`.`drivers` (`driverID`, `lastName`, `firstName`, `lat`, `Long`) VALUES ('4', 'Meo', 'Con', '11.966562', '106.796186');

ALTER TABLE `mytrip`.`drivers` 
CHANGE COLUMN `lastName` `lastName` VARCHAR(20) NULL ,
CHANGE COLUMN `firstName` `firstName` VARCHAR(20) NULL ;


ALTER TABLE `mytrip`.`orders` 
ADD COLUMN `cre_dt` DATETIME NULL DEFAULT NULL AFTER `flag`;

ALTER TABLE `mytrip`.`orders` 
DROP FOREIGN KEY `FK_Orders_Customers`;
ALTER TABLE `mytrip`.`orders` 
CHANGE COLUMN `customerId` `customerId` INT NULL ,
CHANGE COLUMN `driverId` `driverId` INT NULL ,
CHANGE COLUMN `departure` `departure` VARCHAR(255) NULL ,
CHANGE COLUMN `destination` `destination` VARCHAR(255) NULL ,
CHANGE COLUMN `startLat` `startLat` FLOAT(6,2) NULL ,
CHANGE COLUMN `startLong` `startLong` FLOAT(6,2) NULL ,
CHANGE COLUMN `endLat` `endLat` FLOAT(6,2) NULL ,
CHANGE COLUMN `endLong` `endLong` FLOAT(6,2) NULL ,
CHANGE COLUMN `loai_xe` `loai_xe` VARCHAR(3) NULL ,
CHANGE COLUMN `flag` `flag` VARCHAR(1) NULL ,
CHANGE COLUMN `cre_dt` `cre_dt` DATETIME NULL ;
ALTER TABLE `mytrip`.`orders` 
ADD CONSTRAINT `FK_Orders_Customers`
  FOREIGN KEY (`customerId`)
  REFERENCES `mytrip`.`customers` (`customerId`);
