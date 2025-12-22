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

// Helper to strip db from args
type OmitDB<T extends (...args: any) => any> = Omit<
  Parameters<T>[0],
  "database"
>;

// Helper to determine if the function requires params
export type ContractFunction<T extends (...args: any) => any> =
  keyof OmitDB<T> extends never
    ? () => ReturnType<T>
    : (args: OmitDB<T>) => ReturnType<T>;
