import React from 'react';
import PropTypes from 'prop-types';
import { usePackState } from '../contexts/pack-context';

import { Query } from 'react-apollo';
import { GET_PACK_BY_ID, GET_FLASHCARDS_BY_PACK } from '../queries';

import PackHome from '../components/PackHome';
import PackCarousel from '../components/PackCarousel';
import Loading from '../components/FullPageSpinner';

const PackContainer = ({ match }) => {
  const state = usePackState();
  const { mode } = state;

  return (
    <Query query={GET_PACK_BY_ID} variables={ { id: match.params.id }} >
      {({ loading: packLoading, error: packError, data: packData }) => {
        const pack = packData.fetchPackById;
        return (
          <Query query={GET_FLASHCARDS_BY_PACK} variables={ { id: match.params.id }} >
            {({ loading: cardLoading, error: cardError, data: cardData }) => {
              if (packLoading || cardLoading) {
                return <Loading loading={packLoading || cardLoading}/>;
              }
              if (packError || cardError) return <div>Errors!</div>;
              const cards = cardData.fetchFlashcardsByPack;

              return (
                <>
                  {mode === ''
                    ? <PackHome name={pack.name} cards={cards} />
                    : <PackCarousel mode={mode} filter={pack._id} cards={cards} />
                  }
                </>
              );
            }}
          </Query>
        )}}
    </Query>
  );
};

PackContainer.propTypes = {
  match: PropTypes.object.isRequired,
};

export default PackContainer;
