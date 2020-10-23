import React, { useState } from 'react';
import Pouet from "../component/pouet";

function Home(): React.ReactElement{
  const [count, setCount] = useState<number>(0);

  return (
    <div>
       <Pouet counter={count} label="salut" />
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Home;