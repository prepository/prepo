# prepo

Prepo is a prompt testing library. Run, save, and visualize prompt outputs so you're never in the dark when editing prompts.

### Usage

```
prepo = Testing(api_key="xyz", api_provider="openai")

prompt = prepo.register(id='character-agent-test-emotion')

prompt.test('test-with-a', CharacterAgent(var_1='x', emotion='a'))
prompt.test('test-with-b', CharacterAgent(var_1='x', emotion='b'))
prompt.test('test-with-c', CharacterAgent(var_1='x', emotion='c'))
```


### TODO
- UI to visualize results
- Use async to run tests in parallel

### TODO before publishing
- handle black, isort, etc
- requirements-dev.txt
- wheels

### Done
- evals
- Actually call OpenAI
