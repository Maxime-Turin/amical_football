-- Deploy amical_football_bdd:seeding to pg

BEGIN;

-- Seeding user
INSERT INTO "user"(
    "teamName",
    "picture",
    "description",
    "field",
    "level",
    "category",
    "coachName",
    "mail",
    "phone",
    "postalCode",
    "city",
    "password"
) VALUES (
    'Olympique de Lion (l''animal)',
    'https://res.cloudinary.com/dfpxxeqil/image/upload/v1663073481/TeamLogo/Logo_Olympique_Lyonnais_-_2022.svg_k4ebsr.png',
    'Equipe de fou, mais attention notre gardien il est plus boxeur que footballeur',
    'Synthétique',
    'Ligue 1',
    'Senior',
    'Juan Miguel Aulassalissure',
    'ol@ol.fr',
    '0696969696',
    '69000',
    'Lion',
    '$2b$10$3zx7cz6hsflpAni2TGq5oerTToVBWwyv2.CgK2RXW.L381bAJttWi'
),
(
    'USCV',
    'https://res.cloudinary.com/dfpxxeqil/image/upload/v1663073481/TeamLogo/277671192_453891526404536_2856626508924037439_n_vgityp.jpg',
    'Senior de l''US Chapelle-Voland, fans de foot et de bière',
    'Naturel',
    'District',
    'senior',
    'F-X',
    'uscv@uscv.fr',
    '0639393939',
    '39140',
    'Chapelle-Voland',
    '$2b$10$3zx7cz6hsflpAni2TGq5oerTToVBWwyv2.CgK2RXW.L381bAJttWi'
),
(
    'Prairie Saint Firmin',
    'https://res.cloudinary.com/dfpxxeqil/image/upload/v1663073481/TeamLogo/DefaultOpenGraphImage_wfroz2.png',
    'Petit équipe local pas du tout financé par l''argent du fioul tkt',
    'Synthétique',
    'Ligue 1',
    'senior',
    'Franstophe Galltier',
    'psg@psg.fr',
    '0675757575',
    '75000',
    'Prairie',
    '$2b$10$3zx7cz6hsflpAni2TGq5oerTToVBWwyv2.CgK2RXW.L381bAJttWi'
),
(
    'Olympique de Mars (la barre chocolaté)',
    'https://res.cloudinary.com/dfpxxeqil/image/upload/v1663073481/TeamLogo/1200px-Logo_Olympique_de_Marseille.svg_iw59zw.png',
    'Equipe réserve des Tigres UANL',
    'Synthétique',
    'Ligue 1',
    'senior',
    'Igor Grichka Tudor',
    'om@om.fr',
    '0613131313',
    '13000',
    'Mars',
    '$2b$10$3zx7cz6hsflpAni2TGq5oerTToVBWwyv2.CgK2RXW.L381bAJttWi'
),
(
    'Saint Moula',
    'https://res.cloudinary.com/dfpxxeqil/image/upload/v1663073481/TeamLogo/LogoUSSaintMalo2018.svg_cgmup7.png',
    'La meilleure équipe de Saint Malo, sans doute car c''est la seule. et on vend des galettes saucisses à la buvette',
    'Synthétique',
    'National 2',
    'senior',
    'Gwen Stefani Corbin',
    'ussm@ussm.fr',
    '0635353535',
    '35400',
    'Saint-Malodo',
    '$2b$10$3zx7cz6hsflpAni2TGq5oerTToVBWwyv2.CgK2RXW.L381bAJttWi'
),
(
    'FC Servon',
    'https://res.cloudinary.com/dfpxxeqil/image/upload/v1662454145/120840952_103305481548664_8596310777634956379_n_awxvkz.jpg',
    'Meilleur equipe de seine et marne, surement d''ile de france, voir meme de france, et disons de la planete',
    'Synthétique',
    'District',
    'senior',
    'Tom Guz',
    'fcservon@fcservon.fr',
    '0677777777',
    '77170',
    'Servon',
    '$2b$10$3zx7cz6hsflpAni2TGq5oerTToVBWwyv2.CgK2RXW.L381bAJttWi'
)
;

