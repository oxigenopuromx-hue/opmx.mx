import { describe, expect, it } from "vitest";
import { isBasicAuthAuthorized } from "../staging-auth";

function basicHeader(user: string, password: string) {
  return `Basic ${btoa(`${user}:${password}`)}`;
}

describe("isBasicAuthAuthorized", () => {
  it("accepts the correct user/password pair", () => {
    expect(isBasicAuthAuthorized(basicHeader("staff", "s3cret"), "staff", "s3cret")).toBe(
      true,
    );
  });

  it("rejects a wrong password", () => {
    expect(isBasicAuthAuthorized(basicHeader("staff", "wrong"), "staff", "s3cret")).toBe(
      false,
    );
  });

  it("rejects a wrong username", () => {
    expect(isBasicAuthAuthorized(basicHeader("nope", "s3cret"), "staff", "s3cret")).toBe(
      false,
    );
  });

  it("rejects a missing header", () => {
    expect(isBasicAuthAuthorized(null, "staff", "s3cret")).toBe(false);
  });

  it("rejects a non-Basic scheme", () => {
    expect(isBasicAuthAuthorized("Bearer abc123", "staff", "s3cret")).toBe(false);
  });

  it("rejects malformed base64", () => {
    expect(isBasicAuthAuthorized("Basic not-valid-base64!!", "staff", "s3cret")).toBe(
      false,
    );
  });

  it("allows a colon inside the password", () => {
    expect(isBasicAuthAuthorized(basicHeader("staff", "pa:ss"), "staff", "pa:ss")).toBe(
      true,
    );
  });
});
