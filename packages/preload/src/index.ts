import { sha256sum } from "./nodeCrypto.js";
import { versions } from "./versions.js";
import { rendererInvokeAPI } from "./ipcRendererWrapper.js";
import { APIContract } from "@app/api/src/contract.js";

const api = {
  getAllProjects: () => rendererInvokeAPI("getAllProjects"),
  getAllMilestones: () => rendererInvokeAPI("getAllMilestones"),
  getAllTasks: () => rendererInvokeAPI("getAllTasks"),
} satisfies APIContract;

export { sha256sum, versions, api };
