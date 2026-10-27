function normalizeProductIdentity(title: string): string {
  const normalized = title.toLowerCase().replace(/pre[ -]?owned/g, "preowned");
  const tecnoModel = normalized.match(
    /\b(?:tecno\s+)?(pop|spark)\s+((?:go\s+)?\d+[a-z]?)\b/,
  );
  const tecnoFamily = normalized.match(/\btecno\s+(pop|spark)\b/);
  const macbookSize = normalized.includes("macbook")
    ? normalized.match(/\b(1[3-6](?:\.\d+)?)\s*(?:-?\s*inch|")\b/) ??
      normalized.match(/\bmacbook\s+(?:air|pro)\s+(1[3-6])\b/)
    : undefined;
  const macbookEdition = normalized.match(/\bmacbook\s+(air|pro)\b/)?.[1];
  const macbookChip = normalized.match(
    /\b(m[1-4])(?:\s+(pro|max|ultra))?\b/,
  );

  if (tecnoModel?.[1] && tecnoModel[2]) {
    return `tecno-${tecnoModel[1]}-${tecnoModel[2].replace(/\s+/g, "-")}`;
  }
  if (tecnoFamily?.[1]) {
    return `tecno-${tecnoFamily[1]}`;
  }
  if (macbookSize?.[1]) {
    const chip = macbookChip?.[1]
      ? [macbookChip[1], macbookChip[2]].filter(Boolean).join("-")
      : "chip-unspecified";
    return [
      "macbook",
      macbookEdition ?? "edition-unspecified",
      chip,
      `${Math.trunc(Number(macbookSize[1]))}-inch`,
    ].join("-");
  }
  return "identity-unspecified";
}

function normalizeRam(title: string): string | undefined {
  const values = new Set<number>();
  const explicitPatterns = [
    /\b(?:ram|(?:unified\s+)?memory)\s*[:-]?\s*(\d+)\s*(gb|tb)\b/g,
    /\b(\d+)\s*(gb|tb)\s*(?:ram|(?:unified\s+)?memory)\b/g,
  ];

  for (const pattern of explicitPatterns) {
    for (const match of title.matchAll(pattern)) {
      const capacity = Number(match[1]) * (match[2] === "tb" ? 1024 : 1);
      if (capacity <= 64) values.add(capacity);
    }
  }

  for (const match of title.matchAll(
    /\b(\d+)\s*(gb|tb)?\s*[/+]\s*(\d+)\s*(gb|tb)\b/g,
  )) {
    const left = Number(match[1]) * (match[2] === "tb" ? 1024 : 1);
    const right = Number(match[3]) * (match[4] === "tb" ? 1024 : 1);
    const ram = Math.min(left, right);
    if (ram <= 64) values.add(ram);
  }

  const barePatterns = [
    /\b(?:ram|(?:unified\s+)?memory)\s*[:-]?\s*(\d{1,2})\b/g,
    /\b(\d{1,2})\s*(?:ram|(?:unified\s+)?memory)\b/g,
  ];
  for (const pattern of barePatterns) {
    for (const match of title.matchAll(pattern)) {
      values.add(Number(match[1]));
    }
  }

  return values.size > 0
    ? [...values].sort((left, right) => left - right).join("+")
    : undefined;
}

export function createProductVariantKey(title: string): string {
  const normalized = title.toLowerCase().replace(/pre[ -]?owned/g, "preowned");
  const capacities = [...normalized.matchAll(/\b(\d+)\s*(gb|tb)\b/g)]
    .map((match) => Number(match[1]) * (match[2] === "tb" ? 1024 : 1))
    .filter((capacity) => capacity >= 32);
  const storage = capacities.length > 0 ? Math.max(...capacities) : 0;
  const condition = /\b(preowned|refurbished|renewed|used)\b/.test(normalized)
    ? "preowned"
    : "new";
  const batteryMatch = normalized.match(
    /\b(\d{1,3}(?:[,.\s]\d{3})+|\d{4,6})\s*m\s*ah\b/,
  );
  const batteryCapacity = batteryMatch
    ? Number(batteryMatch[1]?.replace(/[^\d]/g, ""))
    : 0;
  const accessoryModel = /\bpower\s*bank\b|\bpowerbank\b/.test(normalized)
    ? normalized.match(/\b([a-z]\d{3,5})\b/)?.[1]
    : undefined;
  const ram = normalizeRam(normalized);

  return [
    storage || "storage-unspecified",
    ram ? `${ram}gb-ram` : "ram-unspecified",
    batteryCapacity || "battery-unspecified",
    accessoryModel || "model-unspecified",
    normalizeProductIdentity(normalized),
    condition,
  ].join("-");
}
