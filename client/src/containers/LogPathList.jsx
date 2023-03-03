import { useLogs } from "../context/LogContext.jsx";
import { For } from "solid-js";

export const LogPathList = () => {
  const { paths } = useLogs();

  return (
    <ul>
      <For each={Array.from(paths().values())}>
        {(path) => {
          return <li>{path}</li>;
        }}
      </For>
    </ul>
  );
};
