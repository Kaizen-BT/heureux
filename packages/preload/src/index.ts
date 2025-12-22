import { sha256sum } from "./nodeCrypto.js";
import { versions } from "./versions.js";
import { rendererInvokeAPI } from "./ipcRendererWrapper.js";
import type { APIContract } from "@app/api";

const api: APIContract = {
  getAllProjects: () => rendererInvokeAPI("getAllProjects"),
  getAllMilestones: () => rendererInvokeAPI("getAllMilestones"),
  getAllTasks: () => rendererInvokeAPI("getAllTasks"),
};

export { sha256sum, versions, api };
