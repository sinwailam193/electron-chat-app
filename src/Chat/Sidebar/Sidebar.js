import { Box, Grid, IconButton, Avatar, Typography } from '@mui/material';

import { Create as CreateIcon } from '@mui/icons-material';
import styles from './Sidebar.module.css';

export default function Sidebar({ chats }) {
    function renderUserChat(chat) {
        let className = styles.inividivualChatContainer;
        if (chat.selected) {
            className += ` ${styles.selectedChat}`
        }
        const lastMessage = chat.messages.length ? chat.messages[chat.messages.length - 1] : '';

        return (
            <Grid container key={chat.id} className={className}>
                <Avatar alt={chat.name} src={chat.avatarUrl} sx={{ width: 50, height: 50 }} />
                <Grid item className={styles.textContentContainer}>
                    <Grid container justifyContent='space-between'>
                        <Typography variant='body1'>
                            {chat.name}
                        </Typography>
                        <Typography variant='body1'>
                            {chat.timestamp}
                        </Typography>
                    </Grid>
                    <Typography variant='body2' className={styles.lastMessageContent}>
                        {lastMessage.msg}
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    return (
        <Box className={styles.root}>
            {chats.map(chat => renderUserChat(chat))}
            <IconButton variant='contained' className={styles.createIconBtn} size='large'>
                <CreateIcon />
            </IconButton>
        </Box>
    );
}
