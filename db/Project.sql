-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: Project
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autor`
--

DROP TABLE IF EXISTS `autor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autor` (
  `id_autor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(120) NOT NULL,
  PRIMARY KEY (`id_autor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad` (
  `id_ciudad` int NOT NULL AUTO_INCREMENT,
  `nombre_ciudad` varchar(150) NOT NULL,
  PRIMARY KEY (`id_ciudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `codigopostal`
--

DROP TABLE IF EXISTS `codigopostal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codigopostal` (
  `id_codigo` int NOT NULL AUTO_INCREMENT,
  `codigopostal` char(5) DEFAULT NULL,
  PRIMARY KEY (`id_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero` (
  `id_genero` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `foto_portada` varchar(255) NOT NULL,
  `foto_contraportada` varchar(255) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `fechaPublicacion` timestamp NOT NULL,
  `precio` decimal(3,2) NOT NULL,
  `idioma` varchar(60) NOT NULL,
  `vendedor` int NOT NULL,
  `autor` int NOT NULL,
  `genero` int NOT NULL,
  `codigo_postal` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `vendedor` (`vendedor`),
  KEY `autor` (`autor`),
  KEY `genero` (`genero`),
  KEY `codigo_postal` (`codigo_postal`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`vendedor`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`autor`) REFERENCES `autor` (`id_autor`),
  CONSTRAINT `producto_ibfk_3` FOREIGN KEY (`genero`) REFERENCES `genero` (`id_genero`),
  CONSTRAINT `producto_ibfk_4` FOREIGN KEY (`codigo_postal`) REFERENCES `codigopostal` (`id_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transaccion`
--

DROP TABLE IF EXISTS `transaccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaccion` (
  `id_transaccion` int NOT NULL AUTO_INCREMENT,
  `fecha_transaccion` timestamp NOT NULL,
  `vendedor` int NOT NULL,
  `comprador` int NOT NULL,
  `producto` int NOT NULL,
  PRIMARY KEY (`id_transaccion`),
  KEY `vendedor` (`vendedor`),
  KEY `comprador` (`comprador`),
  KEY `producto` (`producto`),
  CONSTRAINT `transaccion_ibfk_1` FOREIGN KEY (`vendedor`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `transaccion_ibfk_2` FOREIGN KEY (`comprador`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `transaccion_ibfk_3` FOREIGN KEY (`producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `apellidos` varchar(60) NOT NULL,
  `contraseña` varchar(200) NOT NULL,
  `ciudad` int NOT NULL,
  `codigo_postal` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  KEY `ciudad` (`ciudad`),
  KEY `codigo_postal` (`codigo_postal`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ciudad`) REFERENCES `ciudad` (`id_ciudad`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`codigo_postal`) REFERENCES `codigopostal` (`id_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-03 13:44:52
