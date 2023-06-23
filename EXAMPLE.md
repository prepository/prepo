Running prepo in your codebase

```bash
cd your_repo
git clone git@github.com:prepository/prepo.git temp_prepo/
pip install openai uvicorn typer fastapi

# copy the `prepo` and `frontend` directories
cp -R temp_prepo/prepo ./prepo
cp -R temp_prepo/frontend ./frontend
rm -rf temp_prepo/

# write your test
mkdir prompt_tests/
touch prompt_tests/your_test_file.py

# Run prepo
OPENAI_API_KEY='your-key' python3 -m prepo run

# View the results
python3 -m prepo serve
```


```python
# prompt_tests/your_test_file.py
import os

from your_repo import make_prompt

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

get_color_prompt = tester.register("check-color")

get_color_prompt.test(
    "sky",
    make_prompt("sky"),
    [
        IncludeWords(["blue"]),
    ],
)

get_color_prompt.test(
    "grass",
    make_prompt("grass"),
    [
        IncludeWords(["green"]),
    ],
)

```
