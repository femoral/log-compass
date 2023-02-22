import { JsonNode } from "./JsonNode.jsx";

export const JsonViewer = (props) => {
  return (
    <div class="w-full">
      <JsonNode value={props.data} />
    </div>
  );
};
