import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

/** Custom hook for managing and fetching chat messages using the useInfiniteQuery hook.
 *
 * useInfiniteQuery:
 * (facilitates the management and retrieval of paginated data
 *  by providing functionality for fetching multiple pages of query results)
 *
 * Returns { data, fetchNextPage, hasNextPage, isFetchingNextPage, status }
 */
export const useChatQuery = ({ queryKey, apiUrl, paramKey, paramValue }: ChatQueryProps) => {
  const { isConnected } = useSocket();

  async function fetchMessages({ pageParam = undefined }) {
    const url = qs.stringifyUrl({
      url: apiUrl,
      query: {
        cursor: pageParam,
        [paramKey]: paramValue
      }
    }, { skipNull: true });

    const res = await fetch(url);
    return res.json();
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000,
    initialPageParam: undefined
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  };
};
