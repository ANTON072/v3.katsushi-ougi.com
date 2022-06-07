import useSWR from "swr";
import fetch from "../../libs/polyfil/fetch";
import { WPTag } from "../../libs/wpapi/interfaces";
import { WPAPIURLFactory } from "../../libs/wpapi/UrlBuilder";

const urlBuilder = WPAPIURLFactory.init("/api/proxy/")
  .postType("tags")
  .startAt(1)
  .perPage(100);

const useTags = () => {
  const { data, error } = useSWR<WPTag[]>(urlBuilder.getURL(), fetch);

  return {
    tags: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useTags;
