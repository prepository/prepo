# prepo

Prepo is a prompt testing library. Run, save, and visualize prompt outputs so you're never in the dark when editing prompts.

### Usage

```
from prepo import Tester
from prepo.evals import ExactMatch, IncludeWords, Noop
from prepo.llms.openai import OpenAI


tester = Tester(llm=OpenAI(api_key=os.getenv("OPENAI_API_KEY")))

prompt = tester.register("character-agent-test-emotion")

prompt.test("test-with-a", "prompt 1 - say hi based on ", [Noop()])
prompt.test("test-with-c", "This is a giddy test", IncludeWords(["giddy"]))
prompt.test(
  "test-with-b",
  "What color is the sky?",
  ExactMatch("blue"),
  iterations=2
)
```

### TODO

- fetch test results from server
- select two runs to diff
- add actual examples
- pass in temperature, other params, display in frontend

### TODO before publishing
- handle black, isort, etc
- requirements-dev.txt
- wheels

### Done
- Use async to run tests in parallel
- store test results
  - store by timestamp
- evals
- Actually call OpenAI
- UI to visualize results
- clean up structure
