import { create } from 'zustand';

const useEmotionStore = create((set) => ({
    emotionalProfile: {
        movement: 0,
        solitude: 0,
        warmth: 0,
        nostalgia: 0,
        night: 0,
        uncertainty: 0,
    },

    addScores: (scores) =>
        set((state) => {
            const updatedProfile = {
                ...state.emotionalProfile,
            };

            Object.keys(scores).forEach((key) => {
                updatedProfile[key] += scores[key];
            });

            return {
                emotionalProfile: updatedProfile,
            };
        }),

    resetProfile: () =>
        set({
            emotionalProfile: {
                movement: 0,
                solitude: 0,
                warmth: 0,
                nostalgia: 0,
                night: 0,
                uncertainty: 0,
            },
        }),
}));

export default useEmotionStore;
