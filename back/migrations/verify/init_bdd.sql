-- Verify amical_football_bdd:init_bdd on pg

BEGIN;

SELECT
    "id",
    "name",
    "picture",
    "description",
    "field",
    "level",
    "coach_name",
    "mail",
    "phone",
    "postal_code",
    "city",
    "password"
FROM "user"
WHERE false
;

SELECT
    "id",
    "date",
    "level",
    "place",
    "description",
    "field",
    "status_announcement",
    "user_id"
FROM "announcement"
WHERE false
;

SELECT
    "id",
    "status_request",
    "user_id",
    "announcement_id"
FROM "request"    
WHERE false
;

SELECT
    "name",
    "firstname",
    "role",
    "desc",
    "profile_picture",
    "gh_url",
    "lkn_url"
FROM "dev_team"    
WHERE false
;

ROLLBACK;
