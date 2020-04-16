import React from 'react';

const App = () => {
  const [response, setResponse] = React.useState('');

  React.useEffect(() => {
    fetch('/api').then((res) =>
      res.json().then((data) => {
        setResponse(data.test);
      })
    );
  }, []);
  return <div>{response}</div>;
};

export default App;
