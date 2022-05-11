-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: db-mysql-ams3-37313-do-user-2119860-0.b.db.ondigitalocean.com    Database: share-a-meal
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `meal`
--

DROP TABLE IF EXISTS `meal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isActive` tinyint NOT NULL DEFAULT '0',
  `isVega` tinyint NOT NULL DEFAULT '0',
  `isVegan` tinyint NOT NULL DEFAULT '0',
  `isToTakeHome` tinyint NOT NULL DEFAULT '1',
  `dateTime` datetime NOT NULL,
  `maxAmountOfParticipants` int NOT NULL DEFAULT '6',
  `price` decimal(5,2) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `cookId` int DEFAULT NULL,
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(200) NOT NULL,
  `description` varchar(400) NOT NULL,
  `allergenes` set('gluten','lactose','noten') NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `FK_e325266e1b4188f981a00677580` (`cookId`),
  CONSTRAINT `FK_e325266e1b4188f981a00677580` FOREIGN KEY (`cookId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal`
--

LOCK TABLES `meal` WRITE;
/*!40000 ALTER TABLE `meal` DISABLE KEYS */;
INSERT INTO `meal` VALUES (1,1,1,1,1,'2022-04-29 13:02:04',6,6.75,'https://miljuschka.nl/wp-content/uploads/2021/02/Pasta-bolognese-3-2.jpg',1,'2022-02-26 18:12:40.048998','2022-05-08 08:27:11.000000','Spaghetti Bologna','Dé pastaklassieker bij uitstek.','gluten,lactose,noten'),(2,1,1,0,0,'2022-05-22 13:35:00',4,12.75,'https://static.ah.nl/static/recepten/img_RAM_PRD159322_1024x748_JPG.jpg',2,'2022-02-26 18:12:40.048998','2022-04-28 13:02:06.000000','Aubergine uit de oven met feta, muntrijst en tomatensaus','Door aubergines in de oven te roosteren worden ze heerlijk zacht. De balsamico maakt ze heerlijk zoet.','noten'),(3,1,0,0,1,'2022-05-22 17:30:00',4,10.75,'https://static.ah.nl/static/recepten/img_099918_1024x748_JPG.jpg',2,'2022-02-26 18:12:40.048998','2022-03-15 14:10:19.000000','Spaghetti met tapenadekip uit de oven en frisse salade','Perfect voor doordeweeks, maar ook voor gasten tijdens een feestelijk avondje.','gluten,lactose'),(4,1,0,0,0,'2022-03-26 21:22:26',4,4.00,'https://static.ah.nl/static/recepten/img_063387_890x594_JPG.jpg',3,'2022-03-06 21:23:45.419085','2022-03-12 19:51:57.000000','Zuurkool met spekjes','Heerlijke zuurkoolschotel, dé winterkost bij uitstek. ',''),(5,1,1,0,1,'2022-03-26 21:24:46',6,6.75,'https://www.kikkoman.nl/fileadmin/_processed_/5/7/csm_WEB_Bonte_groenteschotel_6851203953.jpg',3,'2022-03-06 21:26:33.048938','2022-03-12 19:50:13.000000','Groentenschotel uit de oven','Misschien wel de lekkerste schotel uit de oven! En vol vitaminen! Dat wordt smikkelen. Als je van groenten houdt ben je van harte welkom. Wel eerst even aanmelden.',''),(6,1,1,1,0,'2022-03-06 21:30:01',4,12.50,'https://static.ah.nl/static/recepten/img_086911_890x594_JPG.jpg',4,'2022-03-06 21:31:28.364106','2022-03-12 19:52:12.000000','Ovengroente met zoete aardappel en kip','Een heuse klassieker: ovengroente met zoete aardappel en kip. Maak het jezelf makkelijk met dit recept. De oven doet het meeste werk!',''),(7,1,1,1,1,'2022-03-09 07:52:13',1,0.69,'https://media.istockphoto.com/photos/appetizing-french-fries-in-a-bowl-picture-id966934632?k=20&m=966934632&s=612x612&w=0&h=NezPmgNDWbtwuogVE9Cc2JR7PgGNHU_as_26W2_T_7M=',2,'2022-03-09 19:36:19.851607','2022-03-15 14:11:10.000000','Patat van de lokale snackbar','Een overheerlijk patatje, met een glaasje melk.','lactose,noten'),(8,1,0,0,1,'2022-03-24 19:35:00',2,6.50,'https://upload.wikimedia.org/wikipedia/commons/5/58/Kapsalon_dutch_meal.jpg',13,'2022-03-10 12:39:19.969238','2022-03-12 19:52:05.000000','Grote kapsalon','Een overheerlijke kapsalon van de turk om de hoek!',''),(9,1,1,1,1,'2022-03-15 12:24:33',5,12.00,'https://favorflav.com/images/Packshot-180ml-e1528883305782.png',2,'2022-03-15 19:19:51.285533','2022-03-15 19:19:51.285533','Zaanse mayonaise','Heerlijke mayonaise uit die echte Zaanstreek','lactose'),(10,1,0,0,1,'2022-03-15 19:52:13',5,12.00,'https://www.servingdumplings.com/wp-content/uploads/2021/10/Spicy-garlic-shiitake-noodles-3-2-95b3f581.jpg',2,'2022-03-15 19:52:18.352148','2022-03-16 08:23:44.000000','Noodles','Lekkere noodles','lactose'),(11,1,1,1,0,'2022-03-15 21:08:06',8,1.10,'https://www.indianhealthyrecipes.com/wp-content/uploads/2015/10/french-toast-recipe-1.jpg',2,'2022-03-15 20:08:08.078547','2022-03-16 08:24:45.000000','toast','test','lactose'),(12,1,1,1,0,'2022-03-15 22:57:48',4,5.00,'https://veganchallenge.nl/wp-content/uploads/2014/03/APR_21_MAA_HAPJE-Poffertjes.jpg',2,'2022-03-15 22:57:54.149469','2022-03-16 18:30:20.000000','Poffertjes','Gewoon lekker','gluten'),(13,0,0,0,0,'2022-03-16 15:07:37',5,5.00,'https://www.gastropedia.nl/wp-content/uploads/sites/16/2017/04/Bapao-Rund.png',2,'2022-03-16 15:06:19.956229','2022-03-16 15:33:14.000000','Broodje Bapao','Volgende keer niet zo grappig doen met namen geven lol, groetjes klasgenoot',''),(14,1,0,0,1,'2022-03-16 15:29:12',1,2.00,'https://cms.burgerking.be/uploads/medium_HAMBURGER_c6b7d58038.png',2,'2022-03-16 15:29:16.088359','2022-03-16 18:30:52.000000','hamburger','lekkere hamburger','gluten'),(15,0,0,0,1,'2022-03-16 15:39:00',5,5.00,'https://www.unileverfoodsolutions.nl/dam/global-ufs/mcos/BENEFRA/calcmenu/recipes/NL-recipes/sandwiches/broodje-unox/main-header.jpg/jcr:content/renditions/cq5dam.thumbnail.desktop.jpeg',2,'2022-03-16 15:37:42.664498','2022-03-16 18:32:09.000000','Hotdog','Het broodje waar je geen genoeg van kan krijgen! Met curry, mayonaise, ketchup, of gewoon met alle drie! Genieten gegarandeerd! Ook in vegavariant verkrijgbaar!',''),(16,1,0,0,1,'2022-03-16 15:41:05',3,100.00,'https://www.santamariaworld.com//globalassets/netherlands/recepten/81.-gegrilde-hamburger-met-rode-ui-tomaat-en-sla.jpg',2,'2022-03-16 15:41:08.860931','2022-03-16 15:41:08.860931','Nog een burger','dit is nog een hamburger','gluten'),(17,0,0,1,1,'2022-03-25 15:57:42',5,12.50,'https://www.yourlittleblackbook.me/wp-content/uploads/2018/01/rijsttafels-in-amsterdam-mama-makan.jpg',2,'2022-03-16 15:56:25.210382','2022-03-16 18:34:13.000000','Indonesische rijsttafel','Voor de echte smullers! Meld je aan en schuif bij!',''),(18,0,0,0,0,'2022-03-16 16:08:04',5,9.95,'https://vertruffelijk.nl/wp-content/uploads/2017/08/untitled-1232.jpg',2,'2022-03-16 16:06:46.611541','2022-03-16 19:07:32.000000','Herrie in de pan','Een pannetje gevuld met paprika, champion en mals stoofvlees!',''),(19,1,1,1,0,'2022-03-16 05:35:50',2,3.60,'https://kookidee.nl/wp-content/uploads/2018/05/pannetje-bruine-bonen-gehakt-paprika-kaas-03.jpg',2,'2022-03-16 17:03:22.661279','2022-03-16 18:57:00.000000','Bonen','Lekkere bonenschotel.','gluten'),(20,1,1,0,0,'2022-03-16 17:28:46',20,20.00,'https://i.pinimg.com/originals/ee/b0/65/eeb06531dc13f69902e066b0cd3fc728.jpg',2,'2022-03-16 17:27:28.352343','2022-03-16 17:27:28.352343','Burger','Een hele lekkere burger ','gluten'),(21,1,0,0,1,'2022-03-16 09:15:04',2,4.10,'https://static.ah.nl/static/recepten/img_RAM_PRD143856_1224x900_JPG.jpg',2,'2022-03-16 20:42:37.490344','2022-03-16 20:43:37.000000','Spaghetti','Lekkere spaghetti','gluten'),(22,0,0,0,1,'2022-03-16 20:57:07',8,4.50,'https://res.cloudinary.com/tkwy-prod-eu/image/upload/ar_1:1,c_thumb,h_340,w_340/f_auto/q_auto/dpr_1.0/v1647007237/static-takeaway-com/images/restaurants/nl/ONNONQPN/products/ebi_tempura_roll',2,'2022-03-16 20:59:03.198641','2022-03-16 20:59:03.198641','Ebi tempura roll','Garnaal, komkommer, avocado, sesam, mayonaise en masago',''),(23,1,0,0,1,'2022-03-16 09:33:20',6,12.60,'https://www.lekkerensimpel.com/wp-content/uploads/2016/10/IMG_0462-2-1920x920.jpg',2,'2022-03-16 21:00:52.710122','2022-03-16 21:01:20.000000','Ovenschotel','Heerlijke ovenschotel','gluten'),(24,1,1,0,0,'2022-03-16 09:46:44',2,9.24,'https://img.static-rmg.be/a/food/image/q100/w480/h360/1077806/pizza.jpg',2,'2022-03-16 21:14:17.785400','2022-03-16 21:14:17.785400','Pizza','Overheerlijke pizza uit de steenoven','gluten,noten'),(25,0,0,0,0,'2022-03-16 15:21:58',4,18.95,'https://lekkertafelen.nl/wp-content/uploads/2014/07/Tapas7.jpg',29,'2022-03-16 21:33:24.391709','2022-03-16 21:33:24.391709','Gamba\'s in knoflook','Heerlijk van smaak, en altijd vers.','gluten');
/*!40000 ALTER TABLE `meal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal_participants_user`
--

DROP TABLE IF EXISTS `meal_participants_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meal_participants_user` (
  `mealId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`mealId`,`userId`),
  KEY `IDX_726a90e82859401ab88867dec7` (`mealId`),
  KEY `IDX_6d0a7d816bf85b634a3c6a83ac` (`userId`),
  CONSTRAINT `FK_6d0a7d816bf85b634a3c6a83aca` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_726a90e82859401ab88867dec7f` FOREIGN KEY (`mealId`) REFERENCES `meal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal_participants_user`
--

LOCK TABLES `meal_participants_user` WRITE;
/*!40000 ALTER TABLE `meal_participants_user` DISABLE KEYS */;
INSERT INTO `meal_participants_user` VALUES (1,67),(2,2),(2,39),(2,42),(3,3),(3,4),(4,2),(5,4),(6,2),(6,3),(7,4),(8,2),(8,4),(10,3);
/*!40000 ALTER TABLE `meal_participants_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `emailAdress` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT '-',
  `roles` set('admin','editor','guest') NOT NULL DEFAULT 'editor,guest',
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_87877a938268391a71723b303c` (`emailAdress`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Robin','Schellius',1,'r.schellius@avans.nl','secret','0612345677','editor,guest','',''),(2,'John','Doe',1,'j.doe@server.com','secret','06 12425475','editor,guest','',''),(3,'Herman','Huizinga',1,'h.huizinga@server.nl','secret','06-12345678','editor,guest','',''),(4,'Marieke','Van Dam',0,'m.vandam@server.nl','secret','06-12345678','editor,guest','',''),(5,'Henk','Tank',1,'h.tank@server.com','secret','06 12425495','editor,guest','',''),(6,'Jan','Montizaan',1,'jan@avans.com','secret','','','',''),(7,'DoesThisAPIWorkProperlyTest','Tester',1,'api.test@gmail.com','secret','','','',''),(8,'John','Doe',1,'j.doe32@server.com','secret','','','',''),(9,'John','Doe',1,'j.doeo@server.com','secret','','','',''),(10,'Test','Test',1,'j.doeo@test.com','secret','','','',''),(11,'Eefje','Gijzen',1,'e.gijzen@avans.nl','Eefje123','','','',''),(12,'Pieter','Post',1,'pieterpost@postnl.nl','PieterPost123','','','',''),(13,'Test','User',1,'test@user.com','Test123','06 12425475','editor,guest','',''),(14,'Klaas','Doe',1,'klaas@server.com','secret','','','',''),(15,'John','Doe',1,'j.doe@servder.com','secret','','','',''),(16,'Marieke','van Dam',1,'mavandam@server.nl','secret','','','',''),(17,'josef','joestar',1,'j.jojo@server.com','dio','06 12425475','editor,guest','',''),(18,'Jenny','Doe',1,'jenny.doe@server.com','secrsset','','','',''),(19,'Mariëtte','van den Dullemen',1,'m.vandullemen@server.nl','secret','','','',''),(20,'Michael','Nicht',1,'m.nicht@mastermovies.nl','secret','','','',''),(21,'Lucas','Kok',1,'lucas.kok@hotmail.nl','password','','','',''),(22,'Lucas','Kok',1,'lcp.kok@gmail.com','password','','','',''),(23,'Ben','Dover',1,'ben.dover@gmail.com','bennie2022','','','',''),(24,'Joe','Mama',1,'joe.mama@hotmail.com','qwerty123','','','',''),(25,'Jan','Doe',1,'jan.doe@server.com','secret','','','',''),(26,'Jane','Doe',1,'jane.doe@server.com','secret','','','',''),(27,'John','Doe',1,'j.do@server.com','secret','','','',''),(28,'Jef','Koldenhof',1,'j.koldenhof@server.com','swagger64','','','',''),(29,'Henry','Doe',1,'h.doe@server.com','password1','','','',''),(30,'mohamad','nader',1,'mohamadnader@mail.com','secret','','','',''),(31,'Test','Tester',1,'test.123@gmail.com','secret','','','',''),(32,'Joost','van Dam',1,'ja.vandam3@student.avans.nl','secret123','','','',''),(33,'Jahn','Doe',1,'j.dsoe@server.com','secret','','','',''),(34,'John','Doe',1,'ditiseentest@test.nl','secret','','','Lovensdijkstraat 61','Breda'),(35,'Henk','de Graver',1,'henk@degraver.nl','secret','','','Lovensdijkstraat 61','Breda'),(36,'John','Doe',1,'test@test6565165216.nl','secret','','','Lovensdijkstraat 61','Breda'),(37,'John','Doe',1,'test@test656516f5216.nl','secret','','','Lovensdijkstraat 61','Breda'),(38,'John','Doe',1,'j.doe2@server.com','secret','','','Lovensdijkstraat 61','Breda'),(39,'Po','Pa',1,'popa@popa.popa','popa','','','popa 1','popa'),(40,'John','Doe',1,'jdoe@example.com','hunter12','','','lovendrijkstraat 12','Breda'),(41,'Jeffrey','Nobody',1,'jeff@pm.io','Cdjp@EyH9zv$9U9mPv23@KnCkki3qY','+1622341177','','Examplestreet 2','Unknown'),(42,'Daveon','Brannen',1,'daveon.brannen@ifyourock.com','LVHKVabtRue5LpCk9G','','','Ertsstraat 78','Steenbergen'),(43,'Davide','Ambesi',1,'d.ambesi@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(44,'Joh','De',1,'j.doe@ser.com','secret','','','Lovensdijkstraat 61','Breda'),(45,'Joh','De',1,'assert@test.com','secret','','','Lovensdijkstraat 61','Breda'),(46,'Joh','De',1,'assert@test.nl','secret','','','Lovensdijkstraat 61','Breda'),(47,'Joh','De',1,'assert@test.it','secret','','','Lovensdijkstraat 61','Breda'),(48,'Joh','De',1,'assert@test.oj','secret','','','Lovensdijkstraat 61','Breda'),(49,'Joh','De',1,'assert@test.ol','secret','','','Lovensdijkstraat 61','Breda'),(50,'Joh','De',1,'assert@tet.ol','secret','','','Lovensdijkstraat 61','Breda'),(51,'Joh','De',1,'asert@tet.ol','secret','','','Lovensdijkstraat 61','Breda'),(52,'Joh','De',1,'aset@tet.ol','secret','','','Lovensdijkstraat 61','Breda'),(53,'Joh','De',1,'ast@tet.ol','secret','','','Lovensdijkstraat 61','Breda'),(54,'Joh','De',1,'ast@et.ol','secret','','','Lovensdijkstraat 61','Breda'),(55,'Joh','De',1,'ast@t.ol','secret','','','Lovensdijkstraat 61','Breda'),(56,'Joh','De',1,'ast@t.td','secret','','','Lovensdijkstraat 61','Breda'),(57,'Joh','De',1,'1234567@student.nl','secret','','','Lovensdijkstraat 61','Breda'),(58,'Joh','De',1,'2234567@student.nl','secret','','','Lovensdijkstraat 61','Breda'),(59,'Joh','De',1,'1234567@student.com','secret','','','Lovensdijkstraat 61','Breda'),(60,'Joh','De',1,'2234567@student.com','secret','','','Lovensdijkstraat 61','Breda'),(61,'Joh','De',1,'1234567@student.it','secret','','','Lovensdijkstraat 61','Breda'),(62,'Joh','De',1,'2234567@student.it','secret','','','Lovensdijkstraat 61','Breda'),(65,'Assertion','Bot',1,'a.bot@server.com','secret','','','Lovensdijkstraat 61','Breda'),(66,'Jim','Doe',1,'j@server.com','secret','','','Lovensdijkstraat 61','Breda'),(67,'Assertion','Server',1,'assertion.server@mail.com','secret','','','Lovensdijkstraat 61','Breda'),(68,'Kasper','van den Enden',1,'k.vandenenden1@student.avans.nl','secret','','','Heinoord 7','Breda'),(69,'John','Doe',1,'j.doe22@server.com','secret','','','Lovensdijkstraat 61','Breda'),(70,'Assertion','Server',1,'3243242.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(71,'Assertion','Server',1,'3243242-fdfsdf.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(72,'Assertion','Server',1,'656353.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(73,'Assertion','Server',1,'1234567.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(74,'Assertion','Server',1,'56526.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(75,'Assertion','Server',1,'76848.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(76,'Assertion','Server',1,'79568.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(77,'Assertion','Server',1,'756785673.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(78,'Assertion','Server',1,'1232541.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(79,'Assertion','Server',1,'45454.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(80,'Assertion','Server',1,'642.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(81,'Assertion','Server',1,'7567.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(82,'Assertion','Server',1,'868.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(83,'Assertion','Server',1,'8766352.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(84,'Assertion','Server',1,'2434235.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(85,'Assertion','Server',1,'49494@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(86,'Assertion','Server',1,'9494565@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(87,'Assertion','Server',1,'1234567@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(88,'Assertion','Server',1,'24234235@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(89,'Assertion','Server',1,'9797@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(90,'Assertion','Server',1,'316164@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(91,'Assertion','Server',1,'2324@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(92,'Assertion','Server',1,'123456@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(93,'Assertion','Server',1,'949464@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(94,'Assertion','Server',1,'6547526@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(95,'Assertion','Server',1,'65645@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(96,'Assertion','Server',1,'9756@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(97,'Assertion','Server',1,'77775@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(98,'Assertion','Server',1,'5494.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(99,'Assertion','Server',1,'7567567.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(100,'Assertion','Server',1,'22223@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(101,'Assertion','Server',1,'623434@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(102,'Assertion','Server',1,'346346@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(103,'Assertion','Server',1,'33332@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(104,'John','Doe',1,'j.doe@server.lpl','secret','','','Lovensdijkstraat 61','Breda'),(105,'Assertion','Server',1,'6756756.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(106,'John','Doe',1,'j.doedas@server.com','secret','','','Lovensdijkstraat 61','Breda'),(107,'Assertion','Server',1,'8886@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(108,'Assertion','Server',1,'43225@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(109,'Assertion','Server',1,'124@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(110,'Assertion','Server',1,'111434@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(111,'Assertion','Server',1,'45345@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(112,'Assertion','Server',1,'94681@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(113,'Assertion','Server',1,'6456234@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(114,'Assertion','Server',1,'64562@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(115,'Assertion','Server',1,'94681.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(116,'Assertion','Server',1,'9461@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(117,'Assertion','Server',1,'9461.server@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(118,'Assertion','Server',1,'463464@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(119,'Assertion','Server',1,'625651@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(120,'Assertion','Server',1,'13535@avans.nl','secret','','','Lovensdijkstraat 61','Breda'),(121,'Assertion','Server',1,'assertion.server@avans.nl','s','','','Lovensdijkstraat 61','Breda'),(122,'Joh','De',1,'9461453@savans.nl','secret','','','Lovensdijkstraat 61','Breda'),(123,'Joh','De',1,'943@savans.nl','secret','','','Lovensdijkstraat 61','Breda'),(124,'Joh','De',1,'94303929@savans.nl','secret','','','Lovensdijkstraat 61','Breda'),(125,'Joh','De',1,'9430392@savans.nl','secret','','','Lovensdijkstraat 61','Breda'),(126,'Joh','De',1,'94303923@savans.nl','secret','','','Lovensdijkstraat 61','Breda'),(127,'Joh','De',1,'46525@savans.nl','secret','','','Lovensdijkstraat 61','Breda'),(132,'A','3213',1,'a.doe@server.com','secret','243','guest','Lovensdijkstraat 61','Breda'),(133,'John','Doe',1,'j.doe@serversdesgsfg.com','secret','','','Lovensdijkstraat 61','Breda');
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

-- Dump completed on 2022-05-11  9:58:32
