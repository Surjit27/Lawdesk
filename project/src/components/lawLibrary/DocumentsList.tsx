import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  MapPin,
  Star,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { useLawLibraryStore } from "../../store/lawLibraryStore";
import { useSocket } from "../../providers/SocketProvider";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

interface Document {
  _id: string; // Changed from 'id' to '_id' to match your usage
  title?: string;
  description?: string;
  name?: string;
  profile?: {
    avatar: string;
    name: string;
    bio: string;
    location?: string;
  };
  about?: string;
  location?: string;
  phone?: string;
  email?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  date?: string;
  tags?: string[];
  [key: string]: any; // Additional dynamic properties
}

const DocumentsList = () => {
  const { setSelectedDocument, selectedCategory } = useLawLibraryStore();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();
  const { userId } = useAuth();

  useEffect(() => {
    if (!socket || !userId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        switch (selectedCategory) {
          case "lawyers":
            socket.emit("getAllLawyers", userId);
            break;
          case "places":
            socket.emit("getAllplaces", userId);
            break;
          case "laws":
            socket.emit("legallaw", userId);
            break;
          case "cases":
            socket.emit("pcases", userId);
            break;
          case "orders":
            socket.emit("corders", userId);
            break;
          case "articles":
            socket.emit("articles", userId);
            break;
          case "documents":
            socket.emit("documents", userId);
            break;
          default:
            setDocuments([]);
        }
      } catch (err) {
        setError("Failed to fetch documents");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [socket, selectedCategory, userId]);

  useEffect(() => {
    if (!socket) return;

    const lawHandler = (list: Document[]) => {
      setDocuments(list || []);
    };

    socket.on("lawyerList", lawHandler);
    socket.on("placesList", lawHandler);
    socket.on("legallaw", lawHandler);
    socket.on("previouscases", lawHandler);
    socket.on("courtorders", lawHandler);
    socket.on("articles", lawHandler);
    socket.on("documentation", lawHandler);

    return () => {
      socket.off("lawyerList", lawHandler);
      socket.off("placesList", lawHandler);
      socket.off("legallaw", lawHandler);
      socket.off("previouscases", lawHandler);
      socket.off("courtorders", lawHandler);
      socket.off("articles", lawHandler);
      socket.off("documentation", lawHandler);
    };
  }, [socket]);

  const renderContent = (document: Document) => {
    switch (selectedCategory) {
      case "lawyers":
        return (
          <div className="flex items-start gap-4">
            <img
              src={document.profile?.avatar || "/default-avatar.png"}
              alt={`Profile of ${document.profile?.name || "lawyer"}`}
              className="w-16 h-16 rounded-lg object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-avatar.png";
              }}
            />
            <div className="flex-1">
              <h3 className="font-medium mb-1">
                {document.profile?.name || "Unknown Lawyer"}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {document.profile?.bio || "No bio available"}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {document.profile?.location || "Location not specified"}
                  </span>
                </div>
              </div>
            </div>
            <Link
              to={`/lawyer/${document.clerkUserId}`}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
              aria-label={`View profile of ${
                document.profile?.name || "lawyer"
              }`}
            >
              View Profile
            </Link>
          </div>
        );
        break;

      case "places":
        const contactInfo = document.contactInfo || {};
        return (
          <div className="space-y-3">
            <h3 className="font-medium">{document.name || "Unknown Place"}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {document.about || "No description available"}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{document.location || "Address not available"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="w-4 h-4" />
                <span>
                  {contactInfo.phone || document.phone || "Not provided"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                <span>
                  {contactInfo.email || document.email || "Not provided"}
                </span>
              </div>
            </div>
          </div>
        );
        break;

      default:
        return (
          <div className="flex items-start gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">
                {document.title || "Untitled Document"}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {document.description || "No description available"}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{document.date || "Date not specified"}</span>
                </div>
                {document.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {document.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (documents.length === 0)
    return <div className="text-center py-8">No documents found</div>;

  return (
    <div className="space-y-4" role="list">
      {documents.map((document, index) => (
        <motion.div
          key={document._id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => setSelectedDocument(document)}
          className="bg-white rounded-lg p-4 border border-gray-200 hover:border-green-500 cursor-pointer transition-colors"
          role="listitem"
          aria-label={document.name || document.title || "Document"}
        >
          {renderContent(document)}
        </motion.div>
      ))}
    </div>
  );
};

export default DocumentsList;
