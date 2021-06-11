-- MariaDB dump 10.19  Distrib 10.5.9-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: nodeProject
-- ------------------------------------------------------
-- Server version	10.5.9-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(140) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `askid` int(11) DEFAULT NULL,
  `asknum` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `askid` (`askid`),
  KEY `asknum` (`asknum`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`askid`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`asknum`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (11,'asdfsaf','2021-06-07 10:57:10','2021-06-07 10:57:10',1,13);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `content` varchar(140) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'asdf','asdf','2021-06-02 08:27:08','2021-06-02 08:27:08',1),(2,'werwer','sdfsd','2021-06-02 08:28:10','2021-06-02 08:28:10',1),(3,'wedscx','sdsda','2021-06-02 08:28:13','2021-06-02 08:28:13',1),(4,'143','dsf','2021-06-02 08:28:16','2021-06-02 08:28:16',1),(7,'ㄴㅁㅇㄹㄴㅇㅁㄹ','ㄷㄴㅇㅁㄹㄴㅁㅇ','2021-06-02 09:57:19','2021-06-02 09:57:19',1),(8,'4ㅅㄱ3','ㅇㄴㅁㅎㅁㄴ','2021-06-02 09:58:54','2021-06-02 09:58:54',1),(9,'ㅁㄴㅇㄹ','ㄷ235ㄷ','2021-06-02 10:00:29','2021-06-02 10:00:29',1),(11,'asdf','test','2021-06-03 12:16:55','2021-06-03 12:16:55',5),(13,'asdf','test','2021-06-03 12:17:34','2021-06-03 12:17:34',5);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(40) DEFAULT NULL,
  `nick` varchar(15) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `SM` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'servermaster','servermaster','$2b$12$118J5RUgowIpF.HUTf5bMut7pbOZYNGQxRTU3PjqsVHJXc5blbEHG',1,'2021-06-01 02:16:12','2021-06-01 02:16:12',NULL),(5,'a','bestdriver','$2b$12$jROkwwm2SzV7L5hPnLGv4.YOOIDUhNF058pHsPievkC2XORXfqs2u',0,'2021-05-27 10:51:33','2021-05-27 10:51:33',NULL),(11,'w','w','$2b$12$QjTkvLE5KQNHVdqA/1HofuPb/RbmH5LZ3B4fnNqOa/nl7vo7jnaKu',0,'2021-05-31 05:19:49','2021-05-31 05:19:49',NULL),(12,'r','r','$2b$12$AGSs84eRkXBLe.QELTPn8e3q.xSvYHmT2mA93MjTl3wwfKKEJxGVW',0,'2021-05-31 05:19:53','2021-05-31 05:19:53',NULL),(13,'y','yy','$2b$12$cISoiXIfd6.YqyUe9qljd./nYtrW/GPz62ftSv8/xAaRti1HVA9nO',0,'2021-05-31 05:19:59','2021-05-31 05:19:59',NULL),(14,'asdf','asdf','$2b$12$3dJkoq4yFg4teohApM1giugPa2TVhmiedRcDveghQQ0Er6HSZduj.',0,'2021-05-31 05:20:03','2021-05-31 05:20:03',NULL),(15,'qwer','qwer','$2b$12$wU7mbdJ2n1BtLrO/pU/yReuPpYUVOc3qUm2p7YjZLR2ke5MdlJwQG',0,'2021-05-31 05:20:08','2021-05-31 05:20:08',NULL),(16,'rtrt','rtrt','$2b$12$r1oVtHvi57R09jGjIBiLXOV/Bk9OWkvhc.jyTHbrith.3/11WPTa6',0,'2021-05-31 05:20:21','2021-05-31 05:20:21',NULL),(17,'pppp','pppp','$2b$12$cXZ7rixSInuB5Wov9oco9eTBct.AJvT7nWLg8PaYGWONO4J/Vd.2i',0,'2021-05-31 05:20:26','2021-05-31 05:20:26',NULL),(18,'tyu','tyu','$2b$12$AxRFS64ylbYEhZsjCDaYZekl4Pk1zGZOoG/dgG0z2/R.sjbcz7Si.',0,'2021-05-31 05:20:31','2021-05-31 05:20:31',NULL),(20,'weq432','er','$2b$12$W.whtEG7P2BhrgpV0Fbv6eAt.cqb5NFfj4Nuc2h7.SdsiWZVxlGvC',0,'2021-06-05 11:34:38','2021-06-05 11:34:38',NULL),(21,'dwarf','ssdds','$2b$12$b/dUOjflhQrIIsEK3qwmb.PdHmkBQOO8Ipf8dIWn71pZrE1Nn/zsa',0,'2021-06-05 11:38:41','2021-06-05 11:38:41',NULL),(22,'asdaw','sde','$2b$12$naJdSNzzSRi2ZDeqYfvcse/f8IVIC2BgqHo16fqSX7yArqvol1TEK',0,'2021-06-05 12:00:50','2021-06-05 12:00:50',NULL),(25,'lizill','Dong','$2b$12$b44K98Ni2gHuJQvPZKqcPe4y81vIECzMunufO8KGYh/c1QJKLBUfS',1,'2021-06-07 06:51:03','2021-06-07 06:51:03',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-09 20:51:21
