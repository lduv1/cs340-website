-- Table structure for table `Users`

DROP TABLE IF EXISTS Users;

CREATE TABLE `Users` (
    `userID` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    `email` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Sample data dump for table `Users`
LOCK TABLES `Users` WRITE;

INSERT INTO `Users` (`userID`, `email`, `password`, `first_name`, `last_name`) 
VALUES (NULL, 'br@oregonstate.edu', 'xxxxx', 'Bill', 'Russell'), (NULL, 'mj@oregonstate.edu', 'xxxxxxx', 'Michael', 'Jordan'), (NULL, 'baz@oregonstate.edu', 'xxxxxxxxx', 'Larry', 'Bird'), (NULL, 'lb@oregonstate.edu', 'xx', 'Lebron', 'James'), (NULL, 'je@oregonstate.edu', 'xxxxxxxxx', 'Julius', 'Erving');
UNLOCK TABLES;


-- Table structure for table `Builds`

DROP TABLE IF EXISTS Builds;

CREATE TABLE `Builds` (
    `buildID` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    `userID` int(11) NOT NULL,
    PRIMARY KEY (`buildID`),
    FOREIGN KEY (`userID`) REFERENCES Users(`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Sample data dump for `Builds`
LOCK TABLES `Builds` WRITE;
INSERT INTO `Builds` (`buildID`, `userID`) 
VALUES (NULL, 1), (NULL, 2), (NULL, 3), (NULL, 4), (NULL, 5);
UNLOCK TABLES;


-- Table Structure for table `Parts`

DROP TABLE IF EXISTS Parts;

CREATE TABLE `Parts` (
    `partID` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    -- partType might work better as a varchar, but keeping as an int as per project drafts for now
    `partType` int(11) NOT NULL,
    `price` int(11) NOT NULL,
    `specs` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Sample data dump for `Parts`
LOCK TABLES `Parts` WRITE;
INSERT INTO `Parts` (`partID`, `partType`, `price`, `specs`)
VALUES (NULL, 1, 1, 1), (NULL, 2, 2, 2), (NULL, 3, 3, 3), (NULL, 4, 4, 4), (NULL, 5, 5, 5);
UNLOCK TABLES;


-- Table Structure for table `Ratings`
DROP TABLE IF EXISTS Ratings;

CREATE TABLE `Ratings` (
    `ratingID` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    `userID` int(11) NULL,
    `ratedID` int(11) NOT NULL,
    `buildOrPart` varchar(255) NOT NULL,
    `ratingValue` int(11) NOT NULL,
    `comment` varchar(255) NULL,
    FOREIGN KEY (`userID`) REFERENCES Users(`userID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Sample data dump for `Ratings`
LOCK TABLES `Ratings` WRITE;
INSERT INTO `Ratings` (`ratingID`, `userID`, `ratedID`, `buildOrPart`, `ratingValue`, `comment`)
VALUES (NULL, 1, 1, 'build', 1, "Love it!"), (NULL, 2, 2, 'build', 2, "nice"), (NULL, 3, 3, 'part', 3, NULL), (NULL, 4, 4, 'part', 4, "alright"),(NULL, 5, 5, 'build', 5, NULL);
UNLOCK TABLES;



DROP TABLE IF EXISTS Builds_Parts;

CREATE TABLE `Builds_Parts` (
    `buildID` int(11) NOT NULL,
    `partID` int(11) NOT NULL,
    PRIMARY KEY (`buildID`, `partID`),
    FOREIGN KEY (`buildID`) REFERENCES Builds(`buildID`) ON DELETE CASCADE,
    FOREIGN KEY (`partID`) REFERENCES Parts(`partID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Sample data dump for `Builds`
LOCK TABLES `Builds_Parts` WRITE;
INSERT INTO `Builds_Parts` (`buildID`, `partID`) 
VALUES (1, 1), (1, 2), (1, 3), (2, 3), (3, 3), (5, 4), (4, 5);
UNLOCK TABLES;


