


CREATE DATABASE HarzemSalon;
GO
USE HarzemSalon;
GO


-- SITE CONTENT

CREATE TABLE DiscountCombinations(
	id INT PRIMARY KEY IDENTITY(1, 1),
	combination NVARCHAR(255) NOT NULL
);

CREATE TABLE Testimonials(
	id INT PRIMARY KEY IDENTITY(1, 1),
	fullName NVARCHAR(255) NOT NULL,
	content NVARCHAR(MAX) NOT NULL
);

CREATE TABLE Gallery(
	id INT PRIMARY KEY IDENTITY(1, 1),
	imageLink NVARCHAR(MAX) NOT NULL,
	title NVARCHAR(MAX) NULL,
    uploadDate DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE ServiceCategories(
	id INT PRIMARY KEY,
	cateCode NVARCHAR(100) NOT NULL
);

CREATE TABLE OurServices(
	id INT PRIMARY KEY IDENTITY(1, 1),
	serviceName NVARCHAR(100) NOT NULL,
	serviceCode NVARCHAR(100) NOT NULL,
	cateId INT NOT NULL,
	CONSTRAINT FK_OurServices_ServiceCategories FOREIGN KEY (cateId) REFERENCES ServiceCategories(id)
);

-- Each Mini Gallery in the website will have "All" and singular service options
-- If a service is deleted, we will have to delete the images from storage using the imageLink (idk how)
CREATE TABLE MiniGalleryImages(
	id INT PRIMARY KEY IDENTITY(1, 1),
	imageLink NVARCHAR(MAX) NOT NULL,
	serviceId INT NOT NULL,
	CONSTRAINT FK_MiniGalleryImages_OurServices FOREIGN KEY (serviceId) REFERENCES OurServices(id) ON DELETE CASCADE
);


-- USER MANAGEMENT

CREATE TABLE Admins(
	id INT PRIMARY KEY IDENTITY(1, 1),
	adminName NVARCHAR(255) NOT NULL UNIQUE,
	adminPassword NVARCHAR(255) NOT NULL
);


CREATE TABLE Customers(
	id INT PRIMARY KEY IDENTITY(1, 1),
	customerNO INT NOT NULL UNIQUE,
	pinCode NVARCHAR(60) NOT NULL,
	fullName NVARCHAR(255) NOT NULL UNIQUE,
	balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);

CREATE TABLE NewComers(
	id INT PRIMARY KEY IDENTITY(1, 1),
	fullName NVARCHAR(255) NOT NULL,
	customerNO INT NOT NULL,
	CONSTRAINT FK_NewComer_Customer FOREIGN KEY (customerNO) REFERENCES Customers(customerNO)
);

-- LOGGING

CREATE TABLE DeletedCustomers(
	id INT PRIMARY KEY IDENTITY(1, 1),
    customerNO INT NOT NULL,
    pinCode NVARCHAR(60) NOT NULL,
    fullName NVARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    deletionDate DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE DeletedNewComers(
	id INT PRIMARY KEY IDENTITY(1, 1),
	fullName NVARCHAR(255) NOT NULL,
	customerNO INT NOT NULL,
	deletionDate DATETIME NOT NULL DEFAULT GETDATE()
);

GO


CREATE TRIGGER trg_CustomerDeletion
ON Customers
AFTER DELETE
AS
BEGIN
	-- Insert the deleted customer information into DeletedCustomers
    INSERT INTO DeletedCustomers (customerNO, pinCode, fullName, balance)
    SELECT customerNO, pinCode, fullName, balance
    FROM deleted;

	-- Insert related NewComers into DeletedNewComers
    INSERT INTO DeletedNewComers (fullName, customerNO)
    SELECT nc.fullName, nc.customerNO
    FROM NewComers nc
    INNER JOIN deleted d ON nc.customerNO = d.customerNO;

    -- Remove related entries from NewComers table
    DELETE nc
    FROM NewComers nc
    INNER JOIN deleted d ON nc.customerNO = d.customerNO;

	-- nc = NewComers
	-- d = deleted
END;