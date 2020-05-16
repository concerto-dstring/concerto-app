## GraphQL Readme

## directives from Amplify Graphql API
Amplify Graphql API provides severl directives helps to simplify the graphql development. 
1. @model: it creates the DynamoDB table with the assoicated type, and it also provides the GRUD functions (8 resolvers (create, update, delete, get, list, onCreate, onUpdate, onDelete)), and related input object
2. @key: it creats one primary index (without the name parameter), and >=1 secondary index (with the name paramter). DynamoDB query operations may use at most two attributes to efficiently query data: the first query argument passed to a query (the hash key) must use strict equality and the second attribute (the sort key) may use gt, ge, lt, le, eq, beginsWith, and between.
    * With the example: @key(fields: ["orderId", "status", "createdAt"]), orderId is the primary hashkey, and the the rest is a composite sort key as statusCreatedAt (key1#key2)
    * Secondary indexes created with the @key directive can be used to resolve connections when creating relationships between types. 
3. @auth: it can apply several authentication/authorization methods
    * API key: for the public API or prototyping (as concerto), it has expiration time at most 365 days
    * IAM
    * congito user pool
4. @function: it allows you to quickly connect lambda resolvers to an AppSync API; You may deploy the AWS Lambda functions via the Amplify CLI, AWS Lambda console, or any other tool. To connect an AWS Lambda resolver, add the @function directive to a field in your schema.graphql
    * Example: Get the logged in user from Amazon Cognito User Pools (https://docs.amplify.aws/cli/graphql-transformer/directives#usage-1)
5. @connection: enables you to specify relationships between @model types. Currently, this supports one-to-one, one-to-many, and many-to-one relationships. You may implement many-to-many relationships using two one-to-many connections and a joining @model type.
    * one-to-one relationship: project-team is 1:1 relationship; giving the teamID, the query can populate the team detail into the team field. 
    ```
    type Project @model {
    id: ID!
    name: String
    teamID: ID!
    team: Team @connection(fields: ["teamID"])
    }

    type Team @model {
    id: ID!
    name: String!
    }
    ```
    * one-to-many relationship: post-comments is a 1:n relationship, a one-to-many connection needs a @key that allows comments to be queried by the postID and the connection uses this key to get all comments whose postID is the id of the post was called on.
    ```
    type Post @model {
    id: ID!
    title: String!
    comments: [Comment] @connection(keyName: "byPost", fields: ["id"])
    }

    type Comment @model
    @key(name: "byPost", fields: ["postID", "content"]) {
    id: ID!
    postID: ID!
    content: String!
    }
    ```
    * many-to-one relationship: it is a belong-to relationship, you can make a connection bi-directional by adding a many-to-one connection to types that already have a one-to-many connection. 
    ```
    type Post @model {
    id: ID!
    title: String!
    comments: [Comment] @connection(keyName: "byPost", fields: ["id"])
    }

    type Comment @model
    @key(name: "byPost", fields: ["postID", "content"]) {
    id: ID!
    postID: ID!
    content: String!
    post: Post @connection(fields: ["postID"])
    }
    ```
    * many-to-many relationship: You can implement many to many using two 1-M @connections, an @key, and a joining @model.
    ```
    type Post @model {
    id: ID!
    title: String!
    editors: [PostEditor] @connection(keyName: "byPost", fields: ["id"])
    }

    # Create a join model and disable queries as you don't need them
    # and can query through Post.editors and User.posts
    type PostEditor
    @model(queries: null)
    @key(name: "byPost", fields: ["postID", "editorID"])
    @key(name: "byEditor", fields: ["editorID", "postID"]) {
    id: ID!
    postID: ID!
    editorID: ID!
    post: Post! @connection(fields: ["postID"])
    editor: User! @connection(fields: ["editorID"])
    }

    type User @model {
    id: ID!
    username: String!
    posts: [PostEditor] @connection(keyName: "byEditor", fields: ["id"])
    }
    ```

## exmaple from Amplify developer documetn
https://docs.amplify.aws/cli/graphql-transformer/dataaccess privodes an in depth example of 17 access patterns from the First Steps for Modeling Relational Data in DynamoDB page.

Most common/import access patterns in our organization
1	Look up employee details by employee ID
2	Query employee details by employee name
3	Find an employee’s phone number(s)
4	Fine a customer’s phone number(s)
5	Get orders for a given customer within a given date range
6	Show all open orders within a given date range across all customers
7	See all employees recently hired
8	Find all employees working in a given warehouse
9	Get all items on order for a given product
10	Get current inventories for a given product at all warehouses
11	Get customers by account representative
12	Get orders by account representative and date
13	Get all items on order for a given product
14	Get all employees with a given job title
15	Get inventory by product and warehouse
16	Get total product inventory
17	Get account representatives ranked by order total and sales period
In this example, you will learn how to support these data access patterns using GraphQL, AWS Amplify, and the GraphQL Transform library. This example has the following types:

Warehouse
Product
Inventory
Employee
AccountRepresentative
Customer
Product

## Reference:
1. https://docs.amplify.aws/cli/graphql-transformer/directives