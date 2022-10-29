import React from 'react'
import PersonalSearchItem from './PersonalSearchItem';

function PersonalSearchList({results}) {
  return (
    <div>
      
        <h1 className="text-3xl italic text-white text-center mt-8">
           {results.length!==0 ? `Results found based on your search (${results.length})` : 'No Results Found' }
        </h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8  my-10 md:my-10 lg:my-10">
        {results.length!==0 && results.map((item) => {
          return <PersonalSearchItem key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default PersonalSearchList