## Cognito Readme

## Cognito integrate with DynamoDB
Cognito user pool provides the user sign-in/sing-out/sign-up functionalities, but it lacks the user additional information storage. Together with DynamoDB, we can store the additional user information.

1. setup a new role for the new lambda function:
   the new rolw will have below access permissions:
    1. DynamoDBFullAccess
    2. AmazonCognitoDeveloperAuthenticatedIdentities
    3. AmazonCognitoPowerUser
    4. AWSLambdaBasicExecutionRole (Note : it is billed, we can remove after the function works well. To view logs, add the AWSLambdaBasicExecutionRole managed policy to its execution role)
2. create a new lambda function under the new role:
   the function will read the cognito sign-up user information and insert related record into the user table
3. In the user pool, attach the new lambda function as the "post confirmation" trigger; then after a new user is signed up, below json will send to the lambda function to be processed and inserted into the database user table:
        "
                2020-05-16T21:28:45.902Z	877251e6-5c71-47a7-8254-3eee68ceb91f	INFO	{
                version: '1',
                region: 'ap-northeast-2',
                userPoolId: 'ap-northeast-2_vm4Zs5Xqh',
                userName: 'testuser5',
                callerContext: {
                    awsSdkVersion: 'aws-sdk-unknown-unknown',
                    clientId: '1ql6mhh753bah36k439rqjtr0d'
                },
                triggerSource: 'PostConfirmation_ConfirmSignUp',
                request: {
                    userAttributes: {
                    sub: '5641bb4b-271a-4b04-824c-943aaf8cc699',
                    'cognito:user_status': 'CONFIRMED',
                    email_verified: 'true',
                    phone_number_verified: 'false',
                    phone_number: '+112312312234',
                    email: 'emailsf@gmail.com'
                    }
                },
                response: {}
                }
        "

## concerto lambda function implementation
1. Access concerto IAM Management console and select Roles from the left menu. Click Create role and select the AWS Service Lambda role.
   create role "concerto-cognito-lambda-dynamoDB"
   with below permission:
        1. DynamoDBFullAccess
        2. AmazonCognitoDeveloperAuthenticatedIdentities
        3. AmazonCognitoPowerUser
2. create lambda function "cognito-lambda-dynamoDB-func" and assocaited with above role:
    ```
    var aws = require('aws-sdk');
var ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event, context) => {
    console.log(event);

    let date = new Date();

    const tableName = process.env.TABLE_NAME;
    const region = process.env.REGION;
    const defaultAvi = 'https://YOUR/DEFAULT/IMAGE';
    
    console.log("table=" + tableName + " -- region=" + region);
    aws.config.update({region: region});

    // If the required parameters are present, proceed
    if (event.request.userAttributes.sub) {

        // -- Write data to DDB
        let ddbParams = {
            Item: {
                'id': {S: event.request.userAttributes.sub},
                '__typename': {S: 'User'},
                'avatar': {S: defaultAvi},
                'username': {S: event.userName},

                'usertype': {S: '1'},
                'email': {S: event.request.userAttributes.email},
                'phone': {S: event.request.userAttributes.phone_number},
                'createdAt': {S: date.toISOString()},
            },
            TableName: tableName
        };

        // Call DynamoDB
        try {
            await ddb.putItem(ddbParams).promise()
            console.log("Success");
        } catch (err) {
            console.log("Error", err);
        }

        console.log("Success: Everything executed correctly");
        context.done(null, event);
        
        const response = {
            statusCode: 200,
            body: JSON.stringify('add user record successfully'),
        };
        return response;

    } else {
        // Nothing to do, the user's email ID is unknown
        console.log("Error: Nothing was written to DDB or SQS");
        context.done(null, event);
        const response = {
            statusCode: 401,
            body: JSON.stringify('falied to add user record'),
        };
        return response;
    }
};
    ```
environment variables:
    REGION	ap-northeast-2
    TABLE_NAME	User-vmbp47mpfnbyfdqtvnux4ie7re-rd

3. In the user pool for "concertoapp2fea5048_userpool_2fea5048-rd" (rd or product later), attach the above lambda function as the "post confirmation" trigger

## references
1. https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-post-confirmation.html
2. https://medium.com/hackernoon/how-to-add-new-cognito-users-to-dynamodb-using-lambda-e3f55541297c
3. https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-table-read-write.html 
4. https://github.com/vbudilov/cognito-to-dynamodb-lambda
