from .evals import ExactMatch, IncludeWords, Noop
from .lib import Tester
from .llms.openai import OpenAI

tester = Tester(llm=OpenAI(api_key="1234"))

prompt = tester.register("character-agent-test-emotion")

prompt.test("test-with-a", "This is a happy test", [Noop()])
prompt.test("test-with-c", "This is a giddy test", IncludeWords(["giddy"]))
prompt.test(
    "test-with-b", "This is a melancholy test", [ExactMatch("blue")], iterations=2
)
