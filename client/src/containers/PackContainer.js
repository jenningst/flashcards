import React from 'react';
import { ApolloConsumer} from 'react-apollo';
import { usePackState } from '../contexts/packContext';

import { Query } from 'react-apollo';
import { GET_FLASHCARDS_BY_PACK } from '../queries';

import PackHome from '../components/PackHome';
import Pack from '../components/PackCarousel';
import { GET_PACKS } from '../queries/index';

const PackContainer = ({ match }) => {
  const state = usePackState();
  const { packMode } = state;
  
  const packId = match.params.id;

  return (
    <ApolloConsumer>
      {apolloClient => (
        <Query query={GET_FLASHCARDS_BY_PACK} variables={ { id: packId } }>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading Flashcards...</div>;
            if (error) return <div>Error! ${error.message}</div>;

            const cards = data.fetchFlashcardsByPack;
            let packs;
            
            try {
              packs = apolloClient.readQuery({
                query: GET_PACKS,
                variables: { id: packId },
              });
            } catch (error) {
              const id = cards[0].pack_id;
              packs.apolloClient.readQuery({
                query: GET_FLASHCARDS_BY_PACK,
                variables: { id: id} 
              });
              // throw new Error(error.message);
            }
            
            // TODO: breaks when page refreshed here
            const pack = packs.fetchPacks.filter(p => p._id === packId).shift();

            return (
              <>
                {packMode === ''
                  ? <PackHome name={pack.name} cards={cards} />
                  : <Pack mode={packMode} filter={pack._id} cards={cards} />
                }
              </>
            )
          }}
        </Query>

      )}
    </ApolloConsumer>
  );
};

export default PackContainer;