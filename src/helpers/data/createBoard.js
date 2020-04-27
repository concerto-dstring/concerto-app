import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { createBoard } from "../../graphql/mutations"

/* a sample codes to use the client */
class createBoard extends React.Component {
  handleSubmit = (e, createPost) => {
    e.preventDefault();
    createBoard({
      variables: {
        input: {
          name: this.name.value,
          body: this.body.value,
          createdAt: new Date().toISOString()
        }
      }
    }).then(res => {
      this.title.value = "";
      this.body.value = "";
    });
  };
  render() {
    return (
      <div>
        <h1>Create a Board</h1>

        <Mutation mutation={gql(createBoard)}>
          {(createBoard, { data, loading, error }) => {
            return (
              <div>
                <form
                  className="add-post"
                  onSubmit={e => this.handleSubmit(e, createBoard)}
                >
                  <input
                    type="text" placeholder="Name"
                    ref={node => (this.name = node)}
                    required
                  />
                  <button>{loading ? "Yes boss..." : "Create Post"}
                  </button>
                </form>
                {error && <p>{error.message}</p>}
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default createBoard;