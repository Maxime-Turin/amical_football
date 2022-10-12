-- Revert amical_football_bdd:change_status_functions from pg

BEGIN;

DROP FUNCTION
    "set_requests_status_rejected";
COMMIT;
