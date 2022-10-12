-- Revert amical_football_bdd:CRUD_functions from pg

BEGIN;

DROP FUNCTION
    "insert_user",
    "insert_announcement",
    "insert_request",
    "update_user",
    "update_announcement",
    "update_request",
    "delete_user",
    "delete_announcement",
    "delete_request",
    "read_user",
    "read_announcement",
    "read_request",
    "read_dev_team";
COMMIT;