-- Seeding announcement
INSERT INTO "announcement"(
    "date",
    "level",
    "place",
    "description",
    "field",
    "userId"
) VALUES (
    '2022-09-15',
    'Ligue 1',
    'Domicile',
    'Recherche équipe de peintre pour entrainer notre gardien à la bagarre',
    'Synthétique',
    1
),
(
    '2022-09-25',
    'Ligue 1',
    'Exterieur',
    'Cherche équipe avec attaquant balaise pour échauffer notre gardien avant le début de la saison',
    'Synthétique',
    1
),
(
    '2022-09-09',
    'District',
    'Exterieur',
    'Match préparation saison 2022',
    'Naturel',
    2
),
(
    '2022-09-28',
    'District',
    'Domicile',
    'Match préparation saison 2022',
    'Naturel',
    2
),
(
    '2022-11-12',
    'Ligue 1',
    'Exterieur',
    'On viens en avion même si c''est à coté car flemme le train lol',
    'Synthétique',
    3
),
(
    '2022-12-12',
    'Ligue 1',
    'Domicile',
    'On peut affréter un avion si jamais',
    'Synthétique',
    3
),
(
    '2022-11-05',
    'Ligue 1',
    'Domicile',
    'Oui, ma gâtée, RS4 gris nardo, bien sûr qu''ils m''ont raté',
    'Synthétique',
    4
),
(
    '2022-09-12',
    'Ligue 1',
    'Exterieur',
    'On prefère jouer à huis clos à l''exté hé mercé le S',
    'Synthétique',
    4
),
(
    '2022-09-24',
    'Ligue 1',
    'Domicile',
    'Ils ont des chapeaux ronds, viveuu la breeeutagneuuuh',
    'Synthétique',
    5
),
(
    '2022-11-02',
    'Ligue 1',
    'Exterieur',
    'Ils ont des chapeaux ronds, viveuu lai breeeutooooooooons',
    'Naturel',
    5
),
(
    '2022-09-15',
    'District',
    'Exterieur',
    'Match préparation saison 2022',
    'Naturel',
    6
),
(
    '2022-11-14',
    'District',
    'Domicile',
    'Match préparation saison 2022',
    'Synthétique',
    6
)
;

INSERT INTO "request"(
    "userId",
    "announcementId"
) VALUES (
    3,
    1
),
(
    4,
    1
),
(
    4,
    2
),
(
    3,
    2
),
(
    3,
    3
),
(
    6,
    3
),
(
    5,
    4
),
(
    4,
    4
),
(
    4,
    5
),
(
    1,
    5
),
(
    6,
    6
),
(
    1,
    6
),
(
    3,
    7
),
(
    2,
    7
),
(
    1,
    8
),
(
    5,
    8
),
(
    6,
    9
),
(
    1,
    9
),
(
    4,
    10
),
(
    2,
    10
),
(
    2,
    11
),
(
    4,
    11
),
(
    5,
    12
),
(
    1,
    12
);


INSERT INTO "dev_team"(
    "name",
    "firstname",
    "role",
    "desc",
    "profilePicture",
    "ghUrl",
    "lknUrl"
) VALUES (
    'Alexandre',
    'Monney',
    'Product Owner, Git Master, Premier de la classe & Doug originel',
    'D''aprés mes collègues je suis le meilleur d''entre nous, un peu déçu, je pensais etre le meilleur tout court.',
    'https://avatars.githubusercontent.com/u/101280231?v=4',
    'https://github.com/Alexandre-Monney',
    'https://www.linkedin.com/in/alexandre-monney/'
),
(
    'Jordan',
    'Waheo',
    'Scrum Master, Dev Back, Meme Lord, Product Owner''s Slave',
    'Fusion sucré-salé entre l''Asie et le Pacifique, le work flow de son mood-credo aura été le nindo de son background.',
    'https://avatars.githubusercontent.com/u/69750036?v=4',
    'https://github.com/Jordan-WAHEO',
    'https://www.linkedin.com/in/jordan-waheo/'
),
(
    'Pierre',
    'Arquevaux',
    'Lead Dev Front et imitateur',
    'Développeur breton & pizzaiolo. 2 passions, 1 talent.',
    'https://avatars.githubusercontent.com/u/98599885?v=4',
    'https://github.com/Pierre-Arquevaux',
    'https://www.linkedin.com/in/pierre-arquevaux-93097259/'
),
(
    'Maxime',
    'Turin',
    'Lead Dev Back, Gourou de secte & Dougger originel',
    'En plus d''être gratifié d''un charisme fou, d''un cerveau généreusement proportionné et d''une beauté naturelle, je suis doté d''une rare humilité',
    'https://avatars.githubusercontent.com/u/87705132?v=4',
    'https://github.com/Maxime-Turin',
    'https://www.linkedin.com/in/maxime-turin/'
);

COMMIT;
