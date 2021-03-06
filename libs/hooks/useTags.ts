import useSWR from "swr";
import fetch from "../polyfill/fetch";
import { WPTag } from "../wpapi/interfaces";
import { WPAPIURLFactory } from "../wpapi/UrlBuilder";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
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
