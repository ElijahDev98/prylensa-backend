ALTER TABLE "price_alerts"
  ALTER COLUMN "productId" DROP NOT NULL,
  ALTER COLUMN "targetPrice" DROP NOT NULL,
  ADD COLUMN "name" TEXT NOT NULL DEFAULT 'Price alert',
  ADD COLUMN "productQuery" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "ruleType" TEXT NOT NULL DEFAULT 'price-drop',
  ADD COLUMN "threshold" DOUBLE PRECISION NOT NULL DEFAULT 0,
  ADD COLUMN "description" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "enabled" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "lastEvaluatedAt" TIMESTAMP(3),
  ADD COLUMN "lastTriggeredAt" TIMESTAMP(3);

CREATE INDEX "price_alerts_userId_enabled_status_idx"
  ON "price_alerts"("userId", "enabled", "status");
CREATE INDEX "price_alerts_productQuery_idx"
  ON "price_alerts"("productQuery");

ALTER TABLE "marketplace_listings"
  ADD COLUMN "productId" UUID;
CREATE INDEX "marketplace_listings_productId_idx"
  ON "marketplace_listings"("productId");
ALTER TABLE "marketplace_listings"
  ADD CONSTRAINT "marketplace_listings_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "products"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "alert_events" (
  "id" UUID NOT NULL,
  "alertId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "fingerprint" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "productQuery" TEXT NOT NULL,
  "eventType" TEXT NOT NULL,
  "metadata" JSONB,
  "readAt" TIMESTAMP(3),
  "triggeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "alert_events_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "alert_events_alertId_fingerprint_key"
  ON "alert_events"("alertId", "fingerprint");
CREATE INDEX "alert_events_userId_readAt_triggeredAt_idx"
  ON "alert_events"("userId", "readAt", "triggeredAt");
ALTER TABLE "alert_events"
  ADD CONSTRAINT "alert_events_alertId_fkey"
  FOREIGN KEY ("alertId") REFERENCES "price_alerts"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "alert_events"
  ADD CONSTRAINT "alert_events_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "user_preferences" (
  "id" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'NGN',
  "notificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "user_preferences_userId_key"
  ON "user_preferences"("userId");
ALTER TABLE "user_preferences"
  ADD CONSTRAINT "user_preferences_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
