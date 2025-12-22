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
  return (
    <>
      <Example />
      <p>Projects</p>
    </>
  );
}
