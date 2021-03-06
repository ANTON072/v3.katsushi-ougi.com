import { PER_PAGE_NUM } from "../../config";
import type { WPPostType } from "./interfaces";

export interface WPAPIURLBuilder {
  path(path: string): this;
  postType(postType: WPPostType): this;
  startAt(startAt: number): this;
  nextPage(): this;
  withEmbed(): this;
  perPage(perPage: number): this;
  search(search: string): this;
  slug(slug: string): this;
  tags(tagIds: number[]): this;
  query(query: string): this;
  after(query: string): this;
  before(query: string): this;
  getURL(): string;
}

export class WPAPIURLFactory {
  public static init(endpoint: string, namespace = "wp/v2"): WPAPIURLBuilder {
    const api = {
      path: "",
      queryString: {
        embed: false,
        search: "",
        perPage: PER_PAGE_NUM,
        startAt: 1,
        custom: "",
        slug: "",
        tags: "",
        after: "",
        before: "",
        nextjs: true,
      },
    };

    return {
      path(path: string) {
        api.path = path;
        return this;
      },

      postType(postType: WPPostType) {
        api.path = postType;
        return this;
      },

      startAt(startAt: number) {
        api.queryString.startAt = startAt;
        return this;
      },

      nextPage() {
        api.queryString.startAt = api.queryString.startAt + 1;
        return this;
      },

      withEmbed() {
        api.queryString.embed = true;
        return this;
      },

      perPage(perPage: number) {
        api.queryString.perPage = perPage;
        return this;
      },

      search(search: string) {
        api.queryString.search = search;
        return this;
      },

      slug(slug: string) {
        api.queryString.slug = slug;
        return this;
      },

      tags(tagIds: number[]) {
        api.queryString.tags = tagIds.join(",");
        return this;
      },

      query(query: string) {
        api.queryString.custom = query;
        return this;
      },

      after(str: string) {
        api.queryString.after = str;
        return this;
      },

      before(str: string) {
        api.queryString.before = str;
        return this;
      },

      getURL(): string {
        const url = [endpoint, namespace, api.path].join("/");
        const queryStringList = Object.entries(api.queryString);

        const queryString = queryStringList
          .reduce((prevQueries, [key, value]) => {
            if (key === "embed" && value === true) prevQueries.push("_embed");
            if (key === "search" && !!value)
              prevQueries.push(`search=${value}`);
            if (key === "slug" && !!value) prevQueries.push(`slug=${value}`);
            if (key === "tags" && !!value) prevQueries.push(`tags=${value}`);
            if (key === "after" && !!value) prevQueries.push(`after=${value}`);
            if (key === "before" && !!value)
              prevQueries.push(`before=${value}`);
            if (key === "perPage") prevQueries.push(`per_page=${value}`);
            if (key === "startAt") prevQueries.push(`page=${value}`);
            if (key === "custom" && !!value) prevQueries.push(value);
            if (key === "nextjs") prevQueries.push(`nextjs=true`);

            return prevQueries;
          }, [] as (string | number | boolean)[])
          .join("&");

        return [url, queryString].join("?");
      },
    };
  }
}
