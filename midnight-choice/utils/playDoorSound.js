import { Audio } from 'expo-av';

export const playDoorSound = async () => {

    try {

        const { sound } =
            await Audio.Sound.createAsync(
                require('../assets/sounds/mixkit-heavy-sliding-door-1523.wav')
            );

        await sound.playAsync();

    } catch (error) {

        console.log(
            'Error playing sound:',
            error
        );

    }
};
