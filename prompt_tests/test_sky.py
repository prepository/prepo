import os

from prepo import PromptTester
from prepo.evaluators import ExactMatch, IncludeWords, Noop
from prepo.llms.openai import OpenAI

tester = PromptTester(
    llm=OpenAI(api_key=os.getenv("OPENAI_API_KEY")),
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
