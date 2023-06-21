import { RunData } from "./types";

export const MOCK_FRUIT_EMOTION_GENERATION: RunData = {
  "check-sky-color": {
    "test-with-xyz": {
      prompt: "prompt 1 - say hi based on ",
      iterations: [
        {
          iter_num: 0,
          output: "[OpenAI: prompt 1 - say hi based on ]",
          evaluations: [
            {
              type: "Noop",
              score: 1,
              pass_threshold: 1,
            },
            {
              type: "ExactMatch",
              score: 0,
              pass_threshold: 1,
            },
            {
              type: "IncludeWords",
              score: 0,
              pass_threshold: 1,
            },
          ],
        },
      ],
    },
    "test-with-c": {
      prompt: "This is a giddy test",
      iterations: [
        {
          iter_num: 0,
          output: "[OpenAI: This is a giddy test]",
          evaluations: [
            {
              type: "IncludeWords",
              score: 1,
              pass_threshold: 1,
            },
          ],
        },
      ],
    },
    "test-with-b": {
      prompt: "What color is the sky?",
      iterations: [
        {
          iter_num: 0,
          output: "[OpenAI: What color is the sky?]",
          evaluations: [
            {
              type: "ExactMatch",
              score: 0,
              pass_threshold: 1,
            },
          ],
        },
        {
          iter_num: 1,
          output: "[OpenAI: What color is the sky?]",
          evaluations: [
            {
              type: "ExactMatch",
              score: 1,
              pass_threshold: 1,
            },
          ],
        },
      ],
    },
  },
  "check-emotion": {
    "test-with-a": {
      prompt: "prompt 1 - say hi based on ",
      iterations: [
        {
          iter_num: 0,
          output: "[OpenAI: prompt 1 - say hi based on ]",
          evaluations: [
            {
              type: "Noop",
              score: 1,
              pass_threshold: 1,
            },
          ],
        },
      ],
    },
    "test-with-c": {
      prompt: "This is a giddy test",
      iterations: [
        {
          iter_num: 0,
          output: "[OpenAI: This is a giddy test]",
          evaluations: [
            {
              type: "IncludeWords",
              score: 1,
              pass_threshold: 1,
            },
          ],
        },
      ],
    },
    "test-with-b": {
      prompt: "What color is the sky?",
      iterations: [
        {
          iter_num: 0,
          output: "[OpenAI: What color is the sky?]",
          evaluations: [
            {
              type: "ExactMatch",
              score: 0,
              pass_threshold: 1,
            },
          ],
        },
        {
          iter_num: 1,
          output: "[OpenAI: What color is the sky?]",
          evaluations: [
            {
              type: "ExactMatch",
              score: 0,
              pass_threshold: 1,
            },
          ],
        },
      ],
    },
  },
};
