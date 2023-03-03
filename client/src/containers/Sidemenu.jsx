import { LogPathList } from "./LogPathList.jsx";

export const SideMenu = () => {
  return (
    <aside class="fixed top-0 left-0 mt-4 ml-4 bg-white h-screen w-72 rounded-lg shadow p-4 flex flex-col divide-y ">
      <div class="w-full text-center my-4">
        <h3 class="text-2xl font-mono text-gray-700">{"{ logbuddy }"}</h3>
      </div>
      <div class="flex flex-col overflow-y-scroll styled-scrollbars">
        <LogPathList />
      </div>
    </aside>
  );
};
