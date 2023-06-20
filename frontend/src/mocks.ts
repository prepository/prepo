import { Prompt } from "./types";

export const MOCK_FRUIT_EMOTION_GENERATION: { prompts: Prompt[] } = {
  prompts: [
    {
      id: "happy-pineapple-sweetness-check",
      runs: [
        {
          id: "raw-pineapple",
          prompt: "Happy Pineapple Sweetness Check",
          minScore: 0.5,
          iterations: [{ output: "Raw Pineapple Output", score: 0.2 }],
        },
        {
          id: "cooked-pineapple",
          prompt: "Happy Pineapple Sweetness Check",
          minScore: 0.6,
          iterations: [{ output: "Cooked Pineapple Output", score: 0.7 }],
        },
      ],
    },
    {
      id: "sad-apple-sourness-test",
      runs: [
        {
          id: "raw-apple",
          prompt: "Sad Apple Sourness Test",
          minScore: 0.7,
          iterations: [{ output: "Raw Apple Output", score: 0.9 }],
        },
        {
          id: "baked-apple",
          prompt: "Sad Apple Sourness Test",
          minScore: 0.4,
          iterations: [
            { output: "Baked Apple Output", score: 0.6 },
            { output: "Baked Apple Output", score: 0.2 },
            { output: "Baked Apple Output", score: 0.2 },
          ],
        },
        {
          id: "juiced-apple",
          prompt: "Sad Apple Sourness Test",
          minScore: 0.5,
          iterations: [
            { output: "Juiced Apple Output", score: 0.2 },
            { output: "Juiced Apple Output", score: 0.2 },
          ],
        },
      ],
    },
    {
      id: "excited-orange-taste-evaluation",
      runs: [
        {
          id: "peeled-orange",
          prompt: "Excited Orange Taste Evaluation",
          minScore: 0.6,
          iterations: [
            { output: "Peeled Orange Output", score: 0.1 },
            { output: "Peeled Orange Output", score: 0.1 },
          ],
        },
        {
          id: "squeezed-orange",
          prompt: "Excited Orange Taste Evaluation",
          minScore: 0.7,
          iterations: [{ output: "Squeezed Orange Output", score: 0.2 }],
        },
      ],
    },
    {
      id: "angry-banana-texture-test",
      runs: [
        {
          id: "mashed-banana",
          prompt: "Angry Banana Texture Test",
          minScore: 0.5,
          iterations: [{ output: "Mashed Banana Output", score: 0.7 }],
        },
        {
          id: "frozen-banana",
          prompt: "Angry Banana Texture Test",
          minScore: 0.4,
          iterations: [{ output: "Frozen Banana Output", score: 0.6 }],
        },
        {
          id: "grilled-banana",
          prompt: "Angry Banana Texture Test",
          minScore: 0.7,
          iterations: [{ output: "Grilled Banana Output", score: 0.2 }],
        },
        {
          id: "smashed-banana",
          prompt: "Angry Banana Texture Test",
          minScore: 0.6,
          iterations: [{ output: "Smashed Banana Output", score: 0.7 }],
        },
      ],
    },
    {
      id: "joyful-strawberry-aroma-experiment",
      runs: [
        {
          id: "fresh-strawberry",
          prompt: "Joyful Strawberry Aroma Experiment",
          minScore: 0.8,
          iterations: [{ output: "Fresh Strawberry Output", score: 0.9 }],
        },
        {
          id: "dried-strawberry",
          prompt: "Joyful Strawberry Aroma Experiment",
          minScore: 0.7,
          iterations: [{ output: "Dried Strawberry Output", score: 0.8 }],
        },
        {
          id: "blended-strawberry",
          prompt: "Joyful Strawberry Aroma Experiment",
          minScore: 0.6,
          iterations: [{ output: "Blended Strawberry Output", score: 0.2 }],
        },
        {
          id: "sliced-strawberry",
          prompt: "Joyful Strawberry Aroma Experiment",
          minScore: 0.8,
          iterations: [{ output: "Sliced Strawberry Output", score: 0.9 }],
        },
      ],
    },
    {
      id: "surprised-lemon-sourness-analysis",
      runs: [
        {
          id: "raw-lemon",
          prompt: "Surprised Lemon Sourness Analysis",
          minScore: 0.6,
          iterations: [{ output: "Raw Lemon Output", score: 0.8 }],
        },
        {
          id: "candied-lemon",
          prompt: "Surprised Lemon Sourness Analysis",
          minScore: 0.5,
          iterations: [{ output: "Candied Lemon Output", score: 0.7 }],
        },
        {
          id: "frozen-lemon",
          prompt: "Surprised Lemon Sourness Analysis",
          minScore: 0.7,
          iterations: [{ output: "Frozen Lemon Output", score: 0.9 }],
        },
        {
          id: "squeezed-lemon",
          prompt: "Surprised Lemon Sourness Analysis",
          minScore: 0.6,
          iterations: [{ output: "Squeezed Lemon Output", score: 0.7 }],
        },
        {
          id: "zested-lemon",
          prompt: "Surprised Lemon Sourness Analysis",
          minScore: 0.7,
          iterations: [{ output: "Zested Lemon Output", score: 0.8 }],
        },
      ],
    },
    {
      id: "curious-mango-taste-comparison",
      runs: [
        {
          id: "ripe-mango",
          prompt: "Curious Mango Taste Comparison",
          minScore: 0.8,
          iterations: [{ output: "Ripe Mango Output", score: 0.9 }],
        },
        {
          id: "unripe-mango",
          prompt: "Curious Mango Taste Comparison",
          minScore: 0.4,
          iterations: [{ output: "Unripe Mango Output", score: 0.6 }],
        },
        {
          id: "dried-mango",
          prompt: "Curious Mango Taste Comparison",
          minScore: 0.6,
          iterations: [{ output: "Dried Mango Output", score: 0.7 }],
        },
        {
          id: "frozen-mango",
          prompt: "Curious Mango Taste Comparison",
          minScore: 0.7,
          iterations: [{ output: "Frozen Mango Output", score: 0.8 }],
        },
      ],
    },
    {
      id: "bittersweet-watermelon-texture-check",
      runs: [
        {
          id: "crunchy-watermelon",
          prompt: "Bittersweet Watermelon Texture Check",
          minScore: 0.6,
          iterations: [{ output: "Crunchy Watermelon Output", score: 0.8 }],
        },
        {
          id: "juicy-watermelon",
          prompt: "Bittersweet Watermelon Texture Check",
          minScore: 0.7,
          iterations: [{ output: "Juicy Watermelon Output", score: 0.9 }],
        },
        {
          id: "frozen-watermelon",
          prompt: "Bittersweet Watermelon Texture Check",
          minScore: 0.5,
          iterations: [{ output: "Frozen Watermelon Output", score: 0.7 }],
        },
      ],
    },
    {
      id: "relaxed-grape-taste-survey",
      runs: [
        {
          id: "red-grape",
          prompt: "Relaxed Grape Taste Survey",
          minScore: 0.7,
          iterations: [{ output: "Red Grape Output", score: 0.9 }],
        },
        {
          id: "green-grape",
          prompt: "Relaxed Grape Taste Survey",
          minScore: 0.6,
          iterations: [{ output: "Green Grape Output", score: 0.8 }],
        },
        {
          id: "frozen-grape",
          prompt: "Relaxed Grape Taste Survey",
          minScore: 0.5,
          iterations: [{ output: "Frozen Grape Output", score: 0.7 }],
        },
        {
          id: "juiced-grape",
          prompt: "Relaxed Grape Taste Survey",
          minScore: 0.7,
          iterations: [{ output: "Juiced Grape Output", score: 0.8 }],
        },
        {
          id: "wine-grape",
          prompt: "Relaxed Grape Taste Survey",
          minScore: 0.8,
          iterations: [{ output: "Wine Grape Output", score: 0.9 }],
        },
      ],
    },
  ],
};
