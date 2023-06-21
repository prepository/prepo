# prepo

Prepo is a prompt testing library. Run, save, and visualize prompt outputs so you're never in the dark when editing prompts.

### Usage

```
import os

from prepo import PromptTester
from prepo.evaluators import IncludeWords
from prepo.llms import OpenAI

tester = PromptTester(
    llm=OpenAI(api_key=os.getenv("OPENAI_API_KEY")),
    model_params={
        "model": "text-davinci-003",
        "max_tokens": 100,
    },
)

sky_prompt = tester.register("check-sky-color")

sky_prompt.test(
    "generic-question",
    "What color is the sky?",
    [
        IncludeWords(["blue"]),
    ],
)


sky_prompt.test(
    "one-word-answer",
    "What color is the sky? Answer with only one word",
    [
        IncludeWords(["blue"]),
    ],
)

sky_prompt.test_chat(
    "one-word-answer-chat",
    messages=[
        {"role": "user", "content": "What color is the sky? Answer with only one word"}
    ],
    model_params={
        "model": "gpt-3.5-turbo",
        "max_tokens": 100,
    },
    evaluators=[
        IncludeWords(["blue"]),
    ],
)

```

### TODO

- select two runs to diff
- pass in temperature, other params, display in frontend

### TODO before publishing
- handle black, isort, etc
- requirements-dev.txt
- wheels

### Done
- add actual examples
- fetch test results from server
- Use async to run tests in parallel
- store test results
  - store by timestamp
- evals
- Actually call OpenAI
- UI to visualize results
- clean up structure
