-- Deploy amical_football_bdd:init_bdd to pg

BEGIN;

DROP TABLE IF EXISTS "user", "announcement", "request", "dev_team";


CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "teamName" TEXT NOT NULL UNIQUE,
    "picture" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dfpxxeqil/image/upload/v1662367550/zhjcbsnbtzrnkpyonut7.png',
    "description" TEXT,
    "field" TEXT,
    "level" TEXT,
    "category" TEXT,
    "coachName" TEXT,
    "mail" TEXT NOT NULL,
    "phone" TEXT,
    "postalCode" TEXT,
    "city" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "announcement" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" TIMESTAMPTZ NOT NULL,
    "level" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "description" TEXT,
    "field" TEXT NOT NULL,
    "announcementStatus" TEXT NOT NULL DEFAULT 'waiting', --TODO waiting / completed / passed
    "userId" INT NOT NULL REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "request" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "requestStatus" TEXT NOT NULL DEFAULT 'waiting', --TODO waiting / accepted / rejected 
    "userId" INT NOT NULL REFERENCES "user"("id"),
    "announcementId" INT NOT NULL REFERENCES "announcement"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "dev_team" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT  UNIQUE,
    "firstname" TEXT  UNIQUE,
    "role" TEXT  UNIQUE,
    "desc" TEXT  UNIQUE,
    "profilePicture" TEXT  UNIQUE,
    "ghUrl" TEXT  UNIQUE,
    "lknUrl" TEXT  UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
COMMIT;
