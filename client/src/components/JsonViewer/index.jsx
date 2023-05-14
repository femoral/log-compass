import { JsonNode } from "./JsonNode.jsx";

export const JsonViewer = (props) => {
  return (
    <div class="w-full font-mono text-sm py-2">
      <JsonNode value={props.data} />
    </div>
  );
};
