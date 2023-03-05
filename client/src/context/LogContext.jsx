import { createContext, createMemo, createSignal, useContext } from "solid-js";
import _ from "lodash";
import axios from "axios";
import {
  convertValueSearchToLodashFilter,
  getPrimitivePaths,
  getUsingPath,
} from "../../../common/src/json-utils";

const LogContext = createContext();

export const LogProvider = (props) => {
  const logIdSet = new Set();
  const pathSet = new Set();
  const [logs, setLogs] = createSignal([]);
  const [search, setSearch] = createSignal("");
  const [pathSearch, setPathSearch] = createSignal("");
  const [paths, setPaths] = createSignal([]);
  const [pathValueSearch, setPathValueSearch] = createSignal("");

  const filteredLogs = createMemo(() => {
    if (!search()) return logs();

    return _.filter(logs(), JSON.parse(search()));
  });

  const filteredPaths = createMemo(() => {
    if (!pathSearch()) return paths();

    return paths().filter((path) =>
      path.toLowerCase().includes(pathSearch().toLowerCase().trim())
    );
  });

  const searchValues = () => {
    if (!pathValueSearch()) return;

    const pathToSearch = pathValueSearch().replaceAll("[]", "").split(".");

    return {
      path: pathValueSearch(),
      results: getUsingPath(logs(), pathToSearch),
    };
  };

  const addValueToSearch = (path, value) => {
    if (!path) return;

    const existingFilter = JSON.parse(search() || "{}");

    const filter = convertValueSearchToLodashFilter(path, value);

    setSearch(JSON.stringify(_.merge(existingFilter, filter)));
  };

  const getLogs = async () => {
    const res = await axios.get("/api/logs");

    res.data.map((log) => {
      logIdSet.add(log._id);
      getPrimitivePaths(log.data, pathSet, "");
    });

    setLogs(res.data.map((log) => log.data));
    setPaths(Array.from(pathSet.values()));
  };

  getLogs();

  const eventSource = new EventSource("/api/logs/stream");
  eventSource.onmessage = (event) => {
    const payload = JSON.parse(event.data);
    if (payload.type === "ping") return;

    if (logIdSet.has(payload.message._id)) return;

    setLogs((prev) => [...prev, payload.message.data]);
    setPaths(() => [...getPrimitivePaths(payload.message.data, pathSet)]);
  };

  return (
    <LogContext.Provider
      value={{
        logs: filteredLogs,
        paths: filteredPaths,
        setSearch,
        setPathSearch,
        setPathValueSearch,
        searchValues,
        search,
        addValueToSearch,
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export const useLogs = () => {
  return useContext(LogContext);
};
