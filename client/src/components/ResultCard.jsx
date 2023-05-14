import { createSignal, For, onMount } from "solid-js";
import { Card } from "./Card.jsx";
import { clickOutside } from "../directives/clickOutside.js";
import { useLogs } from "../context/LogContext.jsx";

export const ResultCard = (props) => {
  let ref;
  const { addValueToSearch, searchValues } = useLogs();
  const [results, setResults] = createSignal(undefined);

  onMount(() => {
    const position = ref?.getBoundingClientRect();
    const searchResults = searchValues();
    setResults({
      path: searchResults.path,
      results: Array.from(searchResults.results, ([value, count]) => {
        return {
          value,
          count,
        };
      }),
    });
    if (position.bottom > window.innerHeight) {
      props.setResultAnchor({
        ...props.anchor,
        y: props.anchor.y - (position.bottom - window.innerHeight),
      });
    }
  });

  return (
    <div
      ref={ref}
      class={`fixed`}
      style={{
        top: props.anchor.y + "px",
        left: props.anchor.x + props.anchor.width + 10 + "px",
      }}
      use:clickOutside={() => props.setResultAnchor(undefined)}
    >
      <Card class="w-96 h-96 shadow-xl border-2 bg-white">
        <div class="grid grid-cols-flow gap-2 overflow-auto styled-scrollbars max-h-full">
          <h2 class="col-span-2 font-bold mb-2">{results()?.path}</h2>
          <div class="text-sm font-bold">Value</div>
          <div class="text-sm font-bold">Count</div>
          <For each={results()?.results || []}>
            {(result) => (
              <>
                <div
                  class="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-gray-700 hover:text-blue-700 hover:font-bold cursor-pointer "
                  onClick={() => {
                    addValueToSearch(results()?.path, result.value);
                    props.setResultAnchor(undefined);
                  }}
                >
                  {`${result.value}`}
                </div>
                <div class="text-sm">{result.count}</div>
              </>
            )}
          </For>
        </div>
      </Card>
    </div>
  );
};
