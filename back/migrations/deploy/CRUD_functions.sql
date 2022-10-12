-- Deploy amical_football_bdd:CRUD_functions to pg

BEGIN;

--? Action on One User
-- Create user
CREATE FUNCTION insert_user(json) 
RETURNS "user"
AS $$

    INSERT INTO "user" (
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
        $1->>'teamName',
        COALESCE($1->>'picture'),
        COALESCE($1->>'description'),
        COALESCE($1->>'field'),
        COALESCE($1->>'level'),
        COALESCE($1->>'category'),
        COALESCE($1->>'coachName'),
        ($1->>'mail')::mail,
        COALESCE(($1->>'phone')::phone),
        COALESCE(($1->>'postalCode')::postal_code_fr),
        COALESCE($1->>'city'),
        ($1->>'password')
    ) RETURNING *


$$ LANGUAGE sql;

-- Update user
CREATE FUNCTION update_user(json) 
RETURNS "user"
AS $$

    UPDATE "user" SET
        "teamName" = COALESCE($1->>'teamName', "teamName"),
        "picture" = COALESCE($1->>'picture', "picture"),
        "description" = COALESCE($1->>'description', "description"),
        "field" = COALESCE($1->>'field', "field"),
        "level" = COALESCE($1->>'level', "level"),
        "category" = COALESCE($1->>'category', "category"),
        "coachName" = COALESCE($1->>'coachName', "coachName"),
        "mail" = COALESCE(($1->>'mail')::mail, "mail"),
        "phone" = COALESCE(($1->>'phone')::phone, "phone"),
        "postalCode" = COALESCE(($1->>'postalCode')::postal_code_fr, "postalCode"),
        "city" = COALESCE($1->>'city', "city"),
        "password" = COALESCE($1->>'password', "password"),
        "updated_at" = now()
    WHERE id = ($1->>'id')::int
    RETURNING *
$$ LANGUAGE sql;

-- Delete user
CREATE FUNCTION delete_user(json) RETURNS "user" AS $$
    DELETE FROM "announcement"
    WHERE "announcement"."userId" = ($1->>'userId')::int;
    DELETE FROM "request"
    WHERE "request"."userId" = ($1->>'userId')::int;
    DELETE FROM "user"
    WHERE id = ($1->>'userId')::int
    RETURNING *
$$ LANGUAGE sql STRICT;

-- Read user
CREATE FUNCTION read_user(json) 
RETURNS "user"
AS $$
    SELECT *
    FROM "user"
    WHERE id = ($1->>'userId')::int
$$ LANGUAGE sql STRICT;

--? Action on One Announcement
-- Create announcement
CREATE FUNCTION insert_announcement(json) RETURNS announcement AS $$

    INSERT INTO "announcement" (
        "date",
        "level",
        "place",
        "description",
        "field",
        "announcementStatus",
        "userId"
    ) VALUES (
        ($1->>'date')::TIMESTAMPTZ,
        $1->>'level',
        $1->>'place',
        $1->>'description',
        $1->>'field',
        'waiting', --TODO  waiting / completed / expired
        ($1->>'userId')::INT
    ) RETURNING *

$$ LANGUAGE sql;

-- Update announcement
CREATE FUNCTION update_announcement(json) RETURNS announcement AS $$

    UPDATE "announcement" SET
        "date" = COALESCE(($1->>'date')::TIMESTAMPTZ, "date"),
        "level" = COALESCE($1->>'level', "level"),
        "place" = COALESCE($1->>'place', "place"),
        "description" = COALESCE($1->>'description', "description"),
        "field" = COALESCE($1->>'field', "field"),
        "announcementStatus" = COALESCE($1->>'announcementStatus', "announcementStatus"),
        "userId" = COALESCE(($1->>'userId')::INT, "userId"),
        "updated_at" = now()
    WHERE id = ($1->>'id')::int
    RETURNING *

$$ LANGUAGE sql;

-- Delete announcement
CREATE FUNCTION delete_announcement(json) RETURNS announcement AS $$
    DELETE FROM request
    WHERE "announcementId" = ($1->>'id')::int;
    DELETE FROM announcement
    WHERE id = ($1->>'id')::int
    RETURNING *
$$ LANGUAGE sql STRICT;

-- Read announcement
CREATE FUNCTION read_announcement(json) 
RETURNS TABLE(
    "announcementId" int,
    "announcementDate" timestamptz,
    "announcementLevel" text,
    "announcementPlace" text,
    "announcementDescription" text,
    "announcementField" text,
    "announcementAnnouncement_status" text,
    "announcementUserId" int,
    "userTeamName" text,
    "userCategory" text,
    "userPostal_code" postal_code_fr,
    "userPicture" text,
    "userCity" text,
    "userCoachName" text) 
AS $$
    SELECT
    "announcement"."id",
    "announcement"."date",
    "announcement"."level",
    "announcement"."place",
    "announcement"."description",
    "announcement"."field",
    "announcement"."announcementStatus",
    "announcement"."userId",
    "user"."teamName",
    "user"."category",
    "user"."postalCode",
    "user"."picture",
    "user"."city",
    "user"."coachName"
    FROM "announcement"
    JOIN "user" ON ("announcement"."userId" = "user"."id") 
    WHERE "userId" = ($1->>'userId')::int
    ORDER BY "announcement"."date" ASC
$$ LANGUAGE sql STRICT;

--? Action on One Request
-- Create request
CREATE FUNCTION insert_request(json) RETURNS request AS $$

    INSERT INTO "request" (
        "requestStatus",
        "userId",
        "announcementId"
    ) VALUES (
        'waiting', --TODO waiting / accepted / rejected
        ($1->>'userId')::INT,
        ($1->>'announcementId')::INT
    ) RETURNING *

$$ LANGUAGE sql;

-- Update request
CREATE FUNCTION update_request(json) RETURNS request AS $$

    UPDATE "request" SET
        "requestStatus" = COALESCE($1->>'requestStatus', "requestStatus"),
        "userId" = COALESCE(($1->>'userId')::INT, "userId"),
        "announcementId" = COALESCE(($1->>'announcementId')::INT, "announcementId"),
        "updated_at" = now()
    WHERE id = ($1->>'id')::int
    RETURNING *
$$ LANGUAGE sql;

-- Delete request
CREATE FUNCTION delete_request(json) RETURNS request AS $$
    DELETE FROM "request"
    WHERE id = ($1->>'id')::int
    RETURNING *
$$ LANGUAGE sql STRICT;

-- Read one request
CREATE FUNCTION read_request(json) RETURNS request AS $$
    SELECT * FROM "request"
    WHERE id = ($1->>'id')::int
$$ LANGUAGE sql STRICT;

--? dev_team
-- Read dev_team
CREATE FUNCTION read_dev_team(json) RETURNS dev_team AS $$
    SELECT * FROM "dev_team"
$$ LANGUAGE sql STRICT;

COMMIT;
