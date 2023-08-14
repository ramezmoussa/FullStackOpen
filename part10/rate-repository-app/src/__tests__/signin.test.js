import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../components/SignInContainer';
// ...

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        // render the SignInContainer component, fill the text inputs and press the submit button

        const onSubmit = jest.fn();
        render(<SignInContainer onSubmit={onSubmit} />);
        fireEvent.changeText(screen.getByTestId('username'), 'kalle');
        fireEvent.changeText(screen.getByTestId('password'), 'password');
        fireEvent.press(screen.getByTestId('signInButton'));

        await waitFor(() => {
            expect(onSubmit.mock.calls).toHaveLength(1);
            expect(onSubmit.mock.lastCall[0]).toEqual({
                username: 'kalle',
                password: 'password',
            });

            });
        });
    });
});