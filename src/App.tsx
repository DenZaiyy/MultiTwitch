import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Stream from "./components/stream/stream";

function App() {
    const [streams, setStreams] = useState<Stream[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newStreamName, setNewStreamName] = useState("");
    const [newStreamId, setNewStreamId] = useState(0);

    const gridCols = Math.min(streams.length, 2); // Maximum 2 columns
    const gridRows = Math.ceil(streams.length / 2); // Adjust rows dynamically
    const maxStreams = 4;

    const handleAddStream = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            newStreamName &&
            !streams.some((s) => s.name === newStreamName) &&
            streams.length < maxStreams
        ) {
            setNewStreamId(newStreamId + 1);
            setStreams([
                ...streams,
                {
                    id: newStreamId,
                    name: newStreamName,
                    isChatOpen: true,
                },
            ]);
            setNewStreamName("");
            setIsPopupOpen(false);
        }
    };

    const handlePopup = () => {
        setIsPopupOpen(true);
        setTimeout(() => {
            const input = window.document.getElementById("streamName");
            if (input) {
                input.focus();
            }
        }, 100);
    };

    const handleDeleteStream = (id: number) => {
        setStreams(streams.filter((s) => s.id !== id));
    };

    const handleToggleChat = (id: number) => {
        setStreams(
            streams.map((s) =>
                s.id === id ? { ...s, isChatOpen: !s.isChatOpen } : s
            )
        );
    };

    return (
        <>
            <div
                className={`${
                    streams.length < maxStreams ? "block" : "hidden"
                } absolute top-[10px] right-[10px] z-50`}
            >
                <button
                    onClick={() => handlePopup()}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    <FaPlus />
                </button>

                {isPopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className="bg-white p-6 rounded-lg min-w-[350px]">
                            <form onSubmit={handleAddStream}>
                                <input
                                    type="text"
                                    name="streamName"
                                    id="streamName"
                                    value={newStreamName}
                                    onChange={(e) => {
                                        setNewStreamName(e.target.value);
                                    }}
                                    placeholder="Entrez le nom du stream"
                                    className="border p-2 mb-4 w-full text-black"
                                />
                                <div className="flex gap-2 justify-between">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Ajouter
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsPopupOpen(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div
                className={`h-screen w-screen grid`}
                style={{
                    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                    gridTemplateRows: `repeat(${gridRows}, 1fr)`,
                }}
            >
                {streams.map((stream) => (
                    <div
                        key={stream.name}
                        className="col-span-1 flex relative group"
                    >
                        <Stream
                            stream={stream}
                            handleDeleteStream={() =>
                                handleDeleteStream(stream.id)
                            }
                            handleToggleChat={() => handleToggleChat(stream.id)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
