import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Live from "../../components/live/live";

function Stream() {
    const [streams, setStreams] = useState<Stream[]>([]);
    const maxStreams = import.meta.env.VITE_MAX_STREAMS + 1;

    const location = useLocation();

    useEffect(() => {
        const streamers = location.pathname.slice(1).split("/");

        if (streamers[0] !== "" && streamers.length < maxStreams) {
            const streamersArray = streamers.map((streamer, index) => ({
                id: index,
                name: streamer,
                isChatOpen: true,
            }));

            setStreams(streamersArray);
            console.log(streamersArray);
        }
    }, [location.pathname]);

    const gridCols = Math.min(streams.length, 2); // Maximum 2 columns
    const gridRows = Math.ceil(streams.length / 2); // Adjust rows dynamically

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
                className={`h-screen w-screen grid`}
                style={{
                    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                    gridTemplateRows: `repeat(${gridRows}, 1fr)`,
                }}
            >
                {streams ? (
                    streams.map((stream) => (
                        <div
                            key={stream.name}
                            className="col-span-1 flex relative group"
                        >
                            <Live
                                stream={stream}
                                handleDeleteStream={() =>
                                    handleDeleteStream(stream.id)
                                }
                                handleToggleChat={() =>
                                    handleToggleChat(stream.id)
                                }
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-1 flex justify-center items-center">
                        <p className="text-2xl font-bold">No streams found</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Stream;
