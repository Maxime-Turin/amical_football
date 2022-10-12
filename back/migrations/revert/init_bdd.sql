-- Revert amical_football_bdd:init_bdd from pg

BEGIN;

DROP TABLE "user", "announcement", "request", "dev_team" CASCADE;

COMMIT;
