// Utility Types

interface Ok<T> {
  data: T;
  ok: true;
}

interface Error {
  ok: false;
}

export function OK<T>(data: T): Ok<T> {
  return { ok: true, data };
}

export function err(): Error {
  return { ok: false };
}
