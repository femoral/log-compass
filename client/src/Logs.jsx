import { useLogs } from "./context/LogContext.jsx";
import { Paginator } from "./components/Paginator.jsx";
import { JsonViewer } from "./components/JsonViewer";

export const Logs = () => {
  const { logs } = useLogs();
  return (
    <div>
      <Paginator each={logs()}>{(log) => <JsonViewer data={log} />}</Paginator>
    </div>
  );
};
