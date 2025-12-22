import type {
  getAllMilestones,
  getAllTasks,
  getAllProjects,
} from "@app/database";
import type { ContractFunction } from "@app/utils";

export interface APIContract {
  // Project interface
  getAllProjects: ContractFunction<typeof getAllProjects>;

  // Milestone interface
  getAllMilestones: ContractFunction<typeof getAllMilestones>;

  // Task interface
  getAllTasks: ContractFunction<typeof getAllTasks>;
}
