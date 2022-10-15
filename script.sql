DROP DATABASE IF EXISTS mytrip;

CREATE DATABASE IF NOT EXISTS mytrip;

USE mytrip;

# ---------------------------------------------------------------------- #
# Add table "customers"                                                  #
# ---------------------------------------------------------------------- #

CREATE TABLE `customers` (
    `customerID` VARCHAR(5) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `firstName` VARCHAR(30),    
    `address` VARCHAR(60),
    `city` VARCHAR(15),
    `region` VARCHAR(15),
    `country` VARCHAR(15),
    `phone` VARCHAR(24),
	`lat` FLOAT(10, 6),
	`long` FLOAT(10, 6),
    CONSTRAINT `PK_Customers` PRIMARY KEY (`customerID`)
);

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

CREATE INDEX `lat` ON `Drivers` (`lat`);
CREATE INDEX `long` ON `Drivers` (`long`);

# ---------------------------------------------------------------------- #
# Add table "Order Details"                                              #
# ---------------------------------------------------------------------- #

CREATE TABLE `order details` (
    `OrderID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `UnitPrice` DECIMAL(10,4) NOT NULL DEFAULT 0,
    `Quantity` SMALLINT(2) NOT NULL DEFAULT 1,
    `Discount` REAL(8,0) NOT NULL DEFAULT 0,
    CONSTRAINT `PK_Order Details` PRIMARY KEY (`OrderID`, `ProductID`)
);

# ---------------------------------------------------------------------- #
# Add table "Orders"                                                     #
# ---------------------------------------------------------------------- #

CREATE TABLE `orders` (
    `orderID` INTEGER NOT NULL AUTO_INCREMENT,
    `customerID` VARCHAR(5),
    `driverID` INTEGER,
    `orderDate` DATETIME,
    `requiredDate` DATETIME,
    `shippedDate` DATETIME,
    `shipVia` INTEGER,
    `freight` DECIMAL(10,4) DEFAULT 0,
    `shipName` VARCHAR(40),
    `shipAddress` VARCHAR(60),
    `shipCity` VARCHAR(15),
    `shipRegion` VARCHAR(15),
    `shipPostalCode` VARCHAR(10),
    `shipCountry` VARCHAR(15),
    CONSTRAINT `PK_Orders` PRIMARY KEY (`orderID`)
);

CREATE INDEX `orderDate` ON `orders` (`orderDate`);

CREATE INDEX `shippedDate` ON `orders` (`shippedDate`);


# ---------------------------------------------------------------------- #
# Foreign key constraints                                                #
# ---------------------------------------------------------------------- #

ALTER TABLE `order details` ADD CONSTRAINT `FK_Order_Details_Orders` 
    FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`);

ALTER TABLE `orders` ADD CONSTRAINT `FK_Orders_Customers` 
    FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`);

ALTER TABLE `orders` ADD CONSTRAINT `FK_Orders_Drivers` 
    FOREIGN KEY (`driverID`) REFERENCES `drivers` (`driverID`);

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
INSERT INTO `mytrip`.`drivers` (`driverID`, `lastName`, `firstName`, `lat`, `Long`) VALUES ('3', 'Meo', 'Con', '11.966562', '106.796186');
