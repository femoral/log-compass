import { createSignal, createMemo, For } from "solid-js";
import { PaginatorHeader } from "./PaginatorHeader.jsx";

export const Paginator = (props) => {
  const [page, setPage] = createSignal(1);
  const [pageSize, setPageSize] = createSignal(25);

  const totalPages = createMemo(() =>
    Math.ceil(props.each.length / pageSize())
  );

  const range = createMemo(() => {
    const start = (page() - 1) * pageSize();
    const end = start + pageSize();
    return { start, end };
  });

  const pages = createMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  });

  return (
    <div class="flex flex-col items-center w-full">
      <div class="w-full">
        <div class="grid gap-6">
          <PaginatorHeader
            {...{ page, setPage, pageSize, setPageSize, pages }}
          />
          <div class="flex flex-col container gap-1 text-ellipsis overflow-hidden">
            <For each={props.each.slice(range().start, range().end)}>
              {(item) => props.children(item)}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};
