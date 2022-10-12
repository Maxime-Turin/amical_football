-- Deploy amical_football_bdd:change_status_functions to pg

BEGIN;

-- Set all request_status=waiting on rejected when a announcement_status is set on completed or passed
CREATE FUNCTION set_requests_status_rejected(json) 
RETURNS SETOF request
AS $$
    UPDATE "request" SET
        "requestStatus" = 'rejected',
        "updated_at" = now()
    WHERE "requestStatus" = 'waiting'
    AND "announcementId" = ($1->>'announcementId')::INT
    RETURNING *
$$ LANGUAGE sql;

COMMIT;
