import { FC } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Pagination,
  PoweredBy,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;

const IndexSearch: FC = () => {
  return (
    <>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Configure hitsPerPage={5} />
        <SearchBox />
        <Hits />
        <Pagination />
        <PoweredBy />
      </InstantSearch>
    </>
  );
};

export default IndexSearch;
