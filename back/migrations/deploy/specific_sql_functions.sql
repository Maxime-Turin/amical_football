-- Deploy amical_football_bdd:specific_sql_functions to pg

BEGIN;

-- Get all announcements using filters
CREATE FUNCTION read_filtered_announcements(json) 
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
    "userPostalCode" postal_code_fr,
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
        WHERE
            "announcement"."date" = COALESCE(($1->>'date')::TIMESTAMPTZ, "announcement"."date")
        AND
            "announcement"."level" = COALESCE($1->>'level', "announcement"."level")
        AND
            "place" = COALESCE($1->>'place', "place")
        AND
            "user"."postalCode" ~ COALESCE(($1->>'postalCode'), "user"."postalCode") 
        AND
            "announcement"."announcementStatus" = 'waiting'
    ORDER BY "announcement"."date" ASC
$$ LANGUAGE sql;

-- Get all requests received on an announcement
CREATE FUNCTION read_request_received(json) 
RETURNS TABLE(
        "announcementId" int,
        "announcementDate" timestamptz,
        "announcementLevel" text,
        "announcementPlace" text,
        "announcementDescription" text,
        "announcementField" text,
        "announcementStatus" text,
        "requestId" int,
        "requestRequestStatus" text,
        "requestUserId" int,
        "requestAnnouncementId" int,
        "userRequestTeamName" text,
        "userRequestPicture" text
)
AS $$
    SELECT
        "announcement"."id",
        "announcement"."date",
        "announcement"."level",
        "announcement"."place",
        "announcement"."description",
        "announcement"."field",
        "announcement"."announcementStatus",
        "request"."id",
        "request"."requestStatus",
        "request"."userId",
        "request"."announcementId",
        "requestUser"."teamName",
        "requestUser"."picture"
    FROM "user" AS "connectedUser"
    JOIN "announcement"  ON "announcement"."userId" = "connectedUser"."id"
    JOIN "request" ON "request"."announcementId" = "announcement"."id"
    JOIN "user" AS "requestUser" ON "requestUser"."id" = "request"."userId"
    WHERE "connectedUser"."id" = ($1->>'userId')::INT
    ORDER BY "announcement"."date" ASC
$$ LANGUAGE sql;

-- Get all requests sended by user and announcements who are related to
CREATE FUNCTION read_request_sended(json) 
RETURNS TABLE(
    "requestId" int,
    "requestRequestStatus" text,
    "requestUserId" int,
    "requestAnnouncementId" int,
    "announcementId" int,
    "announcementDate" timestamptz,
    "announcementLevel" text,
    "announcementPlace" text,
    "announcementDescription" text,
    "announcementField" text,
    "announcementStatus" text,
    "announcementUserId" int,
    "announcementUserTeamName" text,
    "announcementUserPicture" text,
    "announcementUserCity" text
)
AS $$
    SELECT
        "request"."id",
        "request"."requestStatus",
        "request"."userId",
        "request"."announcementId",
        "announcement"."id",
        "announcement"."date",
        "announcement"."level",
        "announcement"."place",
        "announcement"."description",
        "announcement"."field",
        "announcement"."announcementStatus",
        "announcement"."userId",
        "announcementUser"."teamName",
        "announcementUser"."picture",
        "announcementUser"."city"
    FROM "user"
    JOIN "request" ON "request"."userId" = "user"."id"
    JOIN "announcement" ON "request"."announcementId" = "announcement"."id"
    JOIN "user" AS "announcementUser" ON "announcementUser"."id" = "announcement"."userId"
    WHERE "user"."id" = ($1->>'userId')::INT
    ORDER BY "announcement"."date" ASC
$$ LANGUAGE sql;

CREATE FUNCTION read_user_connected(json) RETURNS "user" AS $$
    SELECT * FROM "user"
    WHERE "mail" = ($1->>'mail')::mail
    AND "password" = $1->>'password' 
$$ LANGUAGE sql STRICT;

COMMIT;
