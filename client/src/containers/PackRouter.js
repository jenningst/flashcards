import React from 'react';
import { usePackState } from '../contexts/packContext';

import { Query } from 'react-apollo';
import { GET_FLASHCARDS_BY_PACK } from '../queries';

import PackHome from '../components/PackHome';
import Pack from '../components/Pack';

const PackRouter = ({ filter }) => {
  const state = usePackState();
  const { packMode, packName } = state;
  
  return (
    <Query query={GET_FLASHCARDS_BY_PACK} variables={ { id: filter } }>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading Flashcards...</div>;
        if (error) return <div>Error! ${error.message}</div>;

        const cards = data.fetchFlashcardsByPack;
        return (
          <React.Fragment>
            {packMode === ''
              ? <PackHome name={packName} data={cards} />
              : <Pack mode={packMode} filter={filter} data={cards} />
            }
          </React.Fragment>
        )
      }}
    </Query>
  );
};

export default PackRouter;