import React from 'react';
import Navigation from './src/navigation';
import '@react-native-firebase/app'; // Ensure Firebase is initialized

function App(): React.JSX.Element {
  return <Navigation></Navigation>;
}

export default App;
