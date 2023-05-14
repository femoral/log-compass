import { LogPathList } from "./LogPathList.jsx";

export const SideMenu = () => {
  return (
    <aside class="fixed top-0 left-0 mt-4 ml-4 bg-white h-screen w-72 rounded-lg shadow p-4 flex flex-col">
      <div class="w-full text-center my-4">
        <h3 class="text-2xl font-mono text-gray-700">{"{ log-compass }"}</h3>
      </div>
      <div class="m-2 border-t-2 border border-gray-300" />
      <div class="flex flex-col gap-4 py-4 shrink h-full min-h-0">
        <LogPathList />
      </div>
    </aside>
  );
};
