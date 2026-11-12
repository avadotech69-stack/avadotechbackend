-- Database Backup Data
-- WARNING: Running this will overwrite/delete existing data in these tables!
TRUNCATE TABLE portfolio_banners, services, works RESTART IDENTITY CASCADE;

-- Insert portfolio_banners
INSERT INTO portfolio_banners (id, image_url, created_at) VALUES (1, 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/81a75e7c089e9049a44cdf7cd99d1434.png', '2025-11-18T15:14:19.948Z');
INSERT INTO portfolio_banners (id, image_url, created_at) VALUES (2, 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/ae8c4823164f5717ea8292a13a699874.png', '2025-11-18T15:16:01.872Z');
INSERT INTO portfolio_banners (id, image_url, created_at) VALUES (3, 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/03ef8366f0e23d89f089166d88efe10a.png', '2025-11-18T15:25:22.262Z');
INSERT INTO portfolio_banners (id, image_url, created_at) VALUES (4, 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/bfa0cd0ae5ba2afe3264a765165acf97.png', '2025-11-18T15:25:33.829Z');
INSERT INTO portfolio_banners (id, image_url, created_at) VALUES (5, 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/950c10d2f48dcbc2a923dd6eefad8226.png', '2025-11-18T15:33:46.595Z');
INSERT INTO portfolio_banners (id, image_url, created_at) VALUES (6, 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/ad161c92be9dd29d0fb2c7ca1ebd41c2.png', '2025-11-18T15:33:58.802Z');
SELECT setval('portfolio_banners_id_seq', (SELECT MAX(id) FROM portfolio_banners));

-- Insert services
INSERT INTO services (id, title, image_url, created_at) VALUES (6, 'Website & Landing Page', 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/e1d6f0df8d21f54382ad8c11a26152a8.jpeg', '2026-05-10T21:22:18.714Z');
INSERT INTO services (id, title, image_url, created_at) VALUES (7, 'Digital Marketing', 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/5abddac7a0ed5c2c55ebda29f2dbbc35.jpeg', '2026-05-10T21:29:25.097Z');
INSERT INTO services (id, title, image_url, created_at) VALUES (8, 'Website Recreation', 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/3845230b35f36aae4558cbf3cb390749.jpeg', '2026-05-10T21:35:29.384Z');
INSERT INTO services (id, title, image_url, created_at) VALUES (9, 'Grow With Avado', 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/7eb6988b0d8bf981a520fe229a68f2fc.png', '2026-05-10T21:44:16.618Z');
SELECT setval('services_id_seq', (SELECT MAX(id) FROM services));

-- Insert works
INSERT INTO works (id, name, description, image_url, link, created_at) VALUES (1, 'Demo Website', 'A demo website for your bussiness', 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/ede69facb02b887bd2b4a14f8b09151e.png', 'https://avadotechdemo2.pages.dev/', '2026-05-10T22:11:43.423Z');
INSERT INTO works (id, name, description, image_url, link, created_at) VALUES (2, 'Demo Website', 'A demo website for your bussiness', 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/ede69facb02b887bd2b4a14f8b09151e.png', 'https://avadotechdemo2.pages.dev/', '2026-05-10T22:12:52.515Z');
INSERT INTO works (id, name, description, image_url, link, created_at) VALUES (3, 'Demo Website', 'A demo website for your bussiness', 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/ede69facb02b887bd2b4a14f8b09151e.png', 'https://avadotechdemo2.pages.dev/', '2026-05-10T22:12:52.577Z');
INSERT INTO works (id, name, description, image_url, link, created_at) VALUES (4, 'Demo Website', 'A demo website for your bussiness', 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/ede69facb02b887bd2b4a14f8b09151e.png', 'https://avadotechdemo2.pages.dev/', '2026-05-10T22:12:52.626Z');
INSERT INTO works (id, name, description, image_url, link, created_at) VALUES (5, 'Demo Website', 'A demo website for your bussiness', 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/ede69facb02b887bd2b4a14f8b09151e.png', 'https://avadotechdemo2.pages.dev/', '2026-05-10T22:12:52.675Z');
INSERT INTO works (id, name, description, image_url, link, created_at) VALUES (6, 'Demo Website', 'A demo website for your bussiness', 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/ede69facb02b887bd2b4a14f8b09151e.png', 'https://avadotechdemo2.pages.dev/', '2026-05-10T22:12:52.725Z');
INSERT INTO works (id, name, description, image_url, link, created_at) VALUES (7, 'Etielkha-Jewellery Shop', NULL, 'https://pub-5e14a36dcd7943d794806a5750f4f197.r2.dev/44ae505f4029436dfd5bb07acdd84d70.png', 'https://etilekha.pages.dev/', '2026-06-16T17:47:39.771Z');
SELECT setval('works_id_seq', (SELECT MAX(id) FROM works));

