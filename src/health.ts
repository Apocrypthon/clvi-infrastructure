export type Status = "idle" | "checking" | "up" | "down";

export interface Probe {
  status: Status;
  detail: string;
}

const TIMEOUT_MS = 6000;

/**
 * Probe a health endpoint. Only endpoints that send CORS headers can be read
 * from the browser; anything else fails here and the tile stays a plain link,
 * which is the documented fallback, not a bug.
 */
export async function probe(url: string): Promise<Probe> {
  const started = performance.now();
  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const ms = Math.round(performance.now() - started);
    if (!res.ok) {
      return { status: "down", detail: `HTTP ${res.status} · ${ms}ms` };
    }
    return { status: "up", detail: `${await describe(res)} · ${ms}ms` };
  } catch (err) {
    return { status: "down", detail: reason(err) };
  }
}

async function describe(res: Response): Promise<string> {
  try {
    const body: unknown = await res.json();
    if (body && typeof body === "object") {
      const record = body as Record<string, unknown>;
      for (const key of ["status", "state", "ok", "message"]) {
        const value = record[key];
        if (typeof value === "string") return value;
        if (typeof value === "boolean") return value ? "ok" : "not ok";
      }
    }
  } catch {
    /* not JSON — the 2xx is the whole answer */
  }
  return "ok";
}

function reason(err: unknown): string {
  if (err instanceof DOMException && err.name === "TimeoutError") {
    return `no answer in ${TIMEOUT_MS / 1000}s`;
  }
  // A cross-origin block and a dead host are indistinguishable from here.
  return "unreachable (down or no CORS)";
}
