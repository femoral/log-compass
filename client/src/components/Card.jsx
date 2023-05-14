export const Card = (props) => {
  return (
    <div class={`bg-white shadow container rounded-xl p-4 ${props.class}`}>
      {props.children}
    </div>
  );
};
