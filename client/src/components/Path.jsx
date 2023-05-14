import { useLogs } from "../context/LogContext.jsx";

export const Path = (props) => {
  let ref;
  const { setPathValueSearch } = useLogs();

  return (
    <>
      <button
        ref={ref}
        class="text-sm text-gray-700 hover:text-blue-700 hover:font-bold w-full text-left overflow-x-hidden text-ellipsis"
        style={{}}
        onClick={() => {
          setPathValueSearch(props.path);
          props.setResultAnchor({
            x: ref.getBoundingClientRect().x,
            y: ref.getBoundingClientRect().y,
            width: ref.getBoundingClientRect().width,
            height: ref.getBoundingClientRect().height,
          });
        }}
      >
        {props.path}
      </button>
    </>
  );
};
