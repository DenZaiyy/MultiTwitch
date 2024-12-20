/// <reference types="vite/client" />
declare namespace NodeJS {
    interface ProcessEnv {
        VITE_PARENT: string;
        VITE_MAX_STREAMS: number;
    }
}
