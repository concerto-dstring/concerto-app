// import gql from 'graphql-tag'
// import { graphql, compose } from 'react-apollo'
// import { graphqlMutation } from 'aws-appsync-react'
// import { getData } from '../../graphql/queries'
// import { createData, updateData } from '../../graphql/mutations'

// export default createCellData(id, rowId, columnId, value)(
//     graphql(getData, {
//         variables: {
//             input: {
//                 id: id
//             }
//         },
//         options: {
//             fetchPolicy: 'cache-and-network'
//         },
//         props: props => ({
//             value: props.data.getData.items
//         })        
//     }),
//     graphqlMutation(createData, getData, 'cell', 'id', 'add'),
//     graphqlMutation(updateData, getData, 'cell', 'id', 'update')
// )

 
