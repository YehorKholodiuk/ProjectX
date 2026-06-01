import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function WaitScreen({ onFinish }) {
    //const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeAnim =
        useRef(
            new Animated.Value(1)
        ).current;

    useEffect(() => {

        const timer = setTimeout(() => {

            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 2200,
                    useNativeDriver: true,
                }
            ).start(() => {

                onFinish();

            });

        }, 1800);

        return () =>
            clearTimeout(timer);

    }, []);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                },
            ]}
        >

            <Text style={styles.waitText}>
                wait...
            </Text>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },

    waitText: {
        color: '#777',
        fontSize: 24,
        letterSpacing: 2,
        fontWeight: '300',
        fontFamily: 'serif'
    },
});

