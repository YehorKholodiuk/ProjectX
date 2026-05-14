import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function WaitScreen({ onFinish }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            onFinish();
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[
                    styles.waitText,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                Wait...
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

    waitText: {
        color: '#777',
        fontSize: 24,
        letterSpacing: 2,
        fontWeight: '300',
    },
});
