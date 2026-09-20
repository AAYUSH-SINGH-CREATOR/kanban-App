import { useState } from "react";
import { supabase } from "./supabase";
import { MdDone } from "react-icons/md";


export default function Dashboard() {
    const [colm, setColm] = useState({
        todo: {
            name: "To Do",
            theme: "bg-blue-600 text-white",
            items: []
        },
        pending: {
            name: "Pending",
            theme: "bg-amber-500 text-zinc-900",
            items: []
        },
        complete: {
            name: "Done",
            theme: "bg-green-600 text-white",
            items: []
        }
    });

    const [newTask, setNewTask] = useState("");
    const [activeClm, setActiveClm] = useState("todo");
    const [dragItem, setDragItem] = useState(null);

    const addNewTask = () => {
        if (!newTask.trim()) return;
        setColm(prev => ({
            ...prev,
            [activeClm]: {
                ...prev[activeClm],
                items: [...prev[activeClm].items, { id: Date.now(), content: newTask }]
            }
        }));
        setNewTask("");
    };

    const removeTask = (columnId, taskId) => {
        setColm(prev => ({
            ...prev,
            [columnId]: {
                ...prev[columnId],
                items: prev[columnId].items.filter(i => i.id !== taskId)
            }
        }));
    };

    const handleDrop = (e, targetColmId) => {
        e.preventDefault();
        if (!dragItem || dragItem.colmId === targetColmId) return;

        const { colmId: sourceColmId, item } = dragItem;

        setColm(prev => ({
            ...prev,
            [sourceColmId]: {
                ...prev[sourceColmId],
                items: prev[sourceColmId].items.filter(i => i.id !== item.id)
            },
            [targetColmId]: {
                ...prev[targetColmId],
                items: [...prev[targetColmId].items, item]
            }
        }));
        setDragItem(null);
    };


    const moveTaskToNext = (currentColmId, item) => {
        const colKeys = Object.keys(colm);
        const currentIndex = colKeys.indexOf(currentColmId);

        if (currentIndex === colKeys.length - 1) return;

        const targetColmId = colKeys[currentIndex + 1];

        setColm(prev => ({
            ...prev,
            [currentColmId]: {
                ...prev[currentColmId],
                items: prev[currentColmId].items.filter(i => i.id !== item.id)
            },
            [targetColmId]: {
                ...prev[targetColmId],
                items: [...prev[targetColmId].items, item]
            }
        }));
    };

    return (
        <div className="flex min-h-screen w-screen flex-col items-center bg-zinc-900 pt-2 pb-10 relative">
            <button
                onClick={() => supabase.auth.signOut()}
                className="absolute right-1 top-1 rounded border border-blue-700 px-6 py-2 text-blue-500 transition hover:bg-blue-700 hover:text-white"
            >
                LOGOUT
            </button>
            <p className="mb-6 text-2xl font-bold text-amber-500 pt-10">WELCOME TO KANBAN</p>

            <div className="mb-8 flex w-[90%] max-w-lg flex-col overflow-hidden rounded-lg shadow-lg sm:flex-row">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addNewTask()}
                    className="flex-grow bg-zinc-700 p-3 text-white focus:outline-none"
                />
                <select
                    value={activeClm}
                    onChange={(e) => setActiveClm(e.target.value)}
                    className="bg-zinc-600 p-3 text-white outline-none"
                >
                    {Object.entries(colm).map(([id, col]) => (
                        <option value={id} key={id}>{col.name}</option>
                    ))}
                </select>
                <button onClick={addNewTask} className="cursor-pointer bg-amber-500 px-6 font-medium text-white hover:bg-amber-600">
                    Add
                </button>
            </div>
            <div className="flex w-full flex-col sm:flex-row items-center sm:items-start justify-center gap-8 px-6 pb-10 bg-zinc-900">
                {Object.entries(colm).map(([colmId, col]) => (
                    <div
                        key={colmId}
                        className="flex h-[60vh] w-80 flex-col overflow-hidden rounded-lg bg-zinc-800"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, colmId)}
                    >
                        <div className={`p-4 text-xl font-bold tracking-wide ${col.theme} flex justify-between `}>
                            <span>{col.name}</span><span className="ml-2 rounded-full bg-zinc-700 px-2 py-1 text-sm text-white">{col.items.length}</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-600">
                            {col.items.length === 0 ? (
                                <div className="py-10 text-center text-sm italic text-zinc-500">Drop tasks here</div>
                            ) : (
                                col.items.map((item) => (
                                    <div
                                        key={item.id}
                                        draggable
                                        onDragStart={() => setDragItem({ colmId, item })}
                                        className="mb-3 flex items-center justify-between rounded-lg bg-zinc-700 p-4 text-white"
                                    >
                                        <span className="max-w-[85%] break-words">{item.content}</span>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => moveTaskToNext(colmId, item)}
                                                className="md:hidden flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-600 hover:text-white"
                                            >
                                                <MdDone />
                                            </button>
                                            <button
                                                onClick={() => removeTask(colmId, item.id)}
                                                className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-600 hover:text-red-400"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}