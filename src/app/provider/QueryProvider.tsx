import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";

const client = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: Infinity,
            staleTime: Infinity
        }
    }
});

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}

export default QueryProvider;