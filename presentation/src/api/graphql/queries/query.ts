import { gql } from "@apollo/client";

export const GET_MONTHLY_DEBTS_BY_USER = gql`
query MonethlyDebtByUser($month: Int!){
  monthlyDebtByUser(month: $month){
    value
    userName
  }
}
`;