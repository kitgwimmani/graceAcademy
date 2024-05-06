-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 06, 2024 at 12:23 AM
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
(16, 'Adikaba Grace', ''),
(17, 'Aduka David', ''),
(18, 'Ahmadu Kefas', ''),
(19, 'Ali Solomon', ''),
(20, 'Amos Blessing', ''),
(21, 'Amunka Kefas', ''),
(22, 'Anyanwu Paschal', ''),
(23, 'Arago Yunana', ''),
(24, 'Asanato Jennifer', ''),
(25, 'Awodi-Samson Light', ''),
(26, 'Azuma Sunday', ''),
(27, 'Biwul Grayom', ''),
(28, 'Camiola John', ''),
(29, 'Camiola Missy', ''),
(30, 'Christian Peace', ''),
(31, 'Dalyop Simi', ''),
(32, 'Danjuma Christy', ''),
(33, 'Danladi Tryphena', ''),
(34, 'Digges Rachelle', ''),
(35, 'Edet Andrew', ''),
(36, 'Emmanuel Zipporah', ''),
(37, 'Faruk Tijani', ''),
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
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `damage_category`
--

INSERT INTO `damage_category` (`id`, `name`) VALUES
(1, 'Fire'),
(2, 'Water spillage'),
(3, 'Turn');

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
(6, '2nd Grade'),
(7, '3rd Grade'),
(8, '4th Grade'),
(9, '5th Grade'),
(10, '6th Grade'),
(11, '7th Grade'),
(12, '8th Grade');

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `category`, `consumable`, `traceable`, `description`, `expiration`, `threshold`, `serial_number`, `isbn`, `barcode`, `subject`, `pub_brand`, `reorder_url`, `reorder_status`) VALUES
(2, 'Computer', 2, 0, 1, 'The book is green', 0, 5, '123242', '', '756647', '', '', 'www.facebook.com', 0),
(3, 'Book', 2, 0, 1, 'Story Book for children', 0, 5, '1111', '1234', '111111', '', 'Hogos', 'www.google.com', 0),
(5, 'Table', 4, 1, 0, 'black', 0, 2, '', '', '9866', '', '', 'www.kaggle.com', 0),
(6, 'Chair', 4, 0, 1, 'Wooden', 1, 1, '', '', '222222', '', '', 'www.data.net', 0),
(7, 'testing item', 4, 1, 0, 'Just testing', 1, 3, '', '', '7363526', '', '', 'graceacademy.com', 0),
(9, 'check navigation', 4, 1, 0, 'just checking', 1, 4, '123456', '', '5645675', '', '', 'database.net', 0),
(10, 'back navigation', 4, 0, 1, 'trying inputs', 1, 4, '1324355', '', '1234567', '', '', 'input.org', 0),
(11, 'Football', 10, 0, 1, 'football', 0, 2, '', '', '7777777', '', '', 'data.info', 0),
(12, 'new', 3, 1, 0, '12', 1, 13, '12', '12', '12', '23', '22222222', '22', 0),
(13, 'new db', 2, 1, 0, 'Good devices', 1, 20, '12553777', '22341', '12345', 'Mathematics', 'Jos Publishing', 'www.cloudsync.cm.ng', 0);

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
`name` varchar(80)
,`serial_number` varchar(60)
,`isbn` varchar(60)
,`threshold` int(11)
,`quantity` int(11)
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `address`, `phone`) VALUES
(1, 'Zenith Bank PLC', 'Beach road Jos.', '07069483199'),
(2, 'Missy Camiola - CEO', 'Grace Academy', '012345678'),
(3, 'University of Jos, Nigeria', 'Bauchi Ring Road, Jos', '07094834635');

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supply`
--

INSERT INTO `supply` (`id`, `product`, `supplier`, `unit`, `quantity`, `expiry_date`, `serial_number`, `isbn`, `barcode`, `remark`, `supply_date`) VALUES
(1, 2, 3, 3, 1, '2024-01-05', '3', '1', '1', 'working', '2024-04-01'),
(2, 2, 1, 3, 4, '2022-11-11', 'sdd', 'df', 'df', 'dfvb2', '2024-02-07'),
(8, 3, 2, 1, 2, '2024-01-13', '3456789', '234567890987', '234567898766', 'Good', '2024-02-07'),
(9, 2, 2, 3, 40, '2024-02-01', '001', '42354657869', '64758943', 'good', '2024-02-07'),
(19, 1, 2, 3, 9, '2024-02-02', 'fg', 'fghj', 'ghj', 'hjk', '2024-02-27'),
(23, 3, 3, 5, 2, '2024-03-21', '1234323', '234567', '235467892', 'hshhff', '2024-03-13'),
(24, 2, 1, 5, 31, '2024-03-10', '12345678', '3567893', '256347', 'nice', '2024-03-03'),
(25, 5, 2, 5, 4, '', '12345', '346575', '46578', 'good', '2024-03-03'),
(26, 2, 2, 5, 7, '', '6789', '7890', '6789', 'In good condition', '2023-03-03'),
(28, 2, 2, 1, 1, '2024-03-07', '123456', '123456', '123456', 'good', '2024-03-07');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`id`, `product_id`, `location_id`, `custodian_id`, `date_moved`, `date_expected`, `user_id`, `unit_id`, `quantity`) VALUES
(1, '2', '2', '2', '2023-04-05', '2024-03-01', '1', '5', 3);

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
(3, 'Book', 'Single Unit'),
(5, 'Box-800', 'Box of 800'),
(6, 'Set-10', 'Set of 10'),
(7, 'Box-12 - Sets', 'Box of 12 Sets');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `role`, `status`) VALUES
(7, 'Mitok Esther', 'esther@gmail.com', 'Admin', 0),
(10, 'James Ada', 'james@gmail.com', 'Admin', 0),
(12, 'Victoria', 'victoria2024@gmail.com', 'user', 0),
(13, 'Kaycee', 'kitgwim@gmail.com', 'admin', 0),
(14, 'Agatha', 'agatha@gmail.com', 'user', 0);

-- --------------------------------------------------------

--
-- Structure for view `expiration_status`
--
DROP TABLE IF EXISTS `expiration_status`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `expiration_status`  AS  select `p`.`id` AS `id`,`p`.`name` AS `product`,`u`.`name` AS `name`,`supply`.`quantity` AS `quantity`,`supply`.`expiry_date` AS `expiry_date` from ((`product` `p` join `unit` `u`) join `supply`) where `u`.`id` = `supply`.`unit` and `p`.`expiration` < curdate() group by `supply`.`product` ;

-- --------------------------------------------------------

--
-- Structure for view `inventory`
--
DROP TABLE IF EXISTS `inventory`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `inventory`  AS  select `supply`.`id` AS `id`,`supply`.`product` AS `product_id`,`supply`.`supply_date` AS `date`,`p`.`name` AS `item`,`c`.`name` AS `category`,`s`.`name` AS `supplier`,`u`.`name` AS `unit`,`supply`.`quantity` AS `quantity`,`supply`.`expiry_date` AS `expiry_date`,`p`.`serial_number` AS `serial_number`,`p`.`barcode` AS `barcode`,`supply`.`remark` AS `remark` from ((((`product` `p` join `supply`) join `supplier` `s`) join `unit` `u`) join `category` `c`) where `supply`.`product` = `p`.`id` and `supply`.`supplier` = `s`.`id` and `supply`.`unit` = `u`.`id` and `p`.`category` = `c`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `stock_level`
--
DROP TABLE IF EXISTS `stock_level`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `stock_level`  AS  select `i`.`item` AS `name`,`p`.`serial_number` AS `serial_number`,`p`.`isbn` AS `isbn`,`p`.`threshold` AS `threshold`,`i`.`quantity` AS `quantity`,`p`.`reorder_url` AS `reorder_url`,`p`.`reorder_status` AS `reorder_status` from (`inventory` `i` join `product` `p`) where `i`.`product_id` = `p`.`id` group by `p`.`name` ;

-- --------------------------------------------------------

--
-- Structure for view `supply_report`
--
DROP TABLE IF EXISTS `supply_report`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `supply_report`  AS  select `supply`.`id` AS `id`,`p`.`name` AS `item`,`s`.`name` AS `supplier`,`u`.`name` AS `unit`,`supply`.`quantity` AS `quantity`,`supply`.`serial_number` AS `serial_number`,`supply`.`isbn` AS `isbn`,`supply`.`barcode` AS `barcode`,`supply`.`remark` AS `remark`,`supply`.`supply_date` AS `supply_date` from (((`product` `p` join `supply`) join `supplier` `s`) join `unit` `u`) where `supply`.`product` = `p`.`id` and `supply`.`supplier` = `s`.`id` and `supply`.`unit` = `u`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `transfer_report`
--
DROP TABLE IF EXISTS `transfer_report`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `transfer_report`  AS  select `transfer`.`id` AS `id`,`p`.`name` AS `product`,`p`.`serial_number` AS `serial_number`,`p`.`isbn` AS `isbn`,`p`.`barcode` AS `barcode`,`cat`.`name` AS `category`,`l`.`name` AS `location`,`c`.`name` AS `custodian`,`transfer`.`date_moved` AS `date_moved`,`transfer`.`date_expected` AS `date_expected`,`u`.`name` AS `unit`,`transfer`.`quantity` AS `quantity` from (((((`product` `p` join `location` `l`) join `transfer`) join `custodian` `c`) join `unit` `u`) join `category` `cat`) where `p`.`id` = `transfer`.`product_id` and `l`.`id` = `transfer`.`location_id` and `c`.`id` = `transfer`.`custodian_id` and `u`.`id` = `transfer`.`user_id` and `cat`.`id` = `p`.`category` ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
