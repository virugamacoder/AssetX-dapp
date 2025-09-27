import { useQuery } from "@tanstack/react-query";

const useCustomQuery = (props) => {
    const {
        queryKey,
        queryFn,
        enabled = true,
        selectEnabled = false,
        retry = false,
        refetchOnWindowFocus = false,
        staleTime = 0,
        cacheTime,
        refetchOnMount,
        initialData
    } = props

    const { isLoading, error, data, refetch } = useQuery({
        queryKey,
        queryFn,
        enabled,
        retry,
        select: selectEnabled ? (data) => data?.data?.data : (data) => data?.data,
        refetchOnWindowFocus,
        staleTime,
        cacheTime,
        refetchOnMount,
        initialData
    });

    return {
        isLoading,
        error,
        data,
        refetch,
    };
};


export {
    useCustomQuery
}