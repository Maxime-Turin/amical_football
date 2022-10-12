-- Deploy amical_football_bdd:domain to pg

BEGIN;

CREATE DOMAIN "mail" AS text CHECK (
    value ~ '^[a-zA-Z0-9.!#$%&''*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' -- format d'email general xx@xxx.xx
);

CREATE DOMAIN "phone" AS text CHECK (
    value ~ '^0([1-7]|[9])(\d{2}){4}$' -- numéro de téléphone allant de 01 à 09 de 10 chiffres hors 08
);

CREATE DOMAIN "postal_code_fr" AS text CHECK (
    value ~ '^0[1-9]\d{3}$' -- code postaux metropole de 01 a 09
    OR value ~ '^20[1-2]\d{2}$|^20300$' -- code postaux de la Corse
    OR value ~ '^[13-8]\d{4}$' -- code postaux les plus génériques
    OR value ~ '^9[0-6]\d{3}$' -- code postaux metropole commencant par 9
    OR value ~ '^97[1-6]\d{2}$' -- code postaux DOM
    OR value ~ '^98[4678]\d{2}$' -- code postaux TOM
    OR value ~ '^9{5}$' -- code postal de la poste
);

ALTER TABLE "user"
ALTER COLUMN "postalCode" type postal_code_fr;

ALTER TABLE "user"
ALTER COLUMN "mail" type mail;

ALTER TABLE "user"
ALTER COLUMN "phone" type phone;

COMMIT;
