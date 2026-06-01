import { StatusBar } from 'expo-status-bar';

import React, {
    useEffect,
    useState,
} from 'react';

import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage
    from '@react-native-async-storage/async-storage';

import QuestionsScreen
    from './components/QuestionsScreen';

import WaitScreen
    from './components/WaitScreen';

import ResultsScreen
    from './components/ResultsScreen';

import FinalScreen
    from './components/FinalScreen';

import FirstLaunchScreen
    from './components/FirstLaunchScreen';
import { playDoorSound }
    from './utils/playDoorSound';

export default function App() {

    const [stage, setStage] =
        useState(null);

    //useEffect(() => {

        //checkIntroStatus(); - вернуть однократную загрузку вступительной надписи перед релизом

   // }, []);


    useEffect(() => {

        setStage('firstLaunch');

    }, []);

    const checkIntroStatus = async () => {

        try {

            const value =
                await AsyncStorage.getItem(
                    'hasSeenIntro'
                );

            if (value === 'true') {

                setStage('intro');

            } else {

                setStage('firstLaunch');

            }

        } catch (error) {

            console.log(
                'Error reading intro state:',
                error
            );

            setStage('intro');

        }
    };

    const handleFirstLaunchComplete = () => {

        setStage('intro');

    };

    const handleBegin = () => {

        setStage('transition');

        setTimeout(() => {

            setStage('questions');

        }, 2200);

    };

    const handleQuestionsComplete = () => {

        setStage('wait');

    };

    const handleWaitComplete = () => {

        setStage('results');

    };

    const handleResultsComplete = () => {

        setStage('final');

    };

    let content;

    // LOADING

    if (stage === null) {

        content = (

            <View style={styles.blackScreen}>
                <StatusBar style="light" />
            </View>

        );

    }

    // FIRST LAUNCH

    if (stage === 'firstLaunch') {

        content = (

            <FirstLaunchScreen
                onContinue={
                    handleFirstLaunchComplete
                }
            />

        );

    }

    // INTRO

    if (stage === 'intro') {

        content = (

            <IntroScreen
                onBegin={handleBegin}
            />

        );

    }

    // TRANSITION

    if (stage === 'transition') {

        content = (

            <View style={styles.blackScreen}>
                <StatusBar style="light" />
            </View>

        );

    }

    // QUESTIONS

    if (stage === 'questions') {

        content = (

            <QuestionsScreen
                onComplete={
                    handleQuestionsComplete
                }
            />

        );

    }

    // WAIT

    if (stage === 'wait') {

        content = (

            <WaitScreen
                onFinish={
                    handleWaitComplete
                }
            />

        );

    }

    // RESULTS

    if (stage === 'results') {

        content = (

            <ResultsScreen
                onFinish={
                    handleResultsComplete
                }
            />

        );

    }

    // FINAL

    if (stage === 'final') {

        content = (

            <FinalScreen
                onFinish={() => {

                    setStage('end');

                }}
            />

        );

    }

    // END

    if (stage === 'end') {

        content = (

            <View
                style={styles.blackScreen}
            />

        );

    }

    return (

        <View style={styles.appRoot}>

            {content}

        </View>

    );
}

function IntroScreen({
                         onBegin,
                     }) {

    const titleFade =
        React.useRef(
            new Animated.Value(0)
        ).current;

    const buttonFade =
        React.useRef(
            new Animated.Value(0)
        ).current;

    React.useEffect(() => {

        Animated.timing(
            titleFade,
            {
                toValue: 1,
                //duration: 4000,
                duration: 2400,
                useNativeDriver: true,
            }
        ).start();

        setTimeout(() => {

            Animated.timing(
                buttonFade,
                {
                    toValue: 1,
                    duration: 3000,

                    useNativeDriver: true,
                }
            ).start();

        }, 1800);

    }, []);

    return (

        <View style={styles.container}>

            <Animated.Text
                style={[
                    styles.title,
                    {
                        opacity: titleFade,
                    },
                ]}
            >
                You might choose who you are today
            </Animated.Text>

            <Animated.View
                style={{
                    opacity: buttonFade,
                    marginTop: 60,
                }}
            >

                <TouchableOpacity
                    activeOpacity={0.7}
                    //onPress={onBegin}

                    onPress={async () => {

                        await playDoorSound();

                        setTimeout(() => {

                            onBegin();

                        }, 400);

                    }}

                >

                    <Text style={styles.beginText}>
                       push to begin...
                    </Text>

                </TouchableOpacity>

            </Animated.View>

            <StatusBar style="light" />

        </View>

    );
}

const styles = StyleSheet.create({

    appRoot: {
        flex: 1,
        backgroundColor: '#000',
    },

    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    blackScreen: {
        flex: 1,
        backgroundColor: '#000',
    },

    title: {
        color: '#fff',
        fontSize: 28,
        textAlign: 'center',
        letterSpacing: 2,
        opacity: 0.9,
    },

    beginText: {
        color: '#aaa',
        fontSize: 16,
        letterSpacing: 3,
        opacity: 0.8,
    },

});
