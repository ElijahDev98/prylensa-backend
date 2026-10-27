CREATE TABLE "personalized_recommendations" (
  "id" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "productKey" TEXT NOT NULL,
  "query" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "priority" TEXT NOT NULL,
  "metadata" JSONB,
  "feedback" TEXT,
  "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "personalized_recommendations_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "personalized_recommendations_userId_productKey_key"
  ON "personalized_recommendations"("userId", "productKey");
CREATE INDEX "personalized_recommendations_userId_updatedAt_idx"
  ON "personalized_recommendations"("userId", "updatedAt");
ALTER TABLE "personalized_recommendations"
  ADD CONSTRAINT "personalized_recommendations_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
