import { useState } from 'react';

import Signup from './Signup';
import Chat from './Chat';

function App() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showChat, setShowChat] = useState(false);
  
    return showChat? (
        <Chat />
    ) : (
        <Signup
            firstName={firstName}
            lastName={lastName}
            handleFirstName={value => setFirstName(value)}
            handleLastName={value => setLastName(value)}
            handleShowChat={() => setShowChat(true)}
        />
    );
}

export default App;
