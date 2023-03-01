import { Textarea } from "../components/Textarea.jsx";
import { useLogs } from "../context/LogContext.jsx";

export const Search = () => {
  let searchInputRef;
  const { setSearch } = useLogs();

  return (
    <div class="flex justify-between">
      <Textarea
        ref={searchInputRef}
        type="text"
        placeholder="Search"
        class="w-full mr-2 rounded-lg"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold h-11 py-2 px-4 rounded-lg"
        onClick={() => {
          setSearch(searchInputRef.value);
        }}
      >
        Search
      </button>
    </div>
  );
};
