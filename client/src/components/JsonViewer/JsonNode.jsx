import { createSignal, For, mergeProps, createMemo } from "solid-js";
import ExpandMoreIcon from "~icons/mdi/expand-more";
import ContentCopy from "~icons/mdi/content-copy";

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
          <div class="group mr-2 flex">
            <span
              class="mr-2 h-4 w-4 text-blue-500 hover:font-bold cursor-pointer"
              onClick={toggleExpanded}
            >
              {
                <ExpandMoreIcon
                  class="transition-transform ease-out"
                  classList={{
                    "-rotate-180": expanded(),
                  }}
                />
              }
            </span>
            {merged.depth > 0 && (
              <span class="font-medium text-gray-700 mr-1">{merged.key}:</span>
            )}
            {isExpandable() && <span>{expandableOpeningCharacter()}</span>}
            {expanded() && renderCopyJsonComponent(merged)}
          </div>
        )}
        {expanded() && isExpandable() && renderExpandable(merged)}
        {!expanded() && !isExpandable() && renderPrimitive(merged)}
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
    <div class="group flex flex-row container whitespace-nowrap w-full">
      <label class="mr-2" onClick={() => console.log(props)}>
        {props.key}:{" "}
      </label>
      <p class="overflow-hidden text-ellipsis">
        {isString() ? `"${props.value}"` : `${props.value}`}
      </p>
      {renderCopyJsonComponent(props)}
    </div>
  );
};

const renderExpandable = (props) => {
  const isArray = createMemo(() => Array.isArray(props.value));
  return (
    <div class="flex flex-col border-l ml-2">
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

const CopyJson = (props) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(props.fieldValue, null, 2)
    );
  };

  return <ContentCopy onClick={copyToClipboard} />;
};

const renderCopyJsonComponent = (props) => {
  return (
    <span class="hidden ml-3 cursor-pointer group-hover:block">
      <CopyJson fieldValue={props.value} />
    </span>
  );
};
