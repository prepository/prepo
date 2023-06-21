import os

from prepo import PromptTester
from prepo.evals import ExactMatch, IncludeWords, Noop
from prepo.llms.openai import OpenAI

tester = PromptTester(
    llm=OpenAI(api_key=os.getenv("OPENAI_API_KEY")),
    out_dir="./tests",
)

sky_prompt = tester.register("check-sky-color")

sky_prompt.test(
    "test-with-xyz",
    "prompt 1 - say hi based on ",
    [
        Noop(),
        ExactMatch("Hello world"),
        IncludeWords(["Hello", "world"]),
    ],
)
sky_prompt.test("test-with-c", "This is a giddy test", IncludeWords(["giddy"]))
sky_prompt.test(
    "test-with-b", "What color is the sky?", ExactMatch("blue"), iterations=2
)

emotion_prompt = tester.register("check-emotion")

emotion_prompt.test("test-with-a", "prompt 1 - say hi based on ", [Noop()])
emotion_prompt.test("test-with-c", "This is a giddy test", IncludeWords(["giddy"]))
emotion_prompt.test(
    "test-with-b", "What color is the sky?", ExactMatch("blue"), iterations=2
)
