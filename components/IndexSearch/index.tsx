import { FC } from "react";
import { MultipleQueriesQuery } from "@algolia/client-search";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Pagination,
  PoweredBy,
} from "react-instantsearch-dom";

import "./satellite.scss";
import HitComponent from "./HitComponent";
import SearchResult from "./SearchResult";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;

// 検索結果なしのモック情報
const mock = {
  hits: [],
  nbHits: 0,
  nbPages: 0,
  page: 0,
  processingTimeMS: 0,
};

// 空文字の場合は何もない情報をモックして渡す
const searchClient = {
  ...algoliaClient,
  search(requests: MultipleQueriesQuery[]) {
    if (requests.every(({ params }) => !params?.query)) {
      return Promise.resolve(mock);
    }
    return algoliaClient.search(requests);
  },
};

const IndexSearch: FC = () => {
  return (
    <div className="p-[30px] bg-white rounded drop-shadow-md">
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Configure hitsPerPage={5} />
        <SearchBox />
        <SearchResult />
      </InstantSearch>
    </div>
  );
};

export default IndexSearch;
