export const PaginatorHeader = (props) => {
  return (
    <div class="grid grid-cols-6 gap-6 justify-between w-full">
      <div class="col-span-6 sm:col-span-3">
        <label for="country" class="block">
          Page Size
        </label>
        <select
          class="rounded-md"
          value={props.pageSize()}
          onChange={(e) => {
            props.setPageSize(+e.target.value);
            props.setPage(1);
          }}
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div class="grid col-span-6 sm:col-span-3 items-end place-items-end">
        <div class="flex items-center">
          <button
            class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            onClick={() => {
              if (props.page() <= 1) return;
              props.setPage(1);
            }}
          >
            {"<<"}
          </button>
          <button
            class="mr-2 relative inline-flex items-center border-l-0 border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            onClick={() => {
              if (props.page() <= 1) return;
              props.setPage(props.page() - 1);
            }}
          >
            {"<"}
          </button>
          <label for="page" class="mr-2">
            Page
          </label>
          <input
            type="number"
            class="rounded-md border-none focus:ring-0 focus:outline-none bg-gray-100 w-16"
            value={props.page()}
            onChange={(e) => {
              if (e.target.value > props.pages().length) {
                return props.setPage(props.pages().length);
              } else if (e.target.value < 1) {
                return props.setPage(1);
              }
              props.setPage(e.target.value);
            }}
          />
          <label class="ml-2">of {props.pages().length}</label>
          <button
            class="ml-2 relative inline-flex items-center border-r-0 border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            onClick={() => {
              if (props.page() >= props.pages().length) return;
              props.setPage(+props.page() + 1);
            }}
          >
            {">"}
          </button>
          <button
            class="relative inline-flex items-center  border rounded-r-md border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            onClick={() => {
              if (props.page() >= props.pages().length) return;
              props.setPage(props.pages().length);
            }}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};
