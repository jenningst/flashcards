import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { usePackState } from '../contexts/pack-context';

import { Query } from 'react-apollo';
import { GET_PACK_BY_ID, GET_FLASHCARDS_BY_PACK } from '../queries';

import PackHome from '../components/PackHome';
import PackCarousel from '../components/PackCarousel';
import FullPageSpinner from '../components/FullPageSpinner';
import { useSession } from '../contexts/user-context';

const PackContainer = ({ match }) => {
  const state = usePackState();
  const user = useSession();
  const { mode } = state;

  return (
    <Query
      query={GET_PACK_BY_ID}
      variables={ { owner: user.uid, pack_id: match.params.id } }
    >
      {({ loading: packLoading, error: packError, data: packData }) => {
        const pack = packData.fetchPackByPackId;
        return (
          <Query
            query={GET_FLASHCARDS_BY_PACK}
            variables={ { owner: user.uid, pack_id: match.params.id } }
          >
            {({ loading: cardLoading, error: cardError, data: cardData }) => {
              if (packLoading || cardLoading) {
                return <FullPageSpinner loading={packLoading || cardLoading}/>;
              }
              if (packError || cardError) return <div>Errors!</div>;

              const cards = cardData.fetchFlashcardsByPackId;
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

export default withRouter(PackContainer);
