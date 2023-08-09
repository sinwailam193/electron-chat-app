import { useCallback, useState } from 'react';
import { Box, Avatar, Typography, Grid, TextField, IconButton } from '@mui/material';
import { North as NorthIcon } from '@mui/icons-material';

import { makeid } from '../../Utils/helper';
import { getTimeStr } from '../../Utils/helper';
import styles from './MainChat.module.css';

export default function MainChat({ chat, handleAddMessage }) {
    const [message, setMessage] = useState('');
    const [ownMessage, setOwnMessage] = useState(true);

    // when new messages are added add to the current user's messages
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        handleAddMessage({
            id: makeid(5),
            msg: message,
            ownMessage,
            timestamp: getTimeStr(new Date())
        });
        setMessage('');
        setOwnMessage(!ownMessage);
    }, [message, ownMessage]);

    return (
        <Box className={styles.root}>
            {!!chat && (
                <>
                    <Box item>
                        <Grid container className={styles.headerContainer} alignItems='center'>
                            <Avatar alt={chat.name} src={chat.avatarUrl} sx={{ width: 50, height: 50 }} />
                            <Typography variant='body1' className={styles.headerName}>
                                {chat.name}
                            </Typography>
                        </Grid>
                    </Box>
                    <Grid id='overallMessages' container alignItems='flex-end' className={styles.overallMessages}>
                        <Grid item className={styles.messageOuterContainer}>
                            <Grid container alignItems='flex-end' wrap='nowrap' className={styles.messageContainer}>
                                <Grid item className={styles.messageList}>
                                    {chat.messages.map(message => {
                                        const { id, msg, ownMessage, timestamp } = message;

                                        let className = styles.message;
                                        className += ownMessage ? ` ${styles.ownMessage}` : ` ${styles.otherMessage}`;

                                        return (
                                            <Grid item key={id} className={className}>
                                                <Typography variant='body2'>
                                                    {msg}
                                                </Typography>
                                                <Typography variant='caption' className={styles.msgTimestamp}>
                                                    {`${timestamp}${ownMessage ? ' ✓✓' : ''}`}
                                                </Typography>
                                                <Box className={styles.rightPoint} />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                            <form onSubmit={handleSubmit} className={styles.messageSubmit}>
                                <Grid container alignItems='center'>
                                    <TextField
                                        placeholder='Message'
                                        value={message}
                                        onChange={event => setMessage(event.target.value)}
                                        className={styles.msgTextfield}
                                        InputProps={{
                                            className: styles.inputBase
                                        }}
                                    />
                                    <IconButton type='submit' variant='contained' className={styles.sendMsgBtn} size='small'>
                                        <NorthIcon />
                                    </IconButton>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
}
