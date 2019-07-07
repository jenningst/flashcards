import React from 'react';
import { usePackState } from '../contexts/packContext';
import { Query } from 'react-apollo';
import { GET_PACK_BY_ID, GET_FLASHCARDS_BY_PACK } from '../queries';

import PackHome from '../components/PackHome';
import Pack from '../components/PackCarousel';

const PackContainer = ({ match }) => {
  const state = usePackState();
  const { packMode } = state;

  return (
    <Query query={GET_PACK_BY_ID} variables={ { id: match.params.id }} >
      {({ loading: packLoading, error: packError, data: packData }) => {
        const pack = packData.fetchPackById;
        return (
          <Query query={GET_FLASHCARDS_BY_PACK} variables={ { id: match.params.id }} >
            {({ loading: cardLoading, error: cardError, data: cardData }) => {
              if (packLoading || cardLoading) return <div>Loading Flashcards...</div>;
              if (packError || cardError) return <div>Errors!</div>;
              const cards = cardData.fetchFlashcardsByPack;

              return (
                <>
                  {packMode === ''
                    ? <PackHome name={pack.name} cards={cards} />
                    : <Pack mode={packMode} filter={pack._id} cards={cards} />
                  }
                </>
              );
            }}
          </Query>
        )}}
    </Query>
  );
};

export default PackContainer;
