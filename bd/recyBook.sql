CREATE DATABASE  IF NOT EXISTS `recybook` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `recybook`;
-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: recybook
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id_category` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(80) NOT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Idiomas'),(2,'Literatura española'),(3,'Literatura extranjera'),(4,'Infantil'),(5,'Académicos'),(6,'Comic/Manga'),(7,'Juvenil'),(8,'Hobbies');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id_product` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(100) NOT NULL,
  `photoFront` varchar(255) NOT NULL,
  `photoBack` varchar(255) NOT NULL,
  `descriptionProduct` varchar(500) DEFAULT NULL,
  `publicationDate` timestamp NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `bookLanguage` varchar(60) NOT NULL,
  `seller` int NOT NULL,
  `author` varchar(100) NOT NULL,
  `category` int NOT NULL,
  `purchaseState` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_product`),
  KEY `seller` (`seller`),
  KEY `category` (`category`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`seller`) REFERENCES `user` (`id_user`),
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`category`) REFERENCES `category` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (4,'El lazarillo de Tormes','eec4c8b95f23ee17b5c73db5fa8bed22','05f71ba84a202860e1eac780cc212ecf','Libro en buen estado, poco uso.','2021-02-08 18:53:58',8.00,'español',1,'Anonimo',7,NULL),(6,'El extranjero','baf406a570b8f3249a01783fb5305b99','52f5082eed9b00a6c3b0576ee3ce2d30','Libro muy recomendado en buen estado.','2021-02-08 19:08:54',12.00,'español',2,'Albert Camus',3,NULL),(9,'Showboat: La biografía definitiva de Kobe Bryant','da241dd4cc448b7d0a0af1eff1e48a49','2cb40bd5371486a9bb13c6af0126b34e','Biografía','2021-02-08 19:20:34',13.00,'español',3,'Roland Lazenby ',8,NULL),(11,'En el camino','3311052e3f5c038cd46301a8abdd8375','20c39d845e88c28b034bec78a5e21bb7','Libro muy recomendado en buen estado.','2021-02-08 22:28:04',12.00,'español',3,'Jack Kerouac',3,NULL),(12,'Showboat: La biografía definitiva de Kobe Bryant','d844e47f9729d99bd0a28f628c345a17','a7392390e3cfbc8b26ae2edec976ca87','Libro de deporte','2021-02-08 22:29:51',14.00,'español',3,'Roland Lazenby ',8,1),(13,'Niebla','615fcf826a02b3ad75da860f1ce289c2','f11162f623ed1b7a9ad99c727a02d7e1','Libro en buen estado de tapa dura.','2021-02-09 15:03:08',12.00,'español',3,'Unamuno',2,NULL),(14,'El extranjero','5ae460a5f9e480732a2145ed4556fe3d','da2650dcddb30b9ec4c5c7d4aa334d15','Libro en buen estado de tapa dura.','2021-02-10 14:30:52',10.00,'español',7,'Albert Camus',3,NULL),(15,'El lazarillo de Tormes','016a0b7acaae89cdb10191bbd0629847','4f01d838e1b2be7e1ba28361eff34065','Libro en buen estado de tapa dura.','2021-02-11 10:10:33',10.00,'español',5,'Anonimo',2,NULL),(16,'Creí que borraban todo rastro de ti','3dc6d596b91487fa1d8b2812e00fe0a9','7033145641047333ca2bac952868b497','Libro muy recomendado en buen estado.','2021-02-11 12:41:10',12.00,'español',3,'Yoan Smadja',3,NULL),(18,'En el camino','8281abd8f6ed8c5d50e8d2981aef3102','d730fa0d4ae8a19c044a52c4047d78ce','Libro sobre un viaje, muy interesante.','2021-02-11 15:45:34',12.00,'español',12,'Jack Kerouac',3,NULL),(19,'Niebla','a8ee3881037c9b832049f0550e5cec5e','ca28f5236d25b8da80a420de05835598','Libro en buen estado de tapa dura.','2021-02-11 16:35:00',12.00,'español',12,'Unamuno',2,NULL),(20,'El extranjero','2a513133d1de956262e30696a0dbf93e','66f15ea394b2dab749eb0df42fc29f47','Libro en buen estado de tapa dura.','2021-02-12 10:29:10',10.00,'español',17,'Albert Camus',3,NULL),(22,'El lazarillo de Tormes','aa561cbf5d294f6b831a7fbf7aae2f1e','22796718f7d060f4f5c5cf81c09c2967','Libro en buen estado de tapa dura.','2021-02-12 15:17:09',12.00,'español',3,'Anonimo',2,NULL),(23,'Watchmen','7992cac0a37a83d84ecb719a2f692a98','ac63154f198112654ac74ffe4df34ad6','Serie de comics en buen estado. Tapa gruesa y bien cuidado. ','2021-02-15 09:56:15',30.00,'español',3,'Alan Moore',6,NULL),(24,'La regenta','047c8fe5b5288924baaba7023f0edc58','f0333a13af9c5aeb13dfee61dcb9b3d0','Literatura clásica. Libro en buen estado.','2021-02-15 09:57:44',15.00,'español',3,'Clarín',2,NULL),(25,'Volverás a región','00b62871dcef8bb5732b1a534cecb0a0','7fcd73cf65f230abc4a314b109fe75be','Libro muy recomendado en buen estado.','2021-02-15 10:00:18',14.00,'español',1,'Juan Benet',2,NULL),(26,'The sign of four','0aa2e67e31860b07661af18670dbf195','6f7c2f9e95486828454435351ca70213','Libro muy recomendado en buen estado.','2021-02-15 10:05:19',18.00,'inglés',1,'Arthur Conan Doyle',1,NULL),(27,'Alicia en el país de las maravillas','f9adab2b448677aba100cf3c5e009e37','9e42ba3a2f58f91ac10b472510044c96','Libro de aventuras.','2021-02-15 10:06:54',16.00,'español',1,'Lewis Carrol',3,NULL),(28,'Sin city','c5c7419c66cd7dad55b5044386a782df','9b16f7377bd0870bb33c02ab83c79131','Una gran obra que recomiendo.','2021-02-15 10:08:41',20.00,'español',1,'Frank Miller',6,NULL),(29,'El principito','21aeb7054b6c7775c5fcc72add023d3a','d292807f88209b5408ced2063742d076','Libro precioso.','2021-02-15 10:10:17',12.00,'español',2,'Antoine de Saint-Exupéry',4,1),(30,'Pnesamiento político contemporáneo','7b11285865f6ff58c3ef0fbca6d99c67','8b32ebb7e7f3f0038bb594b73c7c3282','Libro de política','2021-02-15 10:12:10',16.00,'español',2,'Demetrio Velasco Criado',5,1),(31,'Maus','a78ac52674305c898f1eb5fd81e17cc4','9849130661131ef51a6d3dff132508a5','Novela gráfica sobre el holocausto.','2021-02-15 10:13:49',20.00,'español',2,'Art Spiegelman',6,NULL),(32,'La ladrona de libros','ee68be0ac2b840c0257d3da68eff2f4e','d57093fa652af63a6d7259f54738536f','Libro en buen estado de tapa dura.','2021-02-15 10:15:08',12.00,'español',2,'Markus Zusak',3,NULL),(33,'Historia de una escalera','bde21ae0141debe5732845fd97b6ea81','160e7198383424ce600d9d4766743505','Teatro español','2021-02-15 10:16:48',10.00,'español',3,'Antonio BUero Vallejo',2,1),(34,'El señor de las moscas','b23cc0d7f8071c4ab1e5d39f31bd2823','aa52fe8e0229720f8a74a50d848671d3','Libro crítico social.','2021-02-15 10:19:54',14.00,'español',7,'William Golding',3,1),(35,'La colmena','44df389da8f4a549ca4f1540b7d080f6','28eba9e62bf7fa7f48c4d7befd0984c7','Crítica social.','2021-02-15 10:20:51',12.00,'español',7,'Cela',2,NULL),(36,'El banquete','3105bbf36bfba3f65e78eb47acfcde82','ecb1caabfdfeb5b2fc4bf53f9c08dbb4','Filosofía.','2021-02-15 10:21:36',10.00,'español',7,'Platón',5,NULL),(37,'El príncipe de la niebla','45c158078a909d100ae2659f9a522202','cdf0b218d7f2b0ecd5624d2956b59e1d','Libro de fantasía','2021-02-15 10:22:29',12.00,'español',7,'Ruiz Zafón',7,NULL),(38,'La cocina cotidiana','4c401d04f0f313aa879b2d4ae09ae32e','13a271329504e9d8e74f4ba19aeb0632','Libro de recetas','2021-02-15 10:24:12',16.00,'español',7,'Verónica Cervera',8,NULL),(39,'La colmena','81bc7bcea330d31a2696c1cce732a4fb','00a2df1c1f85e3eff8b4d01b6955660e','Libro social','2021-02-15 15:09:05',12.00,'español',3,'Cela',2,NULL),(48,'The sign of four','e02d67d4497dc5046425017890fd18e4','3f8d6e5f2af5d079d53485125c5ca8bd','Libro en buen estado de tapa dura.','2021-02-15 20:49:19',22.00,'español',3,'Conan Doyle',3,NULL),(49,'Niebla','6c1d8cd9bc90758d825f5054ca19c129','49b244e79c33880bd624755e1809b51f','Libro muy recomendado en buen estado.','2021-02-16 10:14:32',12.00,'español',3,'Unamuno',2,NULL),(50,'El niño con el pijama de rayas','7e8e85a0ba70373e3adb3066171acd88','25a19c4a44f32122572b196ba6e8f561','Libro sobre el holocausto','2021-02-16 18:36:03',10.00,'español',5,'John Boyne',3,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `id_purchase` int NOT NULL AUTO_INCREMENT,
  `product` int NOT NULL,
  `purchase` tinyint(1) DEFAULT NULL,
  `purchaseDate` timestamp NULL DEFAULT NULL,
  `favorite` tinyint(1) DEFAULT '0',
  `reservation` tinyint(1) DEFAULT '0',
  `assessment` tinyint DEFAULT NULL,
  `opinion` varchar(255) DEFAULT NULL,
  `buyer` int NOT NULL,
  `reserveDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_purchase`),
  KEY `buyer` (`buyer`),
  KEY `product` (`product`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`buyer`) REFERENCES `user` (`id_user`),
  CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`product`) REFERENCES `product` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (62,6,NULL,NULL,1,0,NULL,NULL,3,NULL),(63,15,NULL,NULL,1,0,NULL,NULL,3,NULL),(64,28,NULL,NULL,0,1,NULL,NULL,3,NULL),(66,19,NULL,NULL,1,0,NULL,NULL,1,NULL),(67,15,NULL,NULL,1,0,NULL,NULL,1,NULL),(68,6,NULL,NULL,1,0,NULL,NULL,1,NULL),(69,6,NULL,NULL,1,0,NULL,NULL,1,NULL),(70,37,NULL,NULL,1,0,NULL,NULL,1,NULL),(72,12,1,'2021-02-15 13:33:04',0,0,4,'Muy bueno',1,NULL),(74,33,1,'2021-02-15 13:35:18',0,0,4,'Muy bueno',1,NULL),(75,23,NULL,NULL,1,0,NULL,NULL,2,NULL),(76,18,NULL,NULL,1,0,NULL,NULL,2,NULL),(77,32,NULL,NULL,1,0,NULL,NULL,3,NULL),(78,29,1,'2021-02-15 14:57:10',0,0,4,'Muy bueno',3,NULL),(81,23,NULL,NULL,0,1,NULL,NULL,1,'2021-02-15 16:21:29'),(82,25,NULL,NULL,1,0,NULL,NULL,3,NULL),(83,26,NULL,NULL,1,0,NULL,NULL,3,NULL),(84,35,NULL,NULL,1,0,NULL,NULL,3,NULL),(86,30,1,'2021-02-15 19:32:13',0,0,4,'Mu wai /////////',24,'2021-02-15 19:30:38'),(88,37,NULL,NULL,0,1,NULL,NULL,24,'2021-02-15 19:47:28'),(89,36,NULL,NULL,0,1,NULL,NULL,3,'2021-02-16 10:36:46'),(90,13,NULL,NULL,1,0,NULL,NULL,1,NULL),(91,11,NULL,NULL,1,0,NULL,NULL,1,NULL),(92,48,NULL,NULL,1,0,NULL,NULL,1,NULL),(93,9,NULL,NULL,1,0,NULL,NULL,1,NULL),(94,36,NULL,NULL,1,0,NULL,NULL,1,NULL),(95,39,NULL,NULL,0,1,NULL,NULL,1,'2021-02-16 11:37:19'),(96,24,NULL,NULL,0,1,NULL,NULL,1,'2021-02-16 11:37:29'),(97,36,NULL,NULL,1,0,NULL,NULL,3,NULL),(98,38,NULL,NULL,1,0,NULL,NULL,3,NULL),(99,39,NULL,NULL,1,0,NULL,NULL,1,NULL),(100,6,NULL,NULL,0,1,NULL,NULL,3,'2021-02-16 12:57:34'),(101,28,NULL,NULL,1,0,NULL,NULL,3,NULL),(102,36,NULL,NULL,1,0,NULL,NULL,3,NULL),(103,31,NULL,NULL,0,1,NULL,NULL,3,'2021-02-16 13:20:37'),(104,15,NULL,NULL,1,0,NULL,NULL,2,NULL),(105,37,NULL,NULL,1,0,NULL,NULL,2,NULL),(106,36,NULL,NULL,1,0,NULL,NULL,2,NULL),(107,34,1,'2021-02-16 18:30:25',0,0,4,'Muy bueno',2,NULL),(108,13,NULL,NULL,1,0,NULL,NULL,5,NULL),(109,11,NULL,NULL,1,0,NULL,NULL,5,NULL),(110,38,NULL,NULL,1,0,NULL,NULL,5,NULL),(111,16,NULL,NULL,0,1,NULL,NULL,5,'2021-02-16 18:34:20'),(112,50,NULL,NULL,1,0,NULL,NULL,7,NULL),(113,49,NULL,NULL,1,0,NULL,NULL,7,NULL),(114,48,NULL,NULL,1,0,NULL,NULL,7,NULL),(115,28,NULL,NULL,1,0,NULL,NULL,7,NULL),(116,39,NULL,NULL,1,0,NULL,NULL,8,NULL),(117,13,NULL,NULL,1,0,NULL,NULL,8,NULL),(118,11,NULL,NULL,1,0,NULL,NULL,8,NULL),(119,20,NULL,NULL,1,0,NULL,NULL,8,NULL),(120,48,NULL,NULL,1,0,NULL,NULL,8,NULL);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL,
  `userPassword` varchar(200) NOT NULL,
  `descriptionUser` varchar(255) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `postalCode` char(5) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `user_chk_1` CHECK ((length(`userPassword`) >= 8))
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Maria josé','$2a$10$xAa8z0J5rx5ubQVYzrMZLeMPU7ooWCYn.YLZnEid8I3Vvh0P.JgYm','estudiante de bellas artes','a coruña','15011','maria@gmail.es','3ab4dd2235f41a8e99bedc2172e2c6ef'),(2,'jorge','$2a$10$culxt8ALbvg8tw1.dxa77OGn/Q5WH6mac2cuOCGI5z.53P8JHe8l2','informático','barcelona','21019','jorge@gmail.es','ce309a80e963305280f1fe6daef34528'),(3,'david perez','$2a$10$MKfVhgtmvODXYtvQ4l4Aoec0oogpH76eCrHSX8MyPtqhA1NeBrdgC','mecánico','canarias','22022','david@gmail.es','8cd1a3aa866a17d9aa7ffa823f6934c5'),(5,'paula perez','$2a$10$iT42yH5cYk0YzPMKd01LnOwWh3PST.q8c2lZwGycpXtD7ZcjTqcUq','masajista ','murcia','31012','paula@gmail.es','c6ed000e2012adfe4493f68bf3fecfcf'),(7,'santi','$2a$10$BClWcXOKXABTcxeLkvZ2qezkeh76AzVNPoW0RuUqZvqRhaqdjeK1K','estudiante de sociología','valencia','15011','santi@gmail.es','c44bf7d24dd6e0365e659e4e3b9a35d0'),(8,'Nuria','$2a$10$vAYo/F0ySAostvPra3IdSextPcZ11Tp29R2MYM3Vggq6dkxHZIi1a','Estudiante de psicología ','barcelona','15011','nuria@gmail.es','62fea41c547aa6c5d6aed53cc1549834'),(12,'jose ramón ','$2a$10$CV9wT3HMYeMzzXXpfDtwEufcfIDzHy.v74quQzWpZfUM5l3PZ.Aky','informático','a coruña','15011','jose@gmail.es','94b87bd49abdf477ed47a8c8c6d6114e'),(17,'laura','$2a$10$PZvM1gTy/ePpnDe2pGieROBjSXuUA.1kFIlCo2LQWQtpRnk92exMe','estudiante de bellas artes y filosofía','a coruña','15011','laura@gmail.es','708fa950981115502cf41bdef57d7094'),(21,'airan','$2a$10$vaNKvr34VMRHrFvPJ4D8EOhnyMGfbrjWr3YchKalbyyPnupiffY2u',NULL,NULL,NULL,'airan@gmail.es',NULL),(22,'pedro','$2a$10$1Wfzr77jKTDXlY5MDT1hwuAGw0DOKN3N5XPTBoUJnJ6U.Y7Rivk/O',NULL,NULL,NULL,'pedro@gmail.es',NULL),(23,'tucker','$2a$10$a0P752B5TAXaUUMSlMNMluX83M68iuAjGgmEznH/2SD.oYjk2P/2u',NULL,NULL,NULL,'tucker@gmail.es',NULL),(24,'tuck','$2a$10$0ZARVu3jEyZHplqmpGUP2O8Z1ExPa7i90nNIXV8H7pbb2V3j5v2Ry','estudiante','a coruñaa','15011','tucker@gmail.com','1fc8fe81a6e0f585a67de9edb45596d1'),(25,'jose','$2a$10$uxAet0TNVcALC3D/wIPISeL38FrJXDR9AECLcw1ShN2eK1cc5PBPC',NULL,NULL,NULL,'jose@gmail.com',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-16 19:49:05
