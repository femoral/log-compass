import { useLogs } from "../context/LogContext.jsx";
import { createSignal, For, Show } from "solid-js";
import { Path } from "../components/Path.jsx";
import { ResultCard } from "../components/ResultCard.jsx";

export const LogPathList = () => {
  const { paths, setPathSearch } = useLogs();
  const [resultAnchor, setResultAnchor] = createSignal();

  return (
    <>
      <input
        type="text"
        onInput={(e) => {
          setPathSearch(e.target.value);
        }}
      />
      <div class="overflow-y-scroll styled-scrollbars px-3">
        <ul>
          <For
            each={paths().sort((a, b) =>
              a.toLowerCase().localeCompare(b.toLowerCase())
            )}
          >
            {(path) => (
              <li>
                <Path path={path} setResultAnchor={setResultAnchor} />
              </li>
            )}
          </For>
        </ul>
      </div>

      <Show when={resultAnchor()} keyed>
        <ResultCard setResultAnchor={setResultAnchor} anchor={resultAnchor()} />
      </Show>
    </>
  );
};
