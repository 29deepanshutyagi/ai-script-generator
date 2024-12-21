import React, { useState, useEffect } from "react";

const ScriptGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [generatedScript, setGeneratedScript] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedScripts, setSavedScripts] = useState<Record<string, string[]>>({});
  const [pdfName, setPdfName] = useState<string>("");

  useEffect(() => {
    // Load saved scripts from local storage
    const scripts = localStorage.getItem("savedScripts");
    if (scripts) {
      setSavedScripts(JSON.parse(scripts));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("prompt", prompt);
    if (files) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate-script/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const scriptLines = data.choices[0].message.content
          .split("\n")
          .filter((line: string) => line.trim());

        setGeneratedScript(scriptLines);
        setErrorMessage(null);
      } else {
        setErrorMessage(`Error: ${response.statusText}`);
        setGeneratedScript([]);
      }
    } catch (error) {
      setErrorMessage(`An error occurred: ${(error as Error).message}`);
      setGeneratedScript([]);
    }
  };

  const handleSaveScript = () => {
    if (generatedScript.length > 0 && pdfName.trim() !== "") {
      const updatedScripts = { ...savedScripts, [pdfName]: generatedScript };
      setSavedScripts(updatedScripts);
      localStorage.setItem("savedScripts", JSON.stringify(updatedScripts));
      setPdfName(""); // Clear pdfName after saving
      alert("Script saved successfully!");
    } else {
      alert("Please enter a Script name before saving.");
    }
  };

  const handleClearSavedScripts = () => {
    localStorage.removeItem("savedScripts");
    setSavedScripts({});
    alert("All saved scripts cleared!");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        AI-Powered Video Script Generator
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border-2 border-pink-300 p-4 rounded focus:outline-none focus:ring focus:border-pink-500"
          placeholder="Enter your prompt here"
        ></textarea>
        <input
          type="file"
          id="files"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="border-2 border-pink-300 p-4 rounded focus:outline-none focus:ring focus:border-pink-500"
        />
        <button
          type="submit"
          className="text-white px-6 py-3 rounded shadow-lg hover:shadow-xl bg-pink-500 hover:bg-pink-600"
        >
          Generate Script
        </button>
      </form>

      <div
        id="result"
        className={`mt-8 p-6 rounded shadow ${
          generatedScript.length > 0 || errorMessage ? "" : "hidden"
        }`}
      >
        {errorMessage ? (
          <div className="text-red-500">{errorMessage}</div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Generated Script:
            </h2>
            <div id="output" className="bg-pink-50 p-6 rounded text-gray-800">
              {generatedScript.map((line, index) => (
                <div key={index} className="section-content">
                  {line}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <input
                type="text"
                value={pdfName}
                onChange={(e) => setPdfName(e.target.value)}
                className="border-2 border-pink-300 p-2 rounded focus:outline-none focus:ring focus:border-pink-500"
                placeholder="Enter Script name"
              />
              <button
                onClick={handleSaveScript}
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              >
                Save Script
              </button>
            </div>
          </>
        )}
      </div>

      <div id="saved-scripts" className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Saved Scripts:
        </h2>
        {Object.keys(savedScripts).length > 0 ? (
          <div className="space-y-4">
            {Object.keys(savedScripts).map((pdfName, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded shadow text-gray-800"
              >
                <h3 className="font-semibold">{pdfName}:</h3>
                {savedScripts[pdfName].map((line, lineIndex) => (
                  <div key={lineIndex}>{line}</div>
                ))}
              </div>
            ))}
            <button
              onClick={handleClearSavedScripts}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
            >
              Clear All Saved Scripts
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">No scripts saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default ScriptGenerator;
