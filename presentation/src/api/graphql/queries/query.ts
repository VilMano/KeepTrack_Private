import { gql } from "@apollo/client";

export const GET_MONTHLY_DEBTS_BY_USER = gql`
query GetMonthlyDebtByUser($month: Int!){
    monthlyDebtByUser(month: $month){
      value
      userName
    }
}
`;

export const GET_MONTHLY_MOVEMENTS_BY_USER = gql`
  query GetMonthlyMovementsByUser($month: Int!){
    monthlyMovementsByUser(month: $month){
      id
      name
      debt
      movements{
        id
        description
        value
        userShare
        createdOn
        category{
          id
          name
        }
        user{
          name
        }
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($id: Int!){
    user(id: $id){
     id
     name
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers{
    users{
     id
     name
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!){
   createUser(user: $user){
     id
   }
 }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UserInput!){
    updateUser(user: $user){
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!){
    deleteUser(id: $id)
  }
`;

export const GET_MOVEMENT_BY_ID = gql`
  query GetMovement($id: Int!){
    movement(id: $id){
      id
      description
      value
      category{
        id
        name
      }
    }
  }
`;

export const CREATE_MOVEMENT = gql`
  mutation CreateMovement($movement: MovementInput!){
    createMovement(movement: $movement){
      id
    }
  }
`;

export const UPDATE_MOVEMENT = gql`
mutation UpdateMovement($movement: MovementInput!){
    updateMovement(movement: $movement){
      id
    }
  }
`;

export const DELETE_MOVEMENT = gql`
 mutation DeleteMovement($id: Int!){
    deleteMovement(id: $id)    
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories{
    categories{
      id
      name
    }
  }
`;