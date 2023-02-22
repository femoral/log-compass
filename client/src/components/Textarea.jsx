import { splitProps } from "solid-js";

export const Textarea = (_props) => {
  const [extractedProps, props] = splitProps(_props, ["autoresize", "ref"]);

  return (
    <textarea
      {...props}
      ref={extractedProps.ref}
      class={`textarea ${props.class} h-11`}
      onInput={(e) => {
        if (!extractedProps.autoresize) return;
        const textarea = e.target;
        if (textarea.scrollHeight > 55) {
          textarea.style.height = "auto";
          textarea.style.height = textarea.scrollHeight + "px";
        }
      }}
    />
  );
};
