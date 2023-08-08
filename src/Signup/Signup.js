import { useState, useCallback } from 'react';
import { Button, Grid, Container, Typography, TextField, Box } from '@mui/material';

import styles from './Signup.module.css';

function Signup({
    firstName,
    lastName,
    handleFirstName,
    handleLastName,
    handleShowChat
}) {
    const [step, setStep] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [nextDisabled, setNextDisabled] = useState(false);

    const handleNext = useCallback(() => {
        const nextStep = step + 1;
        if (nextStep > 2) {
            handleShowChat();
        } else {
            if (nextStep === 1) {
                setNextDisabled(true);
            }
            setStep(nextStep);
        }
    }, [step]);

    const renderContent = () => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Typography variant='h6'>What's your Phone Number?</Typography>

                        <TextField
                            className={styles.firstTextField}
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
                    </>
                );
            case 1:
                return (
                    <>
                        <Typography variant='h6'>{`+1 ${phoneNumber}`}</Typography>
                        <Typography variant='body1' className={styles.phoneSubText}>We have sent you an SMS with the code</Typography>

                        <TextField
                            className={styles.firstTextField}
                            sx={{ m: 1, width: '25ch' }}
                            placeholder='Code'
                            type='number'
                            name='code'
                            onChange={event => {
                                const value = event.target.value;
                                setCode(event.target.value);
                                if (!!value) {
                                    setNextDisabled(false);
                                }
                            }}
                            value={code}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <Typography variant='h6'>What's your Full Name?</Typography>

                        <TextField
                            className={styles.firstTextField}
                            sx={{ m: 1, width: '25ch' }}
                            placeholder='Name'
                            type='text'
                            name='firstName'
                            onChange={event => handleFirstName(event.target.value)}
                            value={firstName}
                        />
                        <TextField
                            className={styles.secondTextField}
                            sx={{ m: 1, width: '25ch' }}
                            placeholder='Last Name'
                            type='text'
                            name='lastName'
                            onChange={event => handleLastName(event.target.value)}
                            value={lastName}
                        />
                    </>
                );
            default:
                break;
        }
    }

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

                {renderContent()}

                <Button
                    variant='contained'
                    className={styles.nextBtn}
                    size='large'
                    onClick={handleNext}
                    disabled={nextDisabled}
                >
                    Next
                </Button>
            </Grid>
        </Container>
    );
}

export default Signup;
