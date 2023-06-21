import json
import pathlib
from types import ModuleType

import typer
import uvicorn

from . import PromptTester
from .runner import Job, Runner
from .server import app

cli = typer.Typer()


@cli.command()
def serve():
    uvicorn.run(app, host="127.0.0.1", port=8000)


async def get_results_from_module(module: ModuleType):
    runner = Runner()
    results = {}
    for name in dir(module):
        tester = getattr(module, name)
        if isinstance(tester, PromptTester):
            # for each test, for each case, for each iteration, create a job
            for test in tester.tests.values():
                for case in test.cases.values():
                    for i in range(case.num_iterations):
                        runner.add_job(
                            Job(
                                prompt=test,
                                case=case,
                                llm=tester.llm,
                                iter_num=i,
                            )
                        )

            if runner.size():
                new_results = await runner.run_all_jobs()
                results.update(new_results)

    return results


async def find_and_run_tests():
    import os
    import sys
    import time

    load_dir_name = "prompt_tests"
    load_dir = f"./{load_dir_name}"

    results = {}

    with os.scandir(load_dir) as it:
        for file_entry in it:
            if file_entry.name.endswith(".py") and file_entry.is_file():
                module_name = f"{load_dir_name}.{file_entry.name[:-3]}"
                __import__(module_name)
                module = sys.modules[module_name]
                new_results = await get_results_from_module(module)
                results.update(new_results)

    outfile_dir = "./prompt_tests/outputs"
    outfile_name = f"run-{str(int(time.time()))}"
    outfile_path = f"{outfile_dir}/{outfile_name}.json"
    print(f"Writing to {outfile_path}")

    pathlib.Path(outfile_dir).mkdir(parents=True, exist_ok=True)
    with open(outfile_path, "w") as outfile:
        json.dump(results, outfile, indent=4)


@cli.command()
def run():
    import asyncio

    asyncio.run(find_and_run_tests())


if __name__ == "__main__":
    cli()
