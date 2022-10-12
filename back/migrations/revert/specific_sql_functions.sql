-- Revert amical_football_bdd:specific_sql_functions from pg

BEGIN;
DROP FUNCTION
    "read_filtered_announcements",
    "read_request_received",
    "read_request_sended",
    "read_user_connected";

COMMIT;
