-- Revert amical_football_bdd:domain from pg

BEGIN;

-- XXX Add DDLs here.

ALTER TABLE "user"
ALTER COLUMN "postalCode" type text;

ALTER TABLE "user"
ALTER COLUMN "mail" type text;

ALTER TABLE "user"
ALTER COLUMN "phone" type text;

DROP DOMAIN "postal_code_fr", "mail", "phone";

COMMIT;
