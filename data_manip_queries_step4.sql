-- :name represents a value coming from the backend

-- ratings queries
SELECT * FROM ratings;

SELECT * FROM ratings
WHERE :searchCol = :searchVal;
--searchCol will come from the dropdown of the columns, searchVal is the value entered in the search bar

INSERT INTO ratings
(  userID, ratedID, buildOrPart, value, comment )
VALUES
( :userIDInput, :ratedIDInput, :buildOrPartInput, :valueInput, :commentInput );
-- buildOrPart will come from which form the user filled out.

UPDATE ratings
SET
    [value] = :valueInput,
    [comment] = :commentInput
WHERE 	ratings.ratingID = :ratingIDInput;

DELETE FROM ratings
WHERE 	ratings.ratingID = :ratingIDInput;


--parts queries
SELECT * from parts;

SELECT * FROM parts
WHERE :searchCol = :searchVal;
--searchCol will come from the dropdown of the columns, searchVal is the value entered in the search bar

INSERT INTO parts
(  partType, price, specs )
VALUES
( :partTypeInput, :priceInput, :specsInput );

DELETE FROM parts
WHERE 	parts.partID = :partIDInput;


--builds queries
SELECT * from builds;

SELECT * FROM builds
WHERE :searchCol = :searchVal;
--searchCol will come from the dropdown of the columns, searchVal is the value entered in the search bar

INSERT INTO builds
(  userID )
VALUES
( :userIDInput );

DELETE FROM builds
WHERE 	builds.buildID = :buildIDInput;


--builds_parts queries
SELECT * FROM parts
JOIN builds_parts ON parts.partID = builds_parts.partID
WHERE buildID = :buildIDInput;

INSERT INTO builds_parts
(  buildID, partID )
VALUES
( :buildIDInput, :partIDInput );

DELETE FROM builds_parts
WHERE buildID=:buildIDInput and partID=:partIDInput


--users queries
SELECT * from users;

SELECT * FROM users
WHERE :searchCol = :searchVal;
--searchCol will come from the dropdown of the columns, searchVal is the value entered in the search bar

INSERT INTO users
(  email, password, firstName, lastName )
VALUES
( :emailInput, :passwordInput, :firstNameInput, :lastNameInput );

DELETE FROM users
WHERE 	users.userID = :userIDInput;