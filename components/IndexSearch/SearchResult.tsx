import {
  Hits,
  connectSearchBox,
  Pagination,
  PoweredBy,
} from "react-instantsearch-dom";
import HitComponent from "./HitComponent";

const SearchResult = connectSearchBox(({ currentRefinement }) => {
  if (!currentRefinement) return null;

  return (
    <>
      <div className="my-[15px] text-gray-700">検索結果</div>
      <Hits hitComponent={HitComponent} />
      <div className="flex justify-center my-[30px]">
        <Pagination />
      </div>
      <div className="flex justify-end">
        <PoweredBy />
      </div>
    </>
  );
});

export default SearchResult;
