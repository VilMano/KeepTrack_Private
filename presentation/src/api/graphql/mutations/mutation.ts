import { gql } from "@apollo/client";

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

export const CREATE_MOVEMENT = gql`
  mutation CreateMovement($movement: MovementDTOInput!){
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

