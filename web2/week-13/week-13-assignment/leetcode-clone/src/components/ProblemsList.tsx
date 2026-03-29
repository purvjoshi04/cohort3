import { useState } from "react"
import { FunnelIcon } from "../icons/FunnelIcon"
import { ProblemsListArray } from "./ProblemListArray"
import { RefreshIcon } from "../icons/RefreshIcon";

export const ProblemsList = () => {
    const [showFilter, setShowFilter] = useState(true);
    const [statusFilters, setStatusFilters] = useState({
        todo: false,
        solved: false,
        attempted: false
    });
    const [difficultyFilters, setDifficultyFilters] = useState({
        easy: false,
        medium: false,
        hard: false
    });
    const [showTags, setShowTags] = useState(false);

    const resetFilters = () => {
        setStatusFilters({ todo: false, solved: false, attempted: false });
        setDifficultyFilters({ easy: false, medium: false, hard: false });
        setShowTags(false);
    }

    return (
        <div className="mt-14">
            <div className="flex bg-white rounded-3xl p-2 w-24 text-black text-sm items-center justify-around cursor-pointer" onClick={() => setShowFilter(!showFilter)}><FunnelIcon />Filter</div>
            {ProblemsListArray.map((list) => (
                <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#323332] m-3 w-4xl">
                    <div className="flex items-center gap-3">
                        <span className="text-green-500">✔</span>
                        <span className="text-sm">{list.key}. {list.title}</span>
                    </div>
                    <span className="text-sm text-green-500">{list.Difficulty}</span>
                </div>
            ))}
            {showFilter && (
                <div className="absolute top-25 left-198 bg-[#323332] rounded-xl p-6 shadow-2xl z-10 w-80 border border-[#323332]">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">Status</h3>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={statusFilters.todo}
                                    onChange={(e) => setStatusFilters({ ...statusFilters, todo: e.target.checked })}
                                    className="w-4 h-4 rounded border-neutral-600 bg-[#323332] flex-shrink-0"
                                />
                                <span className="text-sm leading-none">Todo</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={statusFilters.solved}
                                    onChange={(e) => setStatusFilters({ ...statusFilters, solved: e.target.checked })}
                                    className="w-4 h-4 rounded border-neutral-600 bg-[#323332] flex-shrink-0"
                                />
                                <span className="text-sm leading-none">Solved</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={statusFilters.attempted}
                                    onChange={(e) => setStatusFilters({ ...statusFilters, attempted: e.target.checked })}
                                    className="w-4 h-4 rounded border-neutral-600 bg-[#323332] flex-shrink-0"
                                />
                                <span className="text-sm leading-none">Attempted</span>
                            </label>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold mb-3">Difficulty</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={difficultyFilters.easy}
                                    onChange={(e) => setDifficultyFilters({ ...difficultyFilters, easy: e.target.checked })}
                                    className="w-4 h-4 rounded border-neutral-600 bg-[#323332] flex-shrink-0"
                                />
                                <span className="text-sm text-green-500 leading-none">Easy</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={difficultyFilters.medium}
                                    onChange={(e) => setDifficultyFilters({ ...difficultyFilters, medium: e.target.checked })}
                                    className="w-4 h-4 rounded border-neutral-600 bg-[#323332] flex-shrink-0"
                                />
                                <span className="text-sm text-yellow-500 leading-none">Medium</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={difficultyFilters.hard}
                                    onChange={(e) => setDifficultyFilters({ ...difficultyFilters, hard: e.target.checked })}
                                    className="w-4 h-4 rounded border-neutral-600 bg-[#323332] flex-shrink-0"
                                />
                                <span className="text-sm text-red-500 leading-none">Hard</span>
                            </label>
                        </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer mb-6">
                        <input
                            type="checkbox"
                            checked={showTags}
                            onChange={(e) => setShowTags(e.target.checked)}
                            className="w-4 h-4 rounded border-neutral-600 bg-[#323332] flex-shrink-0"
                        />
                        <span className="text-sm leading-none">Show tags</span>
                    </label>
                    <div className="bg-[#393933] p-3 flex justify-center">
                        <button
                            onClick={resetFilters}
                            className="flex items-center gap-2 text-sm hover:text-white">
                            <RefreshIcon />
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}