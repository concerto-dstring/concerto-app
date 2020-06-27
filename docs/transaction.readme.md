## Transaction management and GraphQL Readme

## Transaction
 If we want a service with transaction behavior, we'll implement it as a single mutation. The back-end implementation has to deal with how to ensure transactional behavior.

### Multiple fields in mutations 
  A mutation can contain multiple fields, just like a query. There's one important distinction between queries and mutations, other than the name:

  While query fields are executed in parallel, mutation fields run in series, one after the other.

  This means that if we send two incrementCredits mutations in one request, the first is guaranteed to finish before the second begins, ensuring that we don't end up with a race condition with ourselves.

  However currently apollo will continue the 2nd mutation even if the 1st mutation failed. 

## subscriber with GraphQL

## references
1. https://graphqlme.com/2018/05/13/transactions-mutations-and-graphql/
2. https://stackoverflow.com/questions/41238205/graphql-mutation-operation-in-single-transaction
3. https://hasura.io/docs/1.0/graphql/manual/mutations/multiple-mutations.html
4. https://ui.dev/building-serverless-react-graphql-apps-with-aws-appsync/  (create receipts example)