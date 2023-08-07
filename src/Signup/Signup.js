import { useState } from 'react';
import { Button, Grid, Container, Typography, TextField, Box } from '@mui/material';

import styles from './Signup.module.css';

function Signup() {
    const [step, setStep] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <Container maxWidth='md' className={styles.root}>
            <Grid
                className={styles.contentContainer}
                container
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
            >
                <Button variant='outlined' className={styles.signUpBtn} size='large'>Sign Up</Button>

                <Typography variant='h6' className={styles.qnTxt}>What's your Phone Number?</Typography>

                <TextField
                    className={styles.phoneNumberTextfield}
                    sx={{ m: 1, width: '25ch' }}
                    placeholder='Phone Number'
                    type='number'
                    name='phoneNumber'
                    onChange={event => setPhoneNumber(event.target.value)}
                    value={phoneNumber}
                    InputProps={{
                        startAdornment: <Box className={styles.phoneNumberIcon}>+1</Box>
                    }}
                />

                <Button variant='contained' className={styles.nextBtn} size='large'>Next</Button>
            </Grid>
        </Container>
    );
}

export default Signup;
