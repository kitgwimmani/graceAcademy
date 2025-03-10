-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 14, 2024 at 04:22 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `description`) VALUES
(1, 'Curriculum Resources', '-'),
(2, 'IT / Tech', '-'),
(3, 'Furnishings', '-'),
(4, 'Specials', '-'),
(5, 'Stationaries', '-');

-- --------------------------------------------------------

--
-- Table structure for table `custodian`
--

DROP TABLE IF EXISTS `custodian`;
CREATE TABLE IF NOT EXISTS `custodian` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `custodian`
--

INSERT INTO `custodian` (`id`, `name`, `email`) VALUES
(1, 'Abbah Ojah', ''),
(2, 'Achohol John', ''),
(3, 'Adamu Mary', ''),
(4, 'Adikaba Grace', ''),
(5, 'Aduka David', ''),
(6, 'Ahmadu Kefas', ''),
(7, 'Ali Solomon', ''),
(8, 'Amos Blessing', ''),
(9, 'Amunka Kefas', ''),
(10, 'Anyanwu Paschal', ''),
(11, 'Arago Yunana', ''),
(12, 'Asanato Jennifer', ''),
(13, 'Awodi-Samson Light', ''),
(14, 'Azuma Sunday', ''),
(15, 'Biwul Grayom', ''),
(16, 'Camiola John', ''),
(17, 'Camiola Missy', ''),
(18, 'Christian Peace', ''),
(19, 'Dalyop Simi', ''),
(20, 'Danjuma Christy', ''),
(21, 'Danladi Tryphena', ''),
(22, 'Digges Rachelle', ''),
(23, 'Edet Andrew', ''),
(24, 'Emmanuel Zipporah', ''),
(25, 'Faruk Tijani', ''),
(38, 'Francis Bernard', ''),
(39, 'Fwangshak Na\'anle', ''),
(40, 'Hamman Hauwa', ''),
(41, 'Hassan Bikut', ''),
(42, 'Ibrahim Fawole', ''),
(43, 'Ibrahim Tong', ''),
(44, 'Imil Matthew', ''),
(45, 'James Manji', ''),
(46, 'John Dorcas', ''),
(47, 'Kembo Haruna', ''),
(48, 'Luka Clement', ''),
(49, 'Makawo Haruna', ''),
(50, 'Micah Godiya', ''),
(51, 'Obilor Chisom', ''),
(52, 'Okwa Felix', ''),
(53, 'Orkuma Daniel', ''),
(54, 'Peter Sarah', ''),
(55, 'Phillips Elizabeth', ''),
(56, 'Rabwo Beatrice', ''),
(57, 'Samuel Stephen', ''),
(58, 'Sheneni Reuben', ''),
(59, 'Sofoluwe Grace', ''),
(60, 'Tang\'an Faith', ''),
(61, 'Thomas Dorcas', ''),
(62, 'Udo Kokomma', ''),
(63, 'Vwampe Luka', ''),
(64, 'Williams Victoria', '');

-- --------------------------------------------------------

--
-- Table structure for table `damage_category`
--

