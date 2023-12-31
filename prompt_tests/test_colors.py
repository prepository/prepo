import os

from prepo import PromptTester
from prepo.evaluators import ExactMatch, IncludeWords, Noop
from prepo.llms import OpenAI

# tester = PromptTester(
#     llm=OpenAI(api_key=os.getenv("OPENAI_API_KEY")),
# )


# emotion_prompt = tester.register("check-emotion")

# emotion_prompt.test("test-with-a", "prompt 1 - say hi based on ", [Noop()])
# emotion_prompt.test("test-with-c", "This is a giddy test", IncludeWords(["giddy"]))
# emotion_prompt.test(
#     "test-with-b", "What color is the sky?", ExactMatch("blue"), iterations=2
# )
