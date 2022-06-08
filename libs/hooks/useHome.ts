import useSWR from "swr";
import { WPPost } from "../wpapi/interfaces";
import { WPAPIURLFactory } from "../wpapi/UrlBuilder";
import fetch from "../polyfill/fetch";

const urlBuilder = WPAPIURLFactory.init(process.env.WORDPRESS_URL)
  .postType("posts")
  .startAt(1);

const useHome = (initialProps: WPPost[], perPage: number = 50) => {
  const { data, error } = useSWR<WPPost[]>(
    urlBuilder.perPage(perPage).getURL(),
    fetch,
    {
      fallbackData: initialProps,
    }
  );

  return {
    posts: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useHome;
