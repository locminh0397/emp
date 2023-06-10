-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2023 at 10:38 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee`
--

-- --------------------------------------------------------

--
-- Table structure for table `bangcap`
--

CREATE TABLE `bangcap` (
  `id` int(11) NOT NULL,
  `MaBC` varchar(20) NOT NULL,
  `SoQD` varchar(20) NOT NULL,
  `TenBC` varchar(50) NOT NULL,
  `LoaiBC` varchar(50) NOT NULL,
  `ChuyenNganh` varchar(50) NOT NULL,
  `HinhThuc` varchar(50) DEFAULT NULL,
  `XepLoai` varchar(30) NOT NULL,
  `DiemSo` varchar(10) NOT NULL,
  `NgayKy` date NOT NULL,
  `HieuLuc` varchar(20) NOT NULL,
  `ToChuc` varchar(50) NOT NULL,
  `DiaChi` varchar(100) NOT NULL,
  `GhiChu` varchar(255) DEFAULT NULL,
  `TrangThai` varchar(20) NOT NULL DEFAULT 'Còn hiệu lực',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `baohiem`
--

CREATE TABLE `baohiem` (
  `id` int(11) NOT NULL,
  `MaBH` varchar(30) NOT NULL,
  `NgayBD` date NOT NULL,
  `MucDong` varchar(30) NOT NULL,
  `PhanTramLD` varchar(10) NOT NULL,
  `PhanTramCT` varchar(10) NOT NULL,
  `NhanVienDong` varchar(20) NOT NULL,
  `TrangThai` varchar(30) NOT NULL DEFAULT 'Còn hiệu lực',
  `GhiChu` varchar(255) DEFAULT NULL,
  `NguoiThucHien` varchar(255) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `baohiem`
--

INSERT INTO `baohiem` (`id`, `MaBH`, `NgayBD`, `MucDong`, `PhanTramLD`, `PhanTramCT`, `NhanVienDong`, `TrangThai`, `GhiChu`, `NguoiThucHien`, `idNhanVien`, `createdAt`, `updatedAt`) VALUES
(2, '1312433564', '2023-04-13', '5000000', '10', '18', '500000', 'Còn hiệu lực', '', 'Nguyễn Văn A', 2, '2023-04-26 15:15:08', '2023-04-26 15:15:08');

-- --------------------------------------------------------

--
-- Table structure for table `chamcong`
--

CREATE TABLE `chamcong` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `Ngay` date NOT NULL,
  `GioVao` time DEFAULT NULL,
  `GioRa` time DEFAULT NULL,
  `TongGio` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chamcong`
--

INSERT INTO `chamcong` (`id`, `idNhanVien`, `Ngay`, `GioVao`, `GioRa`, `TongGio`, `createdAt`, `updatedAt`) VALUES
(15, 2, '2023-08-09', '06:57:42', '10:57:51', '4.0025', '2023-05-04 15:26:46', '2023-05-04 15:26:46'),
(16, 2, '2023-08-10', '06:56:21', '10:55:47', '3.9902777777777776', '2023-05-04 15:26:46', '2023-05-04 15:26:46'),
(17, 2, '2023-08-11', '06:56:48', '11:03:03', '4.104166666666667', '2023-05-04 15:26:46', '2023-05-04 15:26:46'),
(18, 2, '2023-08-13', '06:50:56', '10:56:13', '4.087777777777778', '2023-05-04 15:26:46', '2023-05-04 15:26:46'),
(19, 2, '2023-08-14', '06:53:12', '11:02:33', '4.155833333333334', '2023-05-04 15:26:46', '2023-05-04 15:26:46'),
(20, 2, '2023-08-15', '06:49:24', '08:45:59', '1.9430555555555555', '2023-05-04 15:26:46', '2023-05-04 15:26:46'),
(21, 2, '2023-08-16', '06:52:27', '06:52:27', '0', '2023-05-04 15:26:46', '2023-05-04 15:26:46'),
(33, 2, '2023-05-04', '10:04:07', '15:05:13', '5.018333333333334', '2023-05-06 15:04:13', '2023-05-06 15:04:29'),
(39, 2, '2023-05-17', '08:00:00', '15:00:00', '7', '2023-05-17 01:45:36', '2023-05-17 01:45:36'),
(40, 2, '2023-05-24', '08:00:00', '17:00:00', '9', '2023-05-24 07:16:48', '2023-05-24 07:16:48');

