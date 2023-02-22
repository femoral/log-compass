import { createContext, createMemo, createSignal, useContext } from "solid-js";
import _ from "lodash";
import axios from "axios";

const LogContext = createContext();

export const LogProvider = (props) => {
  const logIdSet = new Set();
  const [logs, setLogs] = createSignal([]);
  const [search, setSearch] = createSignal("");

  const filteredLogs = createMemo(() => {
    if (!search()) return logs();

    return _.filter(logs(), JSON.parse(search()));
  });

  const getLogs = async () => {
    const res = await axios.get("/api/logs");

    res.data.forEach((log) => {
      logIdSet.add(log._id);
    });

    setLogs(res.data.map((log) => log.data));
  };

  getLogs();

  const eventSource = new EventSource("/api/logs/stream");
  eventSource.onmessage = (event) => {
    const payload = JSON.parse(event.data);
    if (payload.type === "ping") return;

    if (logIdSet.has(payload.message._id)) return;

    setLogs((prev) => [...prev, payload.message.data]);
  };

  return (
    <LogContext.Provider
      value={{
        logs: filteredLogs,
        setSearch,
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export const useLogs = () => {
  return useContext(LogContext);
};
