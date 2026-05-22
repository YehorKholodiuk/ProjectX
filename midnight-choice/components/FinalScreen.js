import React, {
    useEffect,
    useRef,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Animated,
} from 'react-native';

import useEmotionStore
    from '../store/useEmotionStore';

export default function FinalScreen({
                                        onFinish,
                                    }) {

    const fadeAnim =
        useRef(
            new Animated.Value(0)
        ).current;

    const resetProfile =
        useEmotionStore(
            (state) =>
                state.resetProfile
        );

    useEffect(() => {

        Animated.sequence([

            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 2200,
                    useNativeDriver: true,
                }
            ),

            Animated.delay(1200),

            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: true,
                }
            ),

        ]).start(() => {

            setTimeout(() => {

                resetProfile();

                onFinish();

            }, 100);

        });

    }, []);
    return (

        <View style={styles.container}>

            <Animated.Text
                style={[
                    styles.text,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                See you later...
            </Animated.Text>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: '#fff',
        fontSize: 28,
        lineHeight: 42,
        textAlign: 'center',
        fontWeight: '300',
        marginBottom: 90,
        letterSpacing: 0.5,
    },

});