-- --------------------------------------------------------

--
-- Table structure for table `chucvu`
--

CREATE TABLE `chucvu` (
  `id` int(11) NOT NULL,
  `MaChucVu` varchar(10) NOT NULL,
  `TenChucVu` varchar(30) NOT NULL,
  `MoTa` text DEFAULT NULL,
  `NhiemVu` varchar(255) DEFAULT NULL,
  `NguoiTao` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chucvu`
--

INSERT INTO `chucvu` (`id`, `MaChucVu`, `TenChucVu`, `MoTa`, `NhiemVu`, `NguoiTao`, `createdAt`, `updatedAt`) VALUES
(1, 'MCV2415817', 'Trưởng phòng', '', 'Có chức năng quản lý phòng ban', 'Nguyễn Văn A', '2023-04-23 09:19:54', '2023-05-08 03:06:09'),
(2, 'MCV2431941', 'Nhân viên', '', 'Có chức năng làm việc tạo năng suất cho công ty', 'Nguyen Van A', '2023-04-23 09:46:46', '2023-04-23 09:46:46'),
(3, 'MCV2432195', 'Giám đốc', '', 'Trưởng 1 bộ phận của công ty', 'Nguyen Van A', '2023-04-23 09:47:17', '2023-04-23 09:47:17'),
(5, 'MCV3047895', 'Bảo vệ', '', 'Có chức năng giữ gìn tài sản công ty', 'Nguyễn Văn A', '2023-04-24 02:53:30', '2023-04-24 02:53:30');

-- --------------------------------------------------------

--
-- Table structure for table `hopdong`
--

CREATE TABLE `hopdong` (
  `id` int(11) NOT NULL,
  `idDaiDien` int(11) NOT NULL,
  `MaHD` varchar(20) NOT NULL,
  `TenHD` varchar(30) NOT NULL,
  `LoaiHD` varchar(100) NOT NULL,
  `ThoiHan` varchar(30) NOT NULL,
  `LuongCoBan` varchar(20) NOT NULL,
  `HeSoLuong` float NOT NULL,
  `CachTra` varchar(20) NOT NULL,
  `VaoNgay` varchar(20) NOT NULL,
  `NoiDung` text DEFAULT NULL,
  `TrangThai` varchar(30) NOT NULL DEFAULT 'Còn hiệu lực',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hopdong`
--

INSERT INTO `hopdong` (`id`, `idDaiDien`, `MaHD`, `TenHD`, `LoaiHD`, `ThoiHan`, `LuongCoBan`, `HeSoLuong`, `CachTra`, `VaoNgay`, `NoiDung`, `TrangThai`, `createdAt`, `updatedAt`, `idNhanVien`) VALUES
(4, 1, 'MHD305256945', 'Hợp đồng lao động', 'Hợp đồng xác định thời hạn', '1 Năm', '500000', 1.5, 'Trả bằng tiền mặt', '10', NULL, 'Còn hiệu lực', '2023-05-08 09:29:19', '2023-05-08 09:29:19', 2);

-- --------------------------------------------------------

--
-- Table structure for table `khenthuong`
--

CREATE TABLE `khenthuong` (
  `id` int(11) NOT NULL,
  `MaKT` varchar(30) NOT NULL,
  `SoQD` varchar(10) NOT NULL,
  `NgayQD` date NOT NULL,
  `TieuDe` varchar(50) NOT NULL,
  `NoiDung` text NOT NULL,
  `Thang` varchar(5) NOT NULL,
  `TienThuong` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khenthuong`
--

INSERT INTO `khenthuong` (`id`, `MaKT`, `SoQD`, `NgayQD`, `TieuDe`, `NoiDung`, `Thang`, `TienThuong`, `createdAt`, `updatedAt`) VALUES
(1, 'MKT304843078', 'QĐ 121', '2023-04-13', 'Thưởng tháng đạt KPI xuất sắc', '<p>Thưởng tháng đạt KPI xuất sắc</p>', '4', '10000000', '2023-04-24 02:54:36', '2023-05-07 16:55:49');

-- --------------------------------------------------------

--
-- Table structure for table `kyluat`
--

CREATE TABLE `kyluat` (
  `id` int(11) NOT NULL,
  `MaKL` varchar(30) NOT NULL,
  `SoQD` varchar(10) NOT NULL,
  `NgayQD` date NOT NULL,
  `TieuDe` varchar(30) NOT NULL,
  `NoiDung` text NOT NULL,
  `Thang` varchar(5) NOT NULL,
  `TienPhat` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kyluat`
--

INSERT INTO `kyluat` (`id`, `MaKL`, `SoQD`, `NgayQD`, `TieuDe`, `NoiDung`, `Thang`, `TienPhat`, `createdAt`, `updatedAt`) VALUES
(1, 'MKL478968715', 'QD 232', '2023-05-01', 'Kỷ luật nhân viên đi làm trễ ', '<p>Kỷ luật nhân viên đi làm trễ&nbsp;</p>', '5', '500000', '2023-05-07 17:03:31', '2023-05-07 17:03:31'),
(2, 'MKL479013473', 'QĐ 223', '2023-05-02', 'Kỷ luật nhân viên có KPI không', '<p>Kỷ luật nhân viên có KPI không đạt tháng 4</p>', '4', '0', '2023-05-07 17:04:14', '2023-05-07 17:04:14'),
(3, 'MKL911502107', 'KL-10', '2023-05-24', 'Kỷ luật nhân viên đi làm muộn', '<p>Đi muộn 5 ngày</p>', '5', '100000', '2023-05-24 06:59:06', '2023-05-24 06:59:06');

-- --------------------------------------------------------

--
-- Table structure for table `lichsuchamcong`
--

CREATE TABLE `lichsuchamcong` (
  `id` int(11) NOT NULL,
  `TenFile` varchar(50) NOT NULL,
  `NgayBatDau` date NOT NULL,
  `NgayKetThuc` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lichsuchamcong`
--

INSERT INTO `lichsuchamcong` (`id`, `TenFile`, `NgayBatDau`, `NgayKetThuc`, `createdAt`, `updatedAt`) VALUES
(1, 'CB5FB000.xlsx', '2023-05-01', '2023-08-29', '2023-05-04 15:26:46', '2023-05-04 15:26:46'),
(2, 'CB5FB000.xlsx', '2023-08-29', '2023-09-20', '2023-05-04 15:28:28', '2023-05-04 15:28:28'),
(3, 'CB5FB000.xlsx', '2023-05-16', '2023-06-05', '2023-05-06 15:14:33', '2023-05-06 15:14:33');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `id` int(11) NOT NULL,
  `HoTen` varchar(255) NOT NULL,
  `NgaySinh` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `GioiTinh` varchar(255) NOT NULL,
  `HonNhan` varchar(50) NOT NULL,
  `DanToc` varchar(50) NOT NULL,
  `QuocTich` varchar(50) NOT NULL,
  `TonGiao` varchar(50) NOT NULL,
  `SoDT` varchar(30) NOT NULL,
  `QueQuan` varchar(60) NOT NULL,
  `NoiO` varchar(60) NOT NULL,
  `HoKhau` varchar(60) NOT NULL,
  `CCCD` varchar(30) NOT NULL,
  `NgayCap` date NOT NULL,
  `NoiCap` varchar(60) NOT NULL,
  `TinhTrang` varchar(255) NOT NULL DEFAULT 'Đang Làm Việc',
  `HinhAnh` varchar(255) NOT NULL DEFAULT 'public/assets/avatar.jpg',
  `isAdmin` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idPhongBan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`id`, `HoTen`, `NgaySinh`, `Email`, `Password`, `GioiTinh`, `HonNhan`, `DanToc`, `QuocTich`, `TonGiao`, `SoDT`, `QueQuan`, `NoiO`, `HoKhau`, `CCCD`, `NgayCap`, `NoiCap`, `TinhTrang`, `HinhAnh`, `isAdmin`, `createdAt`, `updatedAt`, `idPhongBan`) VALUES
(2, 'Nguyễn Văn B', '2023-03-30', 'nhanvien1@gmail.com', '$2a$10$ot1/xq7IQHenzJwHUC5XEOaI5IV63fvFy0Z07CX83WtYp1TCCzH1S', 'Nam', 'Độc thân', 'Kinh', 'Việt Nam', 'Không', '0123456789', 'Hà Nội', 'Hà Nội', 'Hà Nội', '204198324197', '2023-04-13', 'Hà Nội', 'Đang Làm Việc', 'banner-1.jpg', 0, '2023-04-23 09:49:13', '2023-04-24 02:52:02', 1),
(8, 'Nguyễn Văn A', '2001-01-01', 'nguyenvana@gmail.com', '$2b$10$8NluJmlobpfdpQ.un4aeteSIwUXlkttX2CDnTbEJgZmjn5YEHpSQa', 'Nam', 'Độc thân', 'Kinh', 'VN', 'Không', '0123456789', 'Hà Nội', 'Hà Nội', 'Hà Nội', '012345678912', '2016-01-01', 'Hà Nội', 'Đang Làm Việc', 'avatar.png', 0, '2023-05-24 07:02:33', '2023-05-24 07:02:33', 1),
(9, 'Admin Manager', '2001-01-01', 'admin@gmail.com', '$2b$10$c58LQlR2xp0Zy/ihtclJhORUba3FXuibF6jMN/FXAxMWLdFjyXqd6', 'Nam', 'Độc thân', 'Kinh', 'Viet Nam', 'Khong', '0123456789', 'Hà Nội', 'Hà Nội', 'Hà Nội', '012345678912', '2016-01-01', 'Hà Nội', 'Đang Làm Việc', 'avatar.png', 1, '2023-05-24 07:06:05', '2023-05-24 07:06:05', 8);

-- --------------------------------------------------------

--
-- Table structure for table `nhanvienchucvu`
--

CREATE TABLE `nhanvienchucvu` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `idChucVu` int(11) DEFAULT NULL,
  `NgayBatDau` date DEFAULT NULL,
  `NgayKetThuc` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvienchucvu`
--

INSERT INTO `nhanvienchucvu` (`id`, `idNhanVien`, `idChucVu`, `NgayBatDau`, `NgayKetThuc`, `createdAt`, `updatedAt`) VALUES
(2, 2, 2, '2023-04-23', '2023-04-23', '2023-04-23 09:49:13', '2023-04-23 09:49:13'),
(3, 2, 3, '2023-04-23', NULL, '2023-04-23 09:50:49', '2023-04-23 09:50:49'),
(4, 2, 1, '2023-04-23', NULL, '2023-04-23 09:50:49', '2023-04-23 09:50:49'),
(15, 2, 1, '2023-04-24', NULL, '2023-04-24 02:52:02', '2023-04-24 02:52:02'),
(22, 8, 2, '2023-05-24', NULL, '2023-05-24 07:02:33', '2023-05-24 07:02:33'),
(23, 9, 2, '2023-05-24', NULL, '2023-05-24 07:06:05', '2023-05-24 07:06:05');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvienkhenthuong`
--

CREATE TABLE `nhanvienkhenthuong` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `idKhenThuong` int(11) DEFAULT NULL,
  `NgayTao` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvienkhenthuong`
--

INSERT INTO `nhanvienkhenthuong` (`id`, `idNhanVien`, `idKhenThuong`, `NgayTao`, `createdAt`, `updatedAt`) VALUES
(3, 2, 1, '2023-05-07', '2023-05-07 16:55:49', '2023-05-07 16:55:49');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvienkyluat`
--

CREATE TABLE `nhanvienkyluat` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `idKyLuat` int(11) DEFAULT NULL,
  `NgayTao` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvienkyluat`
--

INSERT INTO `nhanvienkyluat` (`id`, `idNhanVien`, `idKyLuat`, `NgayTao`, `createdAt`, `updatedAt`) VALUES
(6, 2, 2, '2023-05-08', '2023-05-07 17:04:14', '2023-05-07 17:04:14'),
(8, 2, 3, '2023-05-24', '2023-05-24 06:59:06', '2023-05-24 06:59:06');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvienthongbao`
--

CREATE TABLE `nhanvienthongbao` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `idThongBao` int(11) DEFAULT NULL,
  `TrangThai` varchar(50) DEFAULT 'Chưa xem',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvienthongbao`
--

INSERT INTO `nhanvienthongbao` (`id`, `idNhanVien`, `idThongBao`, `TrangThai`, `createdAt`, `updatedAt`) VALUES
(11, 2, 3, 'Đã Xem', '2023-05-07 16:55:58', '2023-05-08 11:07:29'),
(14, 2, 4, 'Đã Xem', '2023-05-07 17:08:30', '2023-05-08 11:07:32'),
(18, 2, 5, 'Đã Xem', '2023-05-08 01:58:24', '2023-05-08 11:06:16'),
(20, 2, 6, 'Chưa xem', '2023-05-17 01:46:18', '2023-05-17 01:46:18'),
(21, 2, 7, 'Chưa xem', '2023-05-24 07:11:24', '2023-05-24 07:11:24');

-- --------------------------------------------------------

--
-- Table structure for table `phancong`
--

CREATE TABLE `phancong` (
  `id` int(11) NOT NULL,
  `NgayBatDau` date NOT NULL,
  `NgayKetThuc` date DEFAULT NULL,
  `TongKPI` float DEFAULT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phancong`
--

INSERT INTO `phancong` (`id`, `NgayBatDau`, `NgayKetThuc`, `TongKPI`, `idNhanVien`, `createdAt`, `updatedAt`) VALUES
(1, '0000-00-00', '0000-00-00', NULL, 2, '2023-05-06 08:08:34', '2023-05-06 08:08:34'),
(2, '2023-04-23', '2023-04-25', NULL, 2, '2023-05-06 08:12:30', '2023-05-06 08:12:30'),
(3, '2023-05-08', '2023-05-13', NULL, 2, '2023-05-08 06:09:52', '2023-05-08 06:09:52'),
(5, '2023-05-15', '2023-05-20', NULL, 2, '2023-05-17 01:37:27', '2023-05-17 01:37:27'),
(6, '2023-06-05', '2023-06-10', NULL, 2, '2023-05-17 01:41:09', '2023-05-17 01:41:09');

-- --------------------------------------------------------

--
-- Table structure for table `phancongtheongay`
--

CREATE TABLE `phancongtheongay` (
  `id` int(11) NOT NULL,
  `NgayPhanCong` date NOT NULL,
  `TenCV` varchar(40) NOT NULL,
  `DanhGia` varchar(255) DEFAULT NULL,
  `KPI` varchar(255) DEFAULT NULL,
  `idPhanCong` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phongban`
--

CREATE TABLE `phongban` (
  `id` int(11) NOT NULL,
  `MaPB` varchar(30) NOT NULL,
  `TenPB` varchar(30) NOT NULL,
  `SoLuong` varchar(30) NOT NULL,
  `SiSo` varchar(30) NOT NULL DEFAULT '0',
  `SoDienThoai` varchar(30) NOT NULL,
  `DiaChi` varchar(100) NOT NULL,
  `MoTa` text NOT NULL,
  `NgayThanhLap` date NOT NULL,
  `NguoiDaiDien` varchar(50) NOT NULL,
  `TrangThai` varchar(50) NOT NULL DEFAULT 'Đang hoạt động',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phongban`
--

INSERT INTO `phongban` (`id`, `MaPB`, `TenPB`, `SoLuong`, `SiSo`, `SoDienThoai`, `DiaChi`, `MoTa`, `NgayThanhLap`, `NguoiDaiDien`, `TrangThai`, `createdAt`, `updatedAt`) VALUES
(1, 'MPB243289137', 'Phòng tuyển dụng', '10', '0', '0123456789', 'Hà Nội', '', '2023-04-23', '', 'Đang hoạt động', '2023-04-23 09:48:21', '2023-05-24 06:49:31'),
(8, 'MPB911017662', 'Phòng IT', '10', '0', '0987654321', 'Tầng 8', 'DEMO', '2023-05-24', '', 'Đang hoạt động', '2023-05-24 06:50:50', '2023-05-24 06:50:50');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230320195421-create-nhan-vien.js'),
('20230322145102-create-phongban.js'),
('20230322151624-create-chucvu.js'),
('20230322153614-create-bangcap.js'),
('20230322161304-create-hopdong.js'),
('20230322162212-create-kyluat.js'),
('20230323030742-create-khenthuong.js'),
('20230323165541-create-nhanvienchucvu.js'),
('20230323175804-add_idPhongBan_to_nhanvien.js'),
('20230324030234-add_idNhanVien_to_HopDong.js'),
('20230324031218-add_idNhanVien_to_BangCap.js'),
('20230411042104-create-baohiem.js'),
('20230411044427-create-nhanvienkhenthuong.js'),
('20230411045043-create-nhanvienkyluat.js'),
('20230412153808-create-phancong.js'),
('20230413074037-create-phancongtheongay.js'),
('20230503161213-create-chamcong.js'),
('20230504151234-create-lichsuchamcong.js'),
('20230506153417-create-thongbao.js'),
('20230506154709-create-nhanvienthongbao.js');

-- --------------------------------------------------------

--
-- Table structure for table `thongbao`
--

CREATE TABLE `thongbao` (
  `id` int(11) NOT NULL,
  `TieuDe` varchar(50) NOT NULL,
  `NoiDung` text NOT NULL,
  `TrangThai` varchar(80) NOT NULL DEFAULT 'Chưa gửi',
  `ThoiGianGui` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thongbao`
--

INSERT INTO `thongbao` (`id`, `TieuDe`, `NoiDung`, `TrangThai`, `ThoiGianGui`, `createdAt`, `updatedAt`) VALUES
(2, 'Thông báo tăng ca 1', '<p>Thông báo tăng ca</p>', 'Đã gửi', '2023-05-07 17:09:01', '2023-05-07 14:37:44', '2023-05-07 17:09:01'),
(3, 'Thưởng tháng đạt KPI xuất sắc', '<p>Thưởng tháng đạt KPI xuất sắc</p>', 'Đã gửi', '2023-05-07 17:09:02', '2023-05-07 16:55:58', '2023-05-07 17:09:02'),
(4, 'Kỷ luật nhân viên có KPI không', '<p>Kỷ luật nhân viên có KPI không đạt tháng 4</p>', 'Đã gửi', '2023-05-07 17:09:00', '2023-05-07 17:08:30', '2023-05-07 17:09:00'),
(5, 'Thưởng tháng đạt KPI xuất sắc', '<p>Thưởng tháng đạt KPI xuất sắc</p>', 'Đã gửi', '2023-05-08 01:58:24', '2023-05-08 01:58:24', '2023-05-08 01:58:24'),
(6, 'ABC', '<p>ABC</p>', 'Đã gửi', '2023-05-17 01:56:09', '2023-05-17 01:46:18', '2023-05-17 01:56:09'),
(7, 'Thông báo đã có tiền khen thưởng', '<p>Xuống nhận ngay</p>', 'Đã gửi', '2023-05-24 07:11:48', '2023-05-24 07:11:24', '2023-05-24 07:11:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bangcap`
--
ALTER TABLE `bangcap`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MaBC` (`MaBC`),
  ADD UNIQUE KEY `SoQD` (`SoQD`),
  ADD KEY `BangCap_idNhanVien_foreign_idx` (`idNhanVien`);

--
-- Indexes for table `baohiem`
--
ALTER TABLE `baohiem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `chamcong`
--
ALTER TABLE `chamcong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `chucvu`
--
ALTER TABLE `chucvu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MaChucVu` (`MaChucVu`),
  ADD UNIQUE KEY `TenChucVu` (`TenChucVu`);

--
-- Indexes for table `hopdong`
--
ALTER TABLE `hopdong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `HopDong_idNhanVien_foreign_idx` (`idNhanVien`);

--
-- Indexes for table `khenthuong`
--
ALTER TABLE `khenthuong`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MaKT` (`MaKT`),
  ADD UNIQUE KEY `SoQD` (`SoQD`);

--
-- Indexes for table `kyluat`
--
ALTER TABLE `kyluat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MaKL` (`MaKL`),
  ADD UNIQUE KEY `SoQD` (`SoQD`);

--
-- Indexes for table `lichsuchamcong`
--
ALTER TABLE `lichsuchamcong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `NhanVien_idPhongBan_foreign_idx` (`idPhongBan`);

--
-- Indexes for table `nhanvienchucvu`
--
ALTER TABLE `nhanvienchucvu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`),
  ADD KEY `idChucVu` (`idChucVu`);

--
-- Indexes for table `nhanvienkhenthuong`
--
ALTER TABLE `nhanvienkhenthuong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`),
  ADD KEY `idKhenThuong` (`idKhenThuong`);

--
-- Indexes for table `nhanvienkyluat`
--
ALTER TABLE `nhanvienkyluat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`),
  ADD KEY `idKyLuat` (`idKyLuat`);

--
-- Indexes for table `nhanvienthongbao`
--
ALTER TABLE `nhanvienthongbao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`),
  ADD KEY `idThongBao` (`idThongBao`);

--
-- Indexes for table `phancong`
--
ALTER TABLE `phancong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `phancongtheongay`
--
ALTER TABLE `phancongtheongay`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPhanCong` (`idPhanCong`);

--
-- Indexes for table `phongban`
--
ALTER TABLE `phongban`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MaPB` (`MaPB`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `thongbao`
--
ALTER TABLE `thongbao`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bangcap`
--
ALTER TABLE `bangcap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `baohiem`
--
ALTER TABLE `baohiem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `chamcong`
--
ALTER TABLE `chamcong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `chucvu`
--
ALTER TABLE `chucvu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `hopdong`
--
ALTER TABLE `hopdong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `khenthuong`
--
ALTER TABLE `khenthuong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `kyluat`
--
ALTER TABLE `kyluat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lichsuchamcong`
--
ALTER TABLE `lichsuchamcong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `nhanvienchucvu`
--
ALTER TABLE `nhanvienchucvu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `nhanvienkhenthuong`
--
ALTER TABLE `nhanvienkhenthuong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `nhanvienkyluat`
--
ALTER TABLE `nhanvienkyluat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `nhanvienthongbao`
--
ALTER TABLE `nhanvienthongbao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `phancong`
--
ALTER TABLE `phancong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `phancongtheongay`
--
ALTER TABLE `phancongtheongay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `phongban`
--
ALTER TABLE `phongban`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `thongbao`
--
ALTER TABLE `thongbao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bangcap`
--
ALTER TABLE `bangcap`
  ADD CONSTRAINT `BangCap_idNhanVien_foreign_idx` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `baohiem`
--
ALTER TABLE `baohiem`
  ADD CONSTRAINT `baohiem_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chamcong`
--
ALTER TABLE `chamcong`
  ADD CONSTRAINT `chamcong_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hopdong`
--
ALTER TABLE `hopdong`
  ADD CONSTRAINT `HopDong_idNhanVien_foreign_idx` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `NhanVien_idPhongBan_foreign_idx` FOREIGN KEY (`idPhongBan`) REFERENCES `phongban` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nhanvienchucvu`
--
ALTER TABLE `nhanvienchucvu`
  ADD CONSTRAINT `nhanvienchucvu_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nhanvienchucvu_ibfk_2` FOREIGN KEY (`idChucVu`) REFERENCES `chucvu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nhanvienkhenthuong`
--
ALTER TABLE `nhanvienkhenthuong`
  ADD CONSTRAINT `nhanvienkhenthuong_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nhanvienkhenthuong_ibfk_2` FOREIGN KEY (`idKhenThuong`) REFERENCES `khenthuong` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nhanvienkyluat`
--
ALTER TABLE `nhanvienkyluat`
  ADD CONSTRAINT `nhanvienkyluat_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nhanvienkyluat_ibfk_2` FOREIGN KEY (`idKyLuat`) REFERENCES `kyluat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nhanvienthongbao`
--
ALTER TABLE `nhanvienthongbao`
  ADD CONSTRAINT `nhanvienthongbao_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nhanvienthongbao_ibfk_2` FOREIGN KEY (`idThongBao`) REFERENCES `thongbao` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `phancong`
--
ALTER TABLE `phancong`
  ADD CONSTRAINT `phancong_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `phancongtheongay`
--
ALTER TABLE `phancongtheongay`
  ADD CONSTRAINT `phancongtheongay_ibfk_1` FOREIGN KEY (`idPhanCong`) REFERENCES `phancong` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
