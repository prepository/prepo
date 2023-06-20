from . import LLM


class OpenAI(LLM):
    def __init__(self, api_key) -> None:
        super().__init__(api_key)

    def generate(self, prompt):
        return f"OpenAI generated: {prompt[0:10]}..."
