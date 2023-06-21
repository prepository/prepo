import openai

from . import LLM


class OpenAI(LLM):
    def __init__(self, api_key, organization: str = "") -> None:
        super().__init__(api_key)
        openai.api_key = api_key
        if organization:
            openai.organization = organization

    async def generate(self, prompt: str):
        # chat_completion = openai.ChatCompletion.create(
        #     model="gpt-3.5-turbo", messages=[{"role": "user", "content": "Hello world"}]
        # )

        # return chat_completion.choices[0].message.content
        return f"[OpenAI: {prompt}]"
