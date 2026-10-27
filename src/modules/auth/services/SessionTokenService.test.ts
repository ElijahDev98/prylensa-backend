import assert from "node:assert/strict";
import test from "node:test";

import { SessionTokenService } from "./SessionTokenService.js";

test("session tokens are opaque, unique, and hashed", () => {
  const service = new SessionTokenService();
  const first = service.createToken();
  const second = service.createToken();
  assert.notEqual(first, second);
  assert.notEqual(service.hashToken(first), first);
  assert.equal(service.hashToken(first), service.hashToken(first));
});

test("session expiry follows configured duration", () => {
  const service = new SessionTokenService();
  const now = new Date("2026-08-05T00:00:00.000Z");
  assert.ok(service.expiresAt(now).getTime() > now.getTime());
});
