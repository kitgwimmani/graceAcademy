-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2024 at 02:27 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grace_academy_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `description`) VALUES
(1, 'Curriculum Resources', 'Books, pencils etc'),
(2, 'IT / Tech', 'Equipment and computers'),
(4, 'Furniture', 'Tables, Chairs, Boards, and others'),
(5, 'Specials', 'Music, Art, PE'),
(6, 'Stationaries', 'Other items like workbooks, mostly consumables'),
(7, 'Farm tools', 'tools for farm');

-- --------------------------------------------------------

--
-- Table structure for table `custodian`
--

CREATE TABLE `custodian` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `custodian`
--

INSERT INTO `custodian` (`id`, `name`, `email`) VALUES
(2, 'Bethany Mani', 'betty13@gmail.com'),
(3, 'Mani Kitgwim Christopher', 'talk2kayceenow@gmail.com'),
(5, 'Mani Kaycee', 'kitgwimmani@gmail.com'),
(6, 'Mankzo Musa', 'manzo@gmail.com'),
(12, 'King Julz', 'kingjulz@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `name`) VALUES
(1, 'Main Store Room'),
(3, 'School Library, for staff only'),
(5, 'Grade II');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `category` int(11) NOT NULL,
  `consumable` tinyint(1) NOT NULL,
  `traceable` tinyint(1) NOT NULL,
  `description` text NOT NULL,
  `expiration` tinyint(1) NOT NULL,
  `threshold` decimal(10,0) NOT NULL,
  `serial_number` varchar(60) NOT NULL,
  `isbn` varchar(60) NOT NULL,
  `subject` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `category`, `consumable`, `traceable`, `description`, `expiration`, `threshold`, `serial_number`, `isbn`, `subject`) VALUES
(1, 'Book', 1, 0, 1, 'Story Book for children', 0, '5', '1111', '1234', '1234'),
(2, 'Computer', 2, 0, 1, 'The book is green', 0, '5', '123242', '42567', '213453'),
(3, 'Football', 5, 1, 1, 'Basket ball', 0, '3', '', '', ''),
(5, 'Table', 4, 1, 0, 'black', 0, '2', '', '', ''),
(6, 'Chair', 4, 0, 1, 'Wooden', 1, '1', '', '', ''),
(7, 'testing item', 2, 1, 0, 'Just testing', 1, '3', '', '', ''),
(8, 'testing', 4, 1, 0, 'testing', 1, '5', 'rty', '567', '567'),
(9, 'check navigation', 4, 1, 0, 'just checking', 1, '4', '123456', '123456', 'matter'),
(10, 'back navigation', 4, 0, 1, 'trying inputs', 1, '4', '1324354', '243535', 'Mathematics');

-- --------------------------------------------------------

--
-- Table structure for table `receiver`
--

CREATE TABLE `receiver` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `receiver`
--

INSERT INTO `receiver` (`id`, `name`, `address`, `phone`) VALUES
(1, 'Omanko Foods', 'Omanko Foods Nigeria Limited.', '07069483199');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `address`, `phone`) VALUES
(1, 'Zenith Bank PLC', 'Beach road Jos.', '07069483199'),
(2, 'Nexus Nigeria LTD', 'Behind Rayfield road, Jos', '07095847464'),
(3, 'University of Jos, Nigeria', 'Bauchi Ring Road, Jos', '07094834635');

-- --------------------------------------------------------

--
-- Table structure for table `supply`
--

CREATE TABLE `supply` (
  `id` int(11) NOT NULL,
  `product` int(11) NOT NULL,
  `supplier` int(11) NOT NULL,
  `unit` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `expiry_date` varchar(40) NOT NULL,
  `serial_number` varchar(40) NOT NULL,
  `isbn` varchar(40) NOT NULL,
  `barcode` varchar(40) NOT NULL,
  `remark` text NOT NULL,
  `supply_date` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supply`
--

INSERT INTO `supply` (`id`, `product`, `supplier`, `unit`, `quantity`, `expiry_date`, `serial_number`, `isbn`, `barcode`, `remark`, `supply_date`) VALUES
(1, 6, 1, 3, 54, '2024-01-05', 'rt566', '3456678', '569', 'In good condition', '2024-02-07'),
(2, 2, 1, 3, 4, '2022-11-11', 'sdd', 'df', 'df', 'dfvb2', '2024-02-07'),
(8, 3, 2, 1, 2, '2024-01-13', '3456789', '234567890987', '234567898766', 'Good', '2024-02-07'),
(9, 2, 2, 3, 40, '2024-02-01', '001', '42354657869', '64758943', 'good', '2024-02-07'),
(19, 1, 2, 3, 9, '2024-02-02', 'fg', 'fghj', 'ghj', 'hjk', '2024-02-27');

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`id`, `name`, `description`) VALUES
(1, 'Packet', 'contains many item'),
(3, 'Bunch', 'Comes in 12 s'),
(5, 'Piece', 'a single unit of item');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `role` varchar(40) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `role`, `status`) VALUES
(6, 'Bethany Yitnan Mani', 'betty2021@gmail.com', 'admin', 0),
(7, 'Mitok Esther', 'esther@gmail.com', 'user', 0),
(10, 'James Ada', 'james@gmail.com', 'admin', 0),
(11, 'Daniel Jame', 'dannyjay@gmail.com', 'admin', 0),
(12, 'Victoria', 'victoria2024@gmail.com', 'user', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `custodian`
--
ALTER TABLE `custodian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `receiver`
--
ALTER TABLE `receiver`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supply`
--
ALTER TABLE `supply`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `custodian`
--
ALTER TABLE `custodian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `receiver`
--
ALTER TABLE `receiver`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `supply`
--
ALTER TABLE `supply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
