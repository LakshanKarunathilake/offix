import gql from 'graphql-tag';

export const ADD_TASK = gql`
  mutation createTask($description: String!, $title: String!) {
    createTask(description: $description, title: $title) {
      id
      title
      description
      version
    }
  }
`;

export const GET_TASKS = gql`
  query allTasks($first: Int) {
    allTasks(first: $first) {
      id
      title
      description
      version
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($description: String, $id: ID!, $title: String, $version: Int!) {
    updateTask(description: $description, id: $id, title: $title, version: $version) {
      description
      id
      title
      version
    }
  }
`;

export const UPDATE_TASK_CLIENT_RESOLUTION = gql`
  mutation updateTaskClientResolution($description: String, $id: ID!, $title: String, $version: Int!) {
    updateTaskClientResolution(description: $description, id: $id, title: $title, version: $version) {
      description
      id
      title
      version
    }
  }
`;

export const UPDATE_TASK_CUSTOM_CLIENT_RESOLUTION = gql`
  mutation updateTaskCustomClientResolution($description: String, $id: ID!, $title: String, $version: Int!) {
    updateTaskCustomClientResolution(description: $description, id: $id, title: $title, version: $version) {
      description
      id
      title
      version
    }
  }
`;

export const UPDATE_TASK_SERVER_RESOLUTION = gql`
  mutation updateTaskServerResolution($description: String, $id: ID!, $title: String, $version: Int!) {
    updateTaskServerResolution(description: $description, id: $id, title: $title, version: $version) {
      description
      id
      title
      version
    }
  }
`;

export const UPDATE_TASK_CONFLICT_REJECT = gql`
  mutation updateTaskConflictReject($description: String, $id: ID!, $title: String, $version: Int!) {
    updateTaskConflictReject(description: $description, id: $id, title: $title, version: $version) {
      description
      id
      title
      version
    }
  }
`;

export const UPDATE_TASK_CUSTOM_STRATEGY = gql`
  mutation updateTaskCustomStrategy($description: String, $id: ID!, $title: String, $version: Int!) {
    updateTaskCustomStrategy(description: $description, id: $id, title: $title, version: $version) {
      description
      id
      title
      version
    }
  }
`;

export const ONLINE_ONLY = gql`
  mutation onlineOnly($id: ID!) {
    onlineOnly(id: $id) @onlineOnly {
      id
    }
  }
`;

export const TASK_CREATED = gql`
  subscription taskCreated {
    taskCreated {
      id
      title
      description
      version
    }
  }
`;
