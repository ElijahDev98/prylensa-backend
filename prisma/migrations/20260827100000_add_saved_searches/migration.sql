CREATE TABLE "saved_searches" (
  "id" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "query" TEXT NOT NULL,
  "normalizedQuery" TEXT NOT NULL,
  "lastRefreshedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "saved_searches_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "saved_searches_userId_normalizedQuery_key"
  ON "saved_searches"("userId", "normalizedQuery");

CREATE INDEX "saved_searches_userId_updatedAt_idx"
  ON "saved_searches"("userId", "updatedAt");

ALTER TABLE "saved_searches"
  ADD CONSTRAINT "saved_searches_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
