CREATE TABLE "comparison_workspaces" (
  "id" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "items" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "comparison_workspaces_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "comparison_workspaces_userId_key"
  ON "comparison_workspaces"("userId");

ALTER TABLE "comparison_workspaces"
  ADD CONSTRAINT "comparison_workspaces_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
