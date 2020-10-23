import React from 'react';

interface pouetInterface {
    label: string;
    counter: number;
}

function Pouet({label, counter}: pouetInterface): React.ReactElement{
  return (
    <div>
      {`${label} a été cliqué ${counter} fois`}
    </div>
  );
}

export default Pouet;