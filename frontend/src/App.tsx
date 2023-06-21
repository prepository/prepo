import { useEffect, useState } from "react";
import { RunData, Test } from "./types";
import { cn } from "./lib/cn";
import { fetchRunData, fetchRuns } from "./queries";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select";

const getStatusFromRun = (test: Test) => {
  const allIterationsPassed = test.iterations.every((iter) =>
    iter.evaluations.every((ev) => ev.score >= ev.pass_threshold)
  );
  const allIterationsFailed = test.iterations.every((iter) =>
    iter.evaluations.some((ev) => ev.score < ev.pass_threshold)
  );
  return allIterationsPassed ? "pass" : allIterationsFailed ? "fail" : "warn";
};

type Status = "pass" | "warn" | "fail";

const getClassesForStatus = (status: Status) => {
  return {
    "bg-green-500": status === "pass",
    "bg-yellow-500": status === "warn",
    "bg-red-500": status === "fail",
  };
};

const StatusCircle: React.FC<{ status: Status }> = ({ status }) => {
  return (
    <div className={cn("w-2 h-2 rounded-full", getClassesForStatus(status))} />
  );
};

function App() {
  const [data, setData] = useState<RunData | null>(null);
  const [selection, setSelection] = useState<{
    promptId: string;
    caseId: string;
    iterIdx: number;
  } | null>(null);

  const [runs, setRuns] = useState<string[]>([]);
  const [selectedRun, setSelectedRun] = useState<string | null>(null);

  useEffect(() => {
    const fn = async () => {
      const runs = await fetchRuns();
      setRuns(runs);

      const latestRun = runs[0];
      if (!latestRun) {
        return;
      }

      setSelectedRun(latestRun);

      const newData = await fetchRunData(latestRun);
      setData(newData);

      const promptIds = Object.keys(newData);

      const pid = promptIds[0];
      const prompt = newData[pid];
      const cid = Object.keys(prompt)[0];

      if (pid && cid) {
        setSelection({ promptId: pid, caseId: cid, iterIdx: 0 });
      }
    };

    fn();
  }, []);

  const selectedPrompt = data && selection ? data?.[selection.promptId] : null;
  const selectedCase =
    selectedPrompt && selection ? selectedPrompt?.[selection.caseId] : null;

  return (
    <main className="h-screen text-sm">
      <div className="px-4 h-[48px] flex items-center">
        <h1 className="text-lg font-medium mr-4">PromptTest</h1>
        <div>
          <Select
            value={selectedRun ?? ""}
            onValueChange={(v) => setSelectedRun(v)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Run" />
            </SelectTrigger>
            <SelectContent>
              {runs.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="border w-full grid grid-cols-4 h-[calc(100vh-48px)]">
        <div className="col-span-1 border-r h-full overflow-auto">
          <h2 className="font-medium py-2 px-4 sticky top-0 bg-white border-b">
            Tests
          </h2>
          <div className="">
            {Object.entries(data ?? {}).map(([pid, prompt]) => (
              <div
                key={pid}
                className={cn("px-4 py-2 border-b", {
                  "bg-slate-50": selection?.promptId === pid,
                })}
              >
                <p
                  className={cn("rounded -ml-3 px-3 mb-1 cursor-pointer")}
                  onClick={() => {
                    const cases = Object.keys(prompt);
                    const cid = cases[0];
                    if (cid) {
                      setSelection({ promptId: pid, caseId: cid, iterIdx: 0 });
                    }
                  }}
                >
                  {pid}
                </p>
                <div className="">
                  {Object.entries(prompt).map(([cid, test]) => {
                    return (
                      <div key={cid}>
                        <div
                          className={cn(
                            "flex items-center space-x-2 hover:text-blue-600 rounded -ml-3 px-3 cursor-pointer",
                            {
                              "font-semibold rounded":
                                selection?.caseId === cid &&
                                selection?.promptId === pid,
                            }
                          )}
                          onClick={() => {
                            setSelection({
                              promptId: pid,
                              caseId: cid,
                              iterIdx: 0,
                            });
                          }}
                        >
                          <StatusCircle status={getStatusFromRun(test)} />
                          <p>{cid}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {Object.keys(data ?? {}).length === 0 && (
              <div className="p-4">
                <p className="text-gray-400">No prompts run</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3 h-full overflow-auto">
          {selection && selectedCase && selectedPrompt && (
            <>
              <div className="flex items-center space-x-2 py-2 bg-slate-50 px-4 sticky top-0 border-b">
                <StatusCircle status={getStatusFromRun(selectedCase)} />
                <p>{selection.caseId}</p>
              </div>
              <div className="px-4 py-2 space-y-4">
                <div>
                  <p className="font-medium mb-1">Prompt</p>
                  {/* <p>{selectedCase.prompt.repeat(20)}</p> */}
                  <p>{selectedCase.prompt}</p>
                </div>
                <div>
                  {selectedCase.iterations.length > 1 && (
                    <div className="flex items-center mb-1 text-xs rounded space-x-1 text-slate-500">
                      <button
                        className="bg-slate-100 px-2 rounded align-middle py-1 font-medium"
                        disabled={selection.iterIdx === 0}
                        onClick={() => {
                          setSelection({
                            ...selection,
                            iterIdx: Math.max(selection.iterIdx - 1, 0),
                          });
                        }}
                      >
                        {"◀"}
                      </button>
                      <div>
                        Run {selection.iterIdx + 1} of{" "}
                        {selectedCase.iterations.length}
                      </div>
                      <button
                        className="bg-slate-100 px-2 rounded align-middle py-1 font-medium"
                        disabled={
                          selection.iterIdx ===
                          selectedCase.iterations.length - 1
                        }
                        onClick={() => {
                          setSelection({
                            ...selection,
                            iterIdx: Math.min(
                              selection.iterIdx + 1,
                              selectedCase.iterations.length - 1
                            ),
                          });
                        }}
                      >
                        {"▶"}
                      </button>
                    </div>
                  )}
                  <p className="font-medium mb-1">Evaluations</p>
                  {selectedCase.iterations[selection.iterIdx].evaluations.map(
                    (evaluation, i) => {
                      return (
                        <div
                          key={i}
                          className="relative bg-slate-50 border rounded px-3 py-3 mb-2"
                        >
                          <div
                            className={cn(
                              "text-white w-fit px-2 py-0.5 rounded text-sm mb-2",
                              getClassesForStatus(
                                evaluation.score >= evaluation.pass_threshold
                                  ? "pass"
                                  : "fail"
                              )
                            )}
                          >
                            <span className="mr-1">{evaluation.type}</span>
                            {evaluation.score} / {evaluation.pass_threshold}
                          </div>
                          <p className="whitespace-pre-line">
                            {selectedCase.iterations[0].output}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
