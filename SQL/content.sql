/* prod
INSERT INTO Testimonials VALUES ('�r�at', 'Deneme yaz� Deneme yaz� Deneme yaz� Deneme yaz�')
INSERT INTO DiscountCombinations VALUES ('Sa� + Boya')
INSERT INTO DiscountCombinations VALUES ('Ka� & B�y�k + A�da')
INSERT INTO ServiceCategories VALUES (1, 'sac')
INSERT INTO ServiceCategories VALUES (2, 'tirnak')
INSERT INTO ServiceCategories VALUES (3, 'makyaj')
INSERT INTO ServiceCategories VALUES (4, 'kirpik')
INSERT INTO ServiceCategories VALUES (5, 'dudak')
INSERT INTO ServiceCategories VALUES (6, 'epilasyon_depilasyon')
GO
INSERT INTO OurServices VALUES ('Kesim', 'kesim', 1)
INSERT INTO OurServices VALUES ('Boya', 'boya', 1)
INSERT INTO OurServices VALUES ('F�n', 'fon', 1)
INSERT INTO OurServices VALUES ('Topuz', 'topuz', 1)
INSERT INTO OurServices VALUES ('Manik�r', 'manikur', 2)
INSERT INTO OurServices VALUES ('Protez t�rnak', 'protez_tirnak', 2)
INSERT INTO OurServices VALUES ('Kal�c� oje', 'kalici_oje', 2)
INSERT INTO OurServices VALUES ('Kal�c� makyaj', 'kalici_makyaj', 3)
INSERT INTO OurServices VALUES ('Makyaj', 'makyaj', 3)
INSERT INTO OurServices VALUES ('BB Glow', 'bb_glow', 3)
INSERT INTO OurServices VALUES ('�pek kirpik', 'ipek_kirpik', 4)
INSERT INTO OurServices VALUES ('Kirpik lifting', 'kirpik_lifting', 4)
INSERT INTO OurServices VALUES ('��nesiz dudak dolgusu', 'ignesiz_dudak_dolgusu', 5)
INSERT INTO OurServices VALUES ('Lazer epilasyon', 'lazer_epilasyon', 6)
INSERT INTO OurServices VALUES ('��neli epilasyon', 'igneli_epilasyon', 6)
INSERT INTO OurServices VALUES ('Ka� & B�y�k', 'kas_&_biyik', 6)
INSERT INTO OurServices VALUES ('A�da', 'agda', 6)*/


USE sitelerguzellikdb
GO

INSERT INTO Testimonials VALUES ('S�mb�l G�ne�', '�al��anlar i�lerini �zenle yap�yor, Song�l han�m i�inin �ok ehli. 3 y�ld�r devaml� m��terisiyim.')
INSERT INTO Testimonials VALUES ('Fatma S�nmez', 'Hayat�mda g�rd���m en iyi hizmeti burada ald�m. Kullan�lan �r�nler gayet kaliteli.')
INSERT INTO Testimonials VALUES ('Suzan S�ke', 'S�rada beklerken di�er m��terilerle bol bol sohbet ettik. Sadece �al��anlar de�il, m��teriler de kaliteli insanlar.')
INSERT INTO Testimonials VALUES ('Ay�e G�m��', 'Song�l han�mla �ok eskiden beri arkada��z. Yine de m��terilerin hakk�na girip s�rada beni �ne ge�irmiyor. D�r�st insanlar her zaman hak etti�ine sahip olur.')

INSERT INTO DiscountCombinations VALUES ('Sa� + Boya')
INSERT INTO DiscountCombinations VALUES ('Ka� & B�y�k + A�da')
INSERT INTO DiscountCombinations VALUES ('Protez t�rnak + Kal�c� oje')



INSERT INTO ServiceCategories VALUES (1, 'sac')
INSERT INTO ServiceCategories VALUES (2, 'tirnak')
INSERT INTO ServiceCategories VALUES (3, 'makyaj')
INSERT INTO ServiceCategories VALUES (4, 'kirpik')
INSERT INTO ServiceCategories VALUES (5, 'dudak')
INSERT INTO ServiceCategories VALUES (6, 'epilasyon_depilasyon')
GO