DROP TABLE IF EXISTS `damage_category`;
CREATE TABLE IF NOT EXISTS `damage_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `remark` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `damage_category`
--

INSERT INTO `damage_category` (`id`, `date`, `product_id`, `unit_id`, `quantity`, `remark`) VALUES
(4, '2024-11-19 23:00:00', 15, 2, 1, 'water spillage');

-- --------------------------------------------------------

--
-- Stand-in structure for view `damage_items`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `damage_items`;
CREATE TABLE IF NOT EXISTS `damage_items` (
`product_id` int(11)
,`product` varchar(80)
,`unit` varchar(80)
,`quantity` int(11)
,`remark` text
,`date` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `expiration_status`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `expiration_status`;
CREATE TABLE IF NOT EXISTS `expiration_status` (
`id` int(11)
,`product` varchar(80)
,`name` varchar(80)
,`quantity` int(11)
,`expiry_date` varchar(40)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `inventory`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `inventory`;
CREATE TABLE IF NOT EXISTS `inventory` (
`id` int(11)
,`product_id` int(11)
,`date` varchar(40)
,`item` varchar(80)
,`category` varchar(80)
,`supplier` varchar(80)
,`unit_id` int(11)
,`unit` varchar(80)
,`quantity` int(11)
,`expiry_date` varchar(40)
,`serial_number` varchar(60)
,`barcode` text
,`remark` text
);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `name`) VALUES
(1, 'Kindergarten'),
(2, '1st Grade'),
(3, '2nd Grade'),
(4, '3rd Grade'),
(5, '4th Grade'),
(6, '5th Grade'),
(7, '6th Grade'),
(8, '7th Grade'),
(9, '8th Grade');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `category` int(11) NOT NULL,
  `consumable` tinyint(1) NOT NULL,
  `traceable` tinyint(1) NOT NULL,
  `description` text NOT NULL,
  `expiration` tinyint(1) NOT NULL,
  `threshold` int(11) NOT NULL,
  `serial_number` varchar(60) NOT NULL,
  `isbn` varchar(60) NOT NULL,
  `barcode` text NOT NULL,
  `subject` text NOT NULL,
  `pub_brand` text NOT NULL,
  `reorder_url` text NOT NULL,
  `reorder_status` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `category`, `consumable`, `traceable`, `description`, `expiration`, `threshold`, `serial_number`, `isbn`, `barcode`, `subject`, `pub_brand`, `reorder_url`, `reorder_status`) VALUES
(14, 'Pencil', 1, 1, 1, 'Yellow', 1, 5, '35654', '13456', '15744', 'All', 'HB Pencil', 'hbeepencil.com', 0),
(15, 'Workbook', 1, 1, 0, 'Books for tracing', 0, 20, '45635', '354735', '34575', 'Mathematics', 'IEEE', 'ieee.com', 0),
(16, 'Fundamentals of Basic Science', 1, 0, 1, 'Green Book', 0, 10, '23002', '978-1771646792', '344557', 'Basic Science', 'Metropolitan Publishers', 'amazon.com', 0),
(17, 'English Textbook', 1, 0, 1, 'Green Back', 0, 5, '2399476', '46578363', '567787', 'English Language', 'New Books', 'newbooks.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `receiver`
--

DROP TABLE IF EXISTS `receiver`;
CREATE TABLE IF NOT EXISTS `receiver` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `receiver`
--

INSERT INTO `receiver` (`id`, `name`, `address`, `phone`) VALUES
(1, 'Omanko Foods', 'Omanko Foods Nigeria Limited.', '07069483199');

-- --------------------------------------------------------

--
-- Stand-in structure for view `stock_level`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `stock_level`;
CREATE TABLE IF NOT EXISTS `stock_level` (
`id` int(11)
,`name` varchar(80)
,`serial_number` varchar(60)
,`isbn` varchar(60)
,`threshold` int(11)
,`quantity` int(11)
,`quantity_below` bigint(12)
,`reorder_url` text
,`reorder_status` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) NOT NULL,
  `surname` text NOT NULL,
  `firstname` text NOT NULL,
  `middlename` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
CREATE TABLE IF NOT EXISTS `supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `address`, `phone`) VALUES
(1, 'Zenith Bank PLC', 'Beach road Jos.', '07069483199'),
(2, 'Missy Camiola - CEO', 'Grace Academy', '012345678'),
(3, 'University of Jos, Nigeria', 'Bauchi Ring Road, Jos', '07094834635'),
(4, 'GHAA', 'ghaa', '085957493930');

-- --------------------------------------------------------

--
-- Table structure for table `supply`
--

