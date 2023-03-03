export const Main = (props) => {
  return (
    <div class="ml-80 mr-4 flex flex-col h-full min-h-screen">
      <div class="grow-0 h-24 p-4" />
      <div class="grow flex flex-col">{props.children}</div>
      <div class="grow-0 h-24 p-4" />
    </div>
  );
};
