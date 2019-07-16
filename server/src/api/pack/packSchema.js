const { gql } = require('apollo-server-express');

// TODO: implement delete or modify

const pack = gql`
  type Pack {
    _id: ID!
    name: String!
    owner: String!
  }

  input CreatePackInput {
    name: String!
    owner: String!
  }

  interface PackPayload {
    pack: Pack
    details: DetailsPayload
  }

  type CreatePackPayload implements PackPayload {
    pack: Pack
    details: DetailsPayload
  }
`;

module.exports = pack;