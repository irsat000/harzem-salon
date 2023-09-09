

USE HarzemSalon
GO

INSERT INTO Testimonials VALUES ('Sümbül Güneþ', 'Çalýþanlar iþlerini özenle yapýyor, Songül haným iþinin çok ehli. 3 yýldýr devamlý müþterisiyim.')
INSERT INTO Testimonials VALUES ('Fatma Sönmez', 'Hayatýmda gördüðüm en iyi hizmeti burada aldým. Kullanýlan ürünler gayet kaliteli.')
INSERT INTO Testimonials VALUES ('Suzan Söke', 'Sýrada beklerken diðer müþterilerle bol bol sohbet ettik. Sadece çalýþanlar deðil, müþteriler de kaliteli insanlar.')
INSERT INTO Testimonials VALUES ('Ayþe Gümüþ', 'Songül hanýmla çok eskiden beri arkadaþýz. Yine de müþterilerin hakkýna girip sýrada beni öne geçirmiyor. Dürüst insanlar her zaman hak ettiðine sahip olur.')

INSERT INTO DiscountCombinations VALUES ('Saç + Boya')
INSERT INTO DiscountCombinations VALUES ('Protez týrnak + Kalýcý oje')
INSERT INTO DiscountCombinations VALUES ('Kaþ & Býyýk + Aðda')

INSERT INTO ServiceCategories VALUES (1, 'sac')
INSERT INTO ServiceCategories VALUES (2, 'tirnak')
INSERT INTO ServiceCategories VALUES (3, 'makyaj')
INSERT INTO ServiceCategories VALUES (4, 'kirpik')
INSERT INTO ServiceCategories VALUES (5, 'dudak')
INSERT INTO ServiceCategories VALUES (6, 'epilasyon_depilasyon')

INSERT INTO OurServices VALUES ('Kesim', 'kesim', 1)
INSERT INTO OurServices VALUES ('Boya', 'boya', 1)
INSERT INTO OurServices VALUES ('Fön', 'fon', 1)
INSERT INTO OurServices VALUES ('Topuz', 'topuz', 1)
INSERT INTO OurServices VALUES ('Manikür', 'manikur', 2)
INSERT INTO OurServices VALUES ('Protez týrnak', 'protez_tirnak', 2)
INSERT INTO OurServices VALUES ('Kalýcý oje', 'kalici_oje', 2)
INSERT INTO OurServices VALUES ('Kalýcý makyaj', 'kalici_makyaj', 3)
INSERT INTO OurServices VALUES ('Makyaj', 'makyaj', 3)
INSERT INTO OurServices VALUES ('BB Glow', 'bb_glow', 3)
INSERT INTO OurServices VALUES ('Ýpek kirpik', 'ipek_kirpik', 4)
INSERT INTO OurServices VALUES ('Kirpik lifting', 'kirpik_lifting', 4)
INSERT INTO OurServices VALUES ('Ýðnesiz dudak dolgusu', 'ignesiz_dudak_dolgusu', 5)
INSERT INTO OurServices VALUES ('Lazer epilasyon', 'lazer_epilasyon', 6)
INSERT INTO OurServices VALUES ('Ýðneli epilasyon', 'igneli_epilasyon', 6)
INSERT INTO OurServices VALUES ('Kaþ & Býyýk', 'kas_&_biyik', 6)
INSERT INTO OurServices VALUES ('Aðda', 'agda', 6)

