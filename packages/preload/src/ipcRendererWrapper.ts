import type { APIContract } from "@app/api";
import { ipcRenderer } from "electron";

/**
 * Wrapper around ipcRenderer.invoke
 * @param channel The IPC channel (main)
 * @param args The db omitted query function params
 * @returns {ReturnType<APIContract[K]>}
 */
export function rendererInvokeAPI<K extends keyof APIContract>(
  channel: K,
  ...args: Parameters<APIContract[K]>
): ReturnType<APIContract[K]> {
  return ipcRenderer.invoke(channel, ...args) as ReturnType<APIContract[K]>;
}
