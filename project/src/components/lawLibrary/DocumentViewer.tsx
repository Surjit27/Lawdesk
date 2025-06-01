import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useLawLibraryStore } from "../../store/lawLibraryStore";
import ProfileDashboard from "./profile/ProfileDashboard";

const DocumentViewer = () => {
  const { selectedDocument, setSelectedDocument, selectedCategory } =
    useLawLibraryStore();

  if (!selectedDocument) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No document selected
        </h2>
        <p className="text-gray-500">
          Please select a document to view details.
        </p>
      </div>
    );
  }

  if (selectedCategory === "lawyers") {
    return (
      <ProfileDashboard
        profile={selectedDocument}
        onBack={() => setSelectedDocument(null)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedDocument(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to List
        </button>
        {selectedDocument.downloadUrl && (
          <button className="flex items-center gap-2 text-green-600 hover:text-green-700">
            <Download className="w-5 h-5" />
            Download
          </button>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {selectedDocument.name || "Untitled Document"}
        </h2>
        <p className="text-gray-600">
          {selectedDocument.about || "No description available."}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {selectedDocument.tags && selectedDocument.tags.length > 0 ? (
            selectedDocument.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              No tags available
            </span>
          )}
        </div>

        <div className="prose max-w-none">
          {selectedDocument.about || "No additional information provided."}
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentViewer;
