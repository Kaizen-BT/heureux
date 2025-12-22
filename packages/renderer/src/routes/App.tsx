import Example from "@workspace/ui/ComponentExample";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { api } from "@app/preload";

/**
 * Fetches all the projects, tasks and milestones
 * @param {LoaderFunctionArgs} _
 */
export async function HomeLoader(_: LoaderFunctionArgs) {
  const [projects, milestones, tasks] = await Promise.all([
    api.getAllProjects(),
    api.getAllMilestones(),
    api.getAllTasks(),
  ]);

  console.log(projects, milestones, tasks);

  return { projects, milestones, tasks };
}

export function App() {
  const { projects, milestones, tasks } = useLoaderData<typeof HomeLoader>();
  return (
    <>
      <Example />
      <p>Projects</p>
      {projects.length ? <p>A Project exists</p> : <p>No Projects </p>}

      <p>Milestones</p>
      {milestones.length ? <p>A Milestone exists</p> : <p>No Milestones</p>}

      <p>Tasks</p>
      {tasks.length ? <p>A Task exists</p> : <p>No Tasks</p>}
    </>
  );
}
