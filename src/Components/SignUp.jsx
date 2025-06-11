import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack, FormControl, FormLabel, Input, FormHelperText, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from "react-redux";
import { createNewUserAsyncAction, getUserById } from "../Redux/thunk";

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const THEM = createTheme({
        palette: {
            primary: { main: '#1976d2' },
            secondary: { main: '#dc004e' },
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const customerData = {
            id: parseInt(id),
            name: firstName,
            phone: phone,
        };

        try {
            const resultAction = await dispatch(createNewUserAsyncAction(customerData));
            if (createNewUserAsyncAction.fulfilled.match(resultAction)) {
                setMessage('Customer created successfully!');
                await new Promise((resolve) => setTimeout(resolve, 1000));
                await dispatch(getUserById(id));
                navigate(`/CheckCategory/${firstName}`);
            } else {
                setMessage('Failed to create customer: ' + resultAction.error.message);
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <ThemeProvider theme={THEM}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <FormControl required>
                    <Input placeholder="Your ID" value={id} readOnly />
                    <FormHelperText />
                    <FormLabel>Id</FormLabel>

                </FormControl>
                <br />
                <br />
                <FormControl required>
                    <Input placeholder="Your name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <FormHelperText />
                    <FormLabel>Name</FormLabel>

                </FormControl>
                <br />
                <br />
                <FormControl required>
                    <Input placeholder="Your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <FormHelperText />
                    <FormLabel>Phone Number</FormLabel>
                </FormControl>
                <br />
        
                <br />
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<SendIcon />} type="submit">
                        Continue
                    </Button>
                </Stack>
            </form>
            {message && <Typography variant="body2" color="error">{message}</Typography>}
        </ThemeProvider>
    );
};

export default SignUp;