DELETE FROM OurServices
GO
DBCC CHECKIDENT ('OurServices', RESEED, 0);
GO
INSERT INTO OurServices VALUES ('Kesim', 'kesim', 1)
INSERT INTO OurServices VALUES ('Boya', 'boya', 1)
INSERT INTO OurServices VALUES ('F�n', 'fon', 1)
INSERT INTO OurServices VALUES ('Topuz', 'topuz', 1)
INSERT INTO OurServices VALUES ('Manik�r', 'manikur', 2)
INSERT INTO OurServices VALUES ('Protez t�rnak', 'protez_tirnak', 2)
INSERT INTO OurServices VALUES ('Kal�c� oje', 'kalici_oje', 2)
INSERT INTO OurServices VALUES ('Kal�c� makyaj', 'kalici_makyaj', 3)
INSERT INTO OurServices VALUES ('Makyaj', 'makyaj', 3)
INSERT INTO OurServices VALUES ('BB Glow', 'bb_glow', 3)
INSERT INTO OurServices VALUES ('�pek kirpik', 'ipek_kirpik', 4)
INSERT INTO OurServices VALUES ('Kirpik lifting', 'kirpik_lifting', 4)
INSERT INTO OurServices VALUES ('��nesiz dudak dolgusu', 'ignesiz_dudak_dolgusu', 5)
INSERT INTO OurServices VALUES ('Lazer epilasyon', 'lazer_epilasyon', 6)
INSERT INTO OurServices VALUES ('��neli epilasyon', 'igneli_epilasyon', 6)
INSERT INTO OurServices VALUES ('Ka� & B�y�k', 'kas_&_biyik', 6)
INSERT INTO OurServices VALUES ('A�da', 'agda', 6)
GO
DELETE FROM MiniGalleryImages
GO
DBCC CHECKIDENT ('MiniGalleryImages', RESEED, 0);
GO
INSERT INTO MiniGalleryImages VALUES ('1.jpg', 1)
INSERT INTO MiniGalleryImages VALUES ('2.jpg', 1)
INSERT INTO MiniGalleryImages VALUES ('3.jpg', 1)
INSERT INTO MiniGalleryImages VALUES ('4.jpg', 2)
INSERT INTO MiniGalleryImages VALUES ('5.jpg', 3)
INSERT INTO MiniGalleryImages VALUES ('6.jpg', 4)



DELETE FROM Gallery
INSERT INTO Gallery VALUES ('1.jpg', 'Bug�n de b�yle bir �ey yapt�k. 1', GETDATE())
INSERT INTO Gallery VALUES ('2.jpg', 'Bug�n de b�yle bir �ey yapt�k. 2', GETDATE())
INSERT INTO Gallery VALUES ('3.jpg', 'Bug�n de b�yle bir �ey yapt�k. 3', GETDATE())
INSERT INTO Gallery VALUES ('4.jpg', 'Bug�n de b�yle bir �ey yapt�k. 4', GETDATE())
INSERT INTO Gallery VALUES ('5.jpg', 'Bug�n de b�yle bir �ey yapt�k. 5', GETDATE())
INSERT INTO Gallery VALUES ('6.jpg', 'Bug�n de b�yle bir �ey yapt�k. 6', GETDATE())
INSERT INTO Gallery VALUES ('7.jpg', 'Bug�n de b�yle bir �ey yapt�k. 7', GETDATE())
INSERT INTO Gallery VALUES ('8.jpg', 'Bug�n de b�yle bir �ey yapt�k. 8', GETDATE())
INSERT INTO Gallery VALUES ('9.jpg', 'Bug�n de b�yle bir �ey yapt�k. 9', GETDATE())
INSERT INTO Gallery VALUES ('10.jpg', 'Bug�n de b�yle bir �ey yapt�k. 10', GETDATE())














