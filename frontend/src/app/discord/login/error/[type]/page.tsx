export interface ErrorParams {
    type: string;
}

export default function Error({params}: { params: ErrorParams }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="font-bold text-4xl text-gray-900 dark:text-gray-100">Error</h1>
            <p className="text-xl text-gray-900 dark:text-gray-100">An error occurred while processing your request.</p>
            <p className="text-xl text-gray-900 dark:text-gray-100">{params.type}</p>
        </div>
    );
}