import { useState, useCallback, useEffect } from 'react';
import { Grid } from '@mui/material';

import { getTimeStr, makeid } from '../Utils/helper';
import Sidebar from './Sidebar';
import MainChat from './MainChat';
import styles from './Chat.module.css';

const DEFAULT_CHAT = [{
    id: makeid(5),
    name: 'Aaron',
    messages: [
        {
            id: makeid(5),
            ownMessage: false,
            msg: 'Hello my name is Aaron, how are you?',
            timestamp: getTimeStr(new Date('2023-08-09 05:41')),
        }
    ],
    timestamp: getTimeStr(new Date('2023-08-09 06:41')),
    avatarUrl: 'https://i.pravatar.cc/50',
    selected: true
}]

export default function Chat() {
    const [chats, setChats] = useState(DEFAULT_CHAT);
    const currentMainChat = chats.find(chat => chat.selected);

    // Adding the new message to the end of the messages array of the current user chat
    const addMessage = useCallback((newMessage) => {
        const index = chats.findIndex(msg => msg.id === (currentMainChat && currentMainChat.id));
        if (index > -1) {
            chats[index].messages = [
                ...currentMainChat.messages,
                newMessage
            ];
            const newChats = [...chats];
            setChats(newChats);
        }
    }, [chats]);

    // On every new chats update we make sure to scroll to the bottom
    useEffect(() => {
        scrollToBottom();
    }, [chats]);

    const scrollToBottom = () => {
        // scroll to the bottom when new messages are added
        document.querySelector("#overallMessages").scrollTop = document.querySelector("#overallMessages").scrollHeight;
    }

    return (
        <Grid container className={styles.root}>
            <Grid item className={styles.sideBarContainer}>
                <Sidebar chats={chats} />
            </Grid>
            <Grid item className={styles.mainChatContainer}>
                <MainChat chat={currentMainChat} handleAddMessage={addMessage} />
            </Grid>
        </Grid>
    );
}