from abc import ABC, abstractmethod
from typing import Any

import openai


class LLM(ABC):
    def __init__(
        self,
        api_key,
    ):
        self.api_key = api_key

    @abstractmethod
    async def generate(self, prompt: str, model_params: dict = {}) -> str:
        pass

    @abstractmethod
    async def generate_chat(self, messages: list, model_params: dict = {}) -> str:
        pass


class OpenAI(LLM):
    def __init__(self, api_key, organization: str = "") -> None:
        super().__init__(api_key)
        openai.api_key = api_key
        if organization:
            openai.organization = organization

    async def generate(self, prompt, model_params) -> str:
        if not model_params:
            raise Exception(
                "You haven't set model_params in PromptTest or your .test call"
            )

        try:
            resp: Any = await openai.Completion.acreate(
                **model_params,
                prompt=prompt,
            )
            return resp.choices[0].text
        except Exception as e:
            print("Error calling LLM", prompt, model_params)
            raise e

    async def generate_chat(self, messages, model_params) -> str:
        if not model_params:
            raise Exception(
                "You haven't set model_params in PromptTest or your .test call"
            )

        try:
            resp: Any = await openai.ChatCompletion.acreate(
                **model_params, messages=messages
            )
            return resp.choices[0].message.content
        except Exception as e:
            print("Error calling chat LLM", messages, model_params)
            raise e
