import os

# from .evals import ExactMatch, IncludeWords, Noop
# from .lib import Tester
# from .llms.openai import OpenAI
# tester = Tester(llm=OpenAI(api_key=os.getenv("OPENAI_API_KEY")))
# prompt = tester.register("character-agent-test-emotion")
# prompt.test("test-with-a", "This is a happy test", [Noop()])
# prompt.test("test-with-c", "This is a giddy test", IncludeWords(["giddy"]))
# prompt.test(
#     "test-with-b", "This is a melancholy test", [ExactMatch("blue")], iterations=2
# )
import typer
import uvicorn

from .server import app

cli = typer.Typer()


@cli.command()
def run():
    uvicorn.run(app, host="127.0.0.1", port=8000)


if __name__ == "__main__":
    cli()
