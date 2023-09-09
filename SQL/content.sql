

USE HarzemSalon
GO

INSERT INTO Testimonials VALUES ('S�mb�l G�ne�', '�al��anlar i�lerini �zenle yap�yor, Song�l han�m i�inin �ok ehli. 3 y�ld�r devaml� m��terisiyim.')
INSERT INTO Testimonials VALUES ('Fatma S�nmez', 'Hayat�mda g�rd���m en iyi hizmeti burada ald�m. Kullan�lan �r�nler gayet kaliteli.')
INSERT INTO Testimonials VALUES ('Suzan S�ke', 'S�rada beklerken di�er m��terilerle bol bol sohbet ettik. Sadece �al��anlar de�il, m��teriler de kaliteli insanlar.')
INSERT INTO Testimonials VALUES ('Ay�e G�m��', 'Song�l han�mla �ok eskiden beri arkada��z. Yine de m��terilerin hakk�na girip s�rada beni �ne ge�irmiyor. D�r�st insanlar her zaman hak etti�ine sahip olur.')

INSERT INTO DiscountCombinations VALUES ('Sa� + Boya')
INSERT INTO DiscountCombinations VALUES ('Protez t�rnak + Kal�c� oje')
INSERT INTO DiscountCombinations VALUES ('Ka� & B�y�k + A�da')

INSERT INTO ServiceCategories VALUES (1, 'sac')
INSERT INTO ServiceCategories VALUES (2, 'tirnak')
INSERT INTO ServiceCategories VALUES (3, 'makyaj')
INSERT INTO ServiceCategories VALUES (4, 'kirpik')
INSERT INTO ServiceCategories VALUES (5, 'dudak')
INSERT INTO ServiceCategories VALUES (6, 'epilasyon_depilasyon')

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