DROP TABLE IF EXISTS `supply`;
CREATE TABLE IF NOT EXISTS `supply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product` int(11) NOT NULL,
  `supplier` int(11) NOT NULL,
  `unit` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `expiry_date` varchar(40) NOT NULL,
  `serial_number` varchar(40) NOT NULL,
  `isbn` varchar(40) NOT NULL,
  `barcode` varchar(40) NOT NULL,
  `remark` text NOT NULL,
  `supply_date` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supply`
--

INSERT INTO `supply` (`id`, `product`, `supplier`, `unit`, `quantity`, `expiry_date`, `serial_number`, `isbn`, `barcode`, `remark`, `supply_date`) VALUES
(34, 14, 3, 4, 1, '', '35654', '13456', '15744', 'Good work', '2024-11-19'),
(35, 15, 2, 2, 50, '', '45635', '354735', '34575', 'updated', '2024-11-19'),
(36, 15, 3, 1, 4, '', '45635', '354735', '34575', 'sent', '2024-11-19'),
(37, 16, 2, 2, 8, '', '23002', '978-1771646792', '344557', 'There are 2 books pending', '2024-11-20'),
(38, 17, 2, 2, 10, '', '2399476', '46578363', '567787', 'expecting 3 more', '2024-11-20');

-- --------------------------------------------------------

--
-- Stand-in structure for view `supply_report`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `supply_report`;
CREATE TABLE IF NOT EXISTS `supply_report` (
`id` int(11)
,`item` varchar(80)
,`supplier` varchar(80)
,`unit` varchar(80)
,`quantity` int(11)
,`serial_number` varchar(40)
,`isbn` varchar(40)
,`barcode` varchar(40)
,`remark` text
,`supply_date` varchar(40)
);

-- --------------------------------------------------------

--
-- Table structure for table `transfer`
--

DROP TABLE IF EXISTS `transfer`;
CREATE TABLE IF NOT EXISTS `transfer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` text NOT NULL,
  `location_id` text NOT NULL,
  `custodian_id` text NOT NULL,
  `date_moved` text NOT NULL,
  `date_expected` text NOT NULL,
  `user_id` text NOT NULL,
  `unit_id` text NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`id`, `product_id`, `location_id`, `custodian_id`, `date_moved`, `date_expected`, `user_id`, `unit_id`, `quantity`) VALUES
(20, '14', '2', '1', '2024-11-28', '2024-11-14', '1', '4', 1),
(21, '15', '6', '3', '2024-11-22', '2024-11-29', '1', '1', 1),
(22, '15', '1', '63', '2024-11-20', '2024-11-29', '1', '1', 1),
(23, '17', '6', '4', '2024-11-20', '2024-11-22', '1', '2', 2),
(24, '17', '4', '7', '2024-11-20', '2024-11-28', '1', '2', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `transfer_details`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `transfer_details`;
CREATE TABLE IF NOT EXISTS `transfer_details` (
`id` text
,`product` varchar(80)
,`location` varchar(60)
,`custodian` varchar(80)
,`date_moved` text
,`date_expected` text
,`auth` varchar(30)
,`quantity` int(11)
,`unit` varchar(80)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `transfer_report`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `transfer_report`;
CREATE TABLE IF NOT EXISTS `transfer_report` (
`id` int(11)
,`product` varchar(80)
,`serial_number` varchar(60)
,`isbn` varchar(60)
,`barcode` text
,`category` varchar(80)
,`location` varchar(60)
,`custodian` varchar(80)
,`date_moved` text
,`date_expected` text
,`unit` varchar(80)
,`quantity` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
CREATE TABLE IF NOT EXISTS `unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`id`, `name`, `description`) VALUES
(1, 'Box-240', 'Box of 240'),
(2, 'Book', 'Single Unit'),
(3, 'Box-800', 'Box of 800'),
(4, 'Set-10', 'Set of 10'),
(5, 'Box-12 - Sets', 'Box of 12 Sets');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `role` varchar(40) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `role`, `status`, `password`) VALUES
(1, 'Mitok Esther', 'esther@gmail.com', 'User', 0, '$2b$10$SXCH3z65a9ntiIoSOo7nO.xzrHbv7jcur3dzVfbQLOXWVtPAA9/du'),
(2, 'James Ada', 'james@gmail.com', 'Admin', 0, '$2b$10$SXCH3z65a9ntiIoSOo7nO.xzrHbv7jcur3dzVfbQLOXWVtPAA9/du'),
(3, 'Victoria', 'victoria2024@gmail.com', 'user', 0, '$2b$10$SXCH3z65a9ntiIoSOo7nO.xzrHbv7jcur3dzVfbQLOXWVtPAA9/du'),
(4, 'Kaycee', 'kitgwim@gmail.com', 'admin', 0, '$2b$10$MheKal1x/ggcrMezSiPxl.LPQs15gHEJlaq7WJdxN8Db5QESGnpaK'),
(5, 'Agatha', 'agatha@gmail.com', 'user', 0, '$2b$10$SXCH3z65a9ntiIoSOo7nO.xzrHbv7jcur3dzVfbQLOXWVtPAA9/du');

-- --------------------------------------------------------

--
-- Structure for view `damage_items`
--
DROP TABLE IF EXISTS `damage_items`;

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `damage_items`  AS  select `p`.`id` AS `product_id`,`p`.`name` AS `product`,`u`.`name` AS `unit`,`d`.`quantity` AS `quantity`,`d`.`remark` AS `remark`,`d`.`date` AS `date` from ((`product` `p` join `unit` `u`) join `damage_category` `d`) where `p`.`id` = `d`.`product_id` and `u`.`id` = `d`.`unit_id` ;

-- --------------------------------------------------------

