-- Revert amical_football_bdd:seeding from pg

BEGIN;

TRUNCATE TABLE "dev_team", "request", "announcement", "user";

COMMIT;
