import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, fs, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [isWiping, setIsWiping] = useState(false);

    const loadFiles = async () => {
        try {
            const files = (await fs.readDir("./")) as FSItem[];
            setFiles(files);
        } catch (error) {
            console.error('Error loading files:', error);
        }
    };

    const loadResumes = async () => {
        try {
            const resumeItems = (await kv.list('resume:*', true)) as KVItem[];
            const parsedResumes = resumeItems?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ));
            setResumes(parsedResumes || []);
        } catch (error) {
            console.error('Error loading resumes:', error);
        }
    };

    useEffect(() => {
        loadFiles();
        loadResumes();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to wipe all app data? This cannot be undone.')) {
            return;
        }

        setIsWiping(true);

        try {
            // Delete all files
            for (const file of files) {
                try {
                    await fs.delete(file.path);
                } catch (error) {
                    console.error(`Error deleting file ${file.name}:`, error);
                }
            }

            // Clear KV store
            await kv.flush();

            // Reload data
            await loadFiles();
            await loadResumes();

            alert('App data wiped successfully!');
        } catch (error) {
            console.error('Error wiping data:', error);
            alert('Error wiping data. Check console for details.');
        } finally {
            setIsWiping(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">App Data Management</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">User Info</h2>
                    <p className="text-gray-700">Authenticated as: <span className="font-medium">{auth.user?.username}</span></p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Files ({files.length})</h2>
                        <div className="max-h-64 overflow-y-auto">
                            {files.length === 0 ? (
                                <p className="text-gray-500">No files found</p>
                            ) : (
                                <div className="space-y-2">
                                    {files.map((file) => (
                                        <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                            <span className="text-sm font-medium">{file.name}</span>
                                            <span className="text-xs text-gray-500">{file.type}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Resumes ({resumes.length})</h2>
                        <div className="max-h-64 overflow-y-auto">
                            {resumes.length === 0 ? (
                                <p className="text-gray-500">No resumes found</p>
                            ) : (
                                <div className="space-y-2">
                                    {resumes.map((resume) => (
                                        <div key={resume.id} className="p-2 bg-gray-50 rounded">
                                            <div className="text-sm font-medium">{resume.companyName || 'Unknown Company'}</div>
                                            <div className="text-xs text-gray-500">{resume.jobTitle || 'Unknown Position'}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-red-800 mb-4">Danger Zone</h2>
                    <p className="text-red-700 mb-4">
                        This will permanently delete all files and resume data. This action cannot be undone.
                    </p>
                    <button
                        className={`px-6 py-3 rounded-md font-medium transition-colors ${isWiping
                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                            }`}
                        onClick={handleDelete}
                        disabled={isWiping}
                    >
                        {isWiping ? 'Wiping Data...' : 'Wipe All App Data'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WipeApp;