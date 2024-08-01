/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { useQuery, useMutation, OperationVariables } from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface UseGqlQueryProps<TData = any, TVariables = any> {
  query?: any; // GraphQL query document
  mutation?: any; // GraphQL mutation document
  variables?: TVariables; // Variables for query or mutation
}

export const useGqlQuery = <TData, TVariables extends OperationVariables>({
  query,
  mutation,
  variables
}: UseGqlQueryProps<TData, TVariables>) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);

  // Query execution
  const {
    data: queryData,
    refetch,
    loading: queryLoading
  } = useQuery<TData, TVariables>(query!, {
    variables: variables as TVariables, // Cast variables to TVariables
    skip: !query,
    onError: (error) => {
      console.error("GraphQL query error:", error);
      setLoading(false);
    }
  });

  // Mutation execution
  let mutate: (arg0: { variables: TVariables }) => any;
  if (mutation) {
    [mutate] = useMutation<TData, TVariables>(mutation!);
  }

  // Function to execute mutation
  const handleMutate = async (mutationVariables?: TVariables) => {
    try {
      setLoading(true);
      const mutationResult = await mutate({ variables: mutationVariables as TVariables }); // Cast variables to TVariables if provided
      setData(mutationResult.data as TData); // Set mutation result data
    } catch (error) {
      console.error("GraphQL mutation error:", error);
      setLoading(false);
    }
  };

  // Save function to handle both refetch and mutate
  const save = mutation ? handleMutate : refetch;

  // useEffect to update data when queryData changes
  useEffect(() => {
    if (queryData) {
      setData(queryData as TData); // Ensure data is set correctly
      setLoading(false);
    }
  }, [queryData]);

  return {
    data,
    loading: loading || queryLoading,
    save,
    refetch
  };
};
