-- CreateTable
CREATE TABLE "marketplace_searches" (
    "id" UUID NOT NULL,
    "query" TEXT NOT NULL,
    "normalizedQuery" TEXT NOT NULL,
    "resultCount" INTEGER NOT NULL DEFAULT 0,
    "offerCount" INTEGER NOT NULL DEFAULT 0,
    "marketplaceCount" INTEGER NOT NULL DEFAULT 0,
    "aiGeneratedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "marketplace_searches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketplace_listings" (
    "id" UUID NOT NULL,
    "marketplace" TEXT NOT NULL,
    "externalOfferId" TEXT NOT NULL,
    "externalProductId" TEXT,
    "canonicalKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "normalizedTitle" TEXT NOT NULL,
    "brand" TEXT,
    "category" TEXT,
    "modelNumber" TEXT,
    "gtin" TEXT,
    "productUrl" TEXT,
    "imageUrl" TEXT,
    "enrichmentSource" TEXT,
    "specifications" JSONB,
    "enrichedAt" TIMESTAMP(3),
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "marketplace_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_snapshots" (
    "id" UUID NOT NULL,
    "listingId" UUID NOT NULL,
    "stateHash" TEXT NOT NULL,
    "price" DECIMAL(14,2) NOT NULL,
    "originalPrice" DECIMAL(14,2),
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "rating" DOUBLE PRECISION,
    "reviewCount" INTEGER,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "firstObservedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastObservedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observationCount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "offer_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "search_observations" (
    "id" UUID NOT NULL,
    "searchId" UUID NOT NULL,
    "snapshotId" UUID NOT NULL,
    "comparisonKey" TEXT NOT NULL,
    "groupPosition" INTEGER NOT NULL,
    "relevanceScore" DOUBLE PRECISION,
    "confidenceScore" DOUBLE PRECISION,
    "evaluationScore" DOUBLE PRECISION,
    "isBestOffer" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_observations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "marketplace_searches_normalizedQuery_createdAt_idx" ON "marketplace_searches"("normalizedQuery", "createdAt");
CREATE INDEX "marketplace_searches_createdAt_idx" ON "marketplace_searches"("createdAt");
CREATE UNIQUE INDEX "marketplace_listings_marketplace_externalOfferId_key" ON "marketplace_listings"("marketplace", "externalOfferId");
CREATE INDEX "marketplace_listings_canonicalKey_idx" ON "marketplace_listings"("canonicalKey");
CREATE INDEX "marketplace_listings_normalizedTitle_idx" ON "marketplace_listings"("normalizedTitle");
CREATE INDEX "marketplace_listings_gtin_idx" ON "marketplace_listings"("gtin");
CREATE UNIQUE INDEX "offer_snapshots_listingId_stateHash_key" ON "offer_snapshots"("listingId", "stateHash");
CREATE INDEX "offer_snapshots_listingId_firstObservedAt_idx" ON "offer_snapshots"("listingId", "firstObservedAt");
CREATE INDEX "offer_snapshots_currency_price_idx" ON "offer_snapshots"("currency", "price");
CREATE UNIQUE INDEX "search_observations_searchId_snapshotId_key" ON "search_observations"("searchId", "snapshotId");
CREATE INDEX "search_observations_comparisonKey_createdAt_idx" ON "search_observations"("comparisonKey", "createdAt");
CREATE INDEX "search_observations_snapshotId_idx" ON "search_observations"("snapshotId");

-- AddForeignKey
ALTER TABLE "offer_snapshots" ADD CONSTRAINT "offer_snapshots_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "marketplace_listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "search_observations" ADD CONSTRAINT "search_observations_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "marketplace_searches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "search_observations" ADD CONSTRAINT "search_observations_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "offer_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
