import { FaBars } from "react-icons/fa6";
import { useState } from "react";

function Stream({
    stream,
    handleDeleteStream,
    handleToggleChat,
}: {
    stream: Stream;
    handleDeleteStream: (id: number) => void;
    handleToggleChat: (id: number) => void;
}) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <div
                className="group-hover:opacity-100 group-hover:block hidden opacity-0 absolute top-[50%] left-[15px] transition-all duration-300"
                onMouseLeave={() => setIsEditing(false)}
            >
                <button onClick={() => setIsEditing(!isEditing)}>
                    <FaBars size={30} />
                </button>
                <div
                    className={`${
                        isEditing
                            ? "z-10 translate-x-0 opacity-100"
                            : "-z-10 -translate-x-10 opacity-0"
                    } absolute top-[15px] left-[15px] bg-white text-black p-2 flex flex-col items-center justify-center rounded-lg gap-2 w-[150px] transition-all duration-500`}
                >
                    <button
                        onClick={() => handleToggleChat(stream.id)}
                        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg w-full transition-all duration-300"
                    >
                        Toggle Chat
                    </button>
                    <button
                        onClick={() => handleDeleteStream(stream.id)}
                        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg w-full transition-all duration-300"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <iframe
                src={`https://player.twitch.tv/?channel=${stream.name}&parent=${
                    import.meta.env.VITE_PARENT
                }`}
                allowFullScreen={false}
                loading="lazy"
                className={`border-0 ${
                    stream.isChatOpen ? "w-2/3" : "w-full"
                } h-full`}
            >
                <p>Your browser does not support iframes.</p>
            </iframe>
            <iframe
                src={`https://www.twitch.tv/embed/${stream.name}/chat?parent=${
                    import.meta.env.VITE_PARENT
                }&darkpopout`}
                loading="lazy"
                className={`border-0 ${
                    stream.isChatOpen ? "block w-1/3 h-full" : "hidden"
                }`}
            >
                <p>Your browser does not support iframes.</p>
            </iframe>
        </>
    );
}

export default Stream;