--
-- Structure for view `expiration_status`
--
DROP TABLE IF EXISTS `expiration_status`;

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `expiration_status`  AS  select `p`.`id` AS `id`,`p`.`name` AS `product`,`u`.`name` AS `name`,`supply`.`quantity` AS `quantity`,`supply`.`expiry_date` AS `expiry_date` from ((`product` `p` join `unit` `u`) join `supply`) where `u`.`id` = `supply`.`unit` and `p`.`expiration` < curdate() group by `supply`.`product` ;

-- --------------------------------------------------------

--
-- Structure for view `inventory`
--
DROP TABLE IF EXISTS `inventory`;

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `inventory`  AS  select `supply`.`id` AS `id`,`supply`.`product` AS `product_id`,`supply`.`supply_date` AS `date`,`p`.`name` AS `item`,`c`.`name` AS `category`,`s`.`name` AS `supplier`,`u`.`id` AS `unit_id`,`u`.`name` AS `unit`,`supply`.`quantity` AS `quantity`,`supply`.`expiry_date` AS `expiry_date`,`p`.`serial_number` AS `serial_number`,`p`.`barcode` AS `barcode`,`supply`.`remark` AS `remark` from ((((`product` `p` join `supply`) join `supplier` `s`) join `unit` `u`) join `category` `c`) where `supply`.`product` = `p`.`id` and `supply`.`supplier` = `s`.`id` and `supply`.`unit` = `u`.`id` and `p`.`category` = `c`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `stock_level`
--
DROP TABLE IF EXISTS `stock_level`;

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `stock_level`  AS  select `p`.`id` AS `id`,`i`.`item` AS `name`,`p`.`serial_number` AS `serial_number`,`p`.`isbn` AS `isbn`,`p`.`threshold` AS `threshold`,`i`.`quantity` AS `quantity`,`i`.`quantity` - `p`.`threshold` AS `quantity_below`,`p`.`reorder_url` AS `reorder_url`,`p`.`reorder_status` AS `reorder_status` from (`inventory` `i` join `product` `p`) where `i`.`product_id` = `p`.`id` group by `p`.`name` ;

-- --------------------------------------------------------

--
-- Structure for view `supply_report`
--
DROP TABLE IF EXISTS `supply_report`;

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `supply_report`  AS  select `supply`.`id` AS `id`,`p`.`name` AS `item`,`s`.`name` AS `supplier`,`u`.`name` AS `unit`,`supply`.`quantity` AS `quantity`,`supply`.`serial_number` AS `serial_number`,`supply`.`isbn` AS `isbn`,`supply`.`barcode` AS `barcode`,`supply`.`remark` AS `remark`,`supply`.`supply_date` AS `supply_date` from (((`product` `p` join `supply`) join `supplier` `s`) join `unit` `u`) where `supply`.`product` = `p`.`id` and `supply`.`supplier` = `s`.`id` and `supply`.`unit` = `u`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `transfer_details`
--
DROP TABLE IF EXISTS `transfer_details`;

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `transfer_details`  AS  select `t`.`product_id` AS `id`,`p`.`name` AS `product`,`l`.`name` AS `location`,`c`.`name` AS `custodian`,`t`.`date_moved` AS `date_moved`,`t`.`date_expected` AS `date_expected`,`u`.`name` AS `auth`,`t`.`quantity` AS `quantity`,`unit`.`name` AS `unit` from (((((`transfer` `t` join `product` `p`) join `location` `l`) join `custodian` `c`) join `user` `u`) join `unit`) where `t`.`product_id` = `p`.`id` and `t`.`location_id` = `l`.`id` and `t`.`custodian_id` = `c`.`id` and `t`.`unit_id` = `unit`.`id` and `t`.`user_id` = `u`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `transfer_report`
--
DROP TABLE IF EXISTS `transfer_report`;

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `transfer_report`  AS  select `transfer`.`id` AS `id`,`p`.`name` AS `product`,`p`.`serial_number` AS `serial_number`,`p`.`isbn` AS `isbn`,`p`.`barcode` AS `barcode`,`cat`.`name` AS `category`,`l`.`name` AS `location`,`c`.`name` AS `custodian`,`transfer`.`date_moved` AS `date_moved`,`transfer`.`date_expected` AS `date_expected`,`u`.`name` AS `unit`,`transfer`.`quantity` AS `quantity` from (((((`product` `p` join `location` `l`) join `transfer`) join `custodian` `c`) join `unit` `u`) join `category` `cat`) where `p`.`id` = `transfer`.`product_id` and `l`.`id` = `transfer`.`location_id` and `c`.`id` = `transfer`.`custodian_id` and `u`.`id` = `transfer`.`user_id` and `cat`.`id` = `p`.`category` ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
