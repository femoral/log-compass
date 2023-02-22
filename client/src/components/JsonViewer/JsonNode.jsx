import { createSignal, For, mergeProps, createMemo } from "solid-js";
export const JsonNode = (props) => {
  const merged = mergeProps({ path: "$", depth: 0, key: "" }, props);
  const [expanded, setExpanded] = createSignal(false);
  const isExpandable = createMemo(
    () => Array.isArray(merged.value) || typeof merged.value === "object"
  );
  const expandableOpeningCharacter = createMemo(() =>
    Array.isArray(merged.value) ? "[" : "{"
  );
  const expandableClosingCharacter = createMemo(() =>
    Array.isArray(merged.value) ? "]" : "}"
  );
  const toggleExpanded = () => {
    setExpanded(!expanded());
  };

  return (
    <div
      style={{
        "padding-left": `${merged.depth && 1}rem`,
      }}
    >
      <div
        class="flex"
        classList={{
          "flex-col": expanded(),
          "flex-row": !expanded(),
        }}
      >
        {isExpandable() && (
          <div class="mr-2 cursor-pointer" onClick={toggleExpanded}>
            <span class="mr-2">{expanded() ? "-" : "+"}</span>
            {props.depth > 0 && (
              <span class="text-sm font-medium text-gray-700 font-mono">
                {props.key}:{" "}
              </span>
            )}
            {isExpandable() && <span>{expandableOpeningCharacter()}</span>}
          </div>
        )}
        {expanded() &&
          isExpandable() &&
          renderExpandable({
            value: merged.value,
            path: merged.path,
            depth: merged.depth,
          })}
        {!expanded() &&
          !isExpandable() &&
          renderPrimitive({ key: merged.key, value: merged.value })}
        {isExpandable() && !expanded() && <span class="mr-2">...</span>}
        {isExpandable() && (
          <span class="mr-2">{expandableClosingCharacter()}</span>
        )}
      </div>
    </div>
  );
};

const renderPrimitive = (props) => {
  const isString = createMemo(() => typeof props.value === "string");
  return (
    <div class="flex flex-row container whitespace-nowrap w-full">
      <label class="mr-2 font-mono">{props.key}: </label>
      <p class="font-mono overflow-hidden text-ellipsis">
        {isString() ? `"${props.value}"` : `${props.value}`}
      </p>
    </div>
  );
};

const renderExpandable = (props) => {
  const isArray = createMemo(() => Array.isArray(props.value));
  return (
    <div class="flex flex-col border-l">
      <For each={isArray() ? props.value : Object.keys(props.value)}>
        {(key, index) => (
          <JsonNode
            value={isArray() ? props.value[index()] : props.value[key]}
            path={
              isArray() ? `${props.path}[${index()}]` : `${props.path}.${key}`
            }
            depth={props.depth + 1}
            key={isArray() ? index() : key}
          />
        )}
      </For>
    </div>
  );
};
