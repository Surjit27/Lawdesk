import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import CaseHeader from "../components/responses/CaseHeader";
import ResponseCard from "../components/responses/ResponseCard";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useSocket } from "../providers/SocketProvider";

const CaseResponses = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [case_, setcase_] = useState("");
  const { userId } = useAuth();
  const { socket } = useSocket();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (!userId || !socket) return;

    socket.emit("getcase", userId, caseId);

    const casehandler = (details) => {
      console.log(details);
      setcase_(details);
    };

    socket.on("caseDetails", casehandler);
  }, [userId, socket]);

  if (!case_) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Case not found</p>
          </div>
        </div>
      </div>
    );
  }

  console.log(case_, "------->jsnxhjsxnjsn");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Cases
        </motion.button>

        <CaseHeader case_={case_} />

        <div className="space-y-6">
          {case_.bidding.map((bid) => (
            <ResponseCard
              key={bid.id}
              bid={bid}
              onComment={(comment) => {}}
              onAccept={() => {
                socket.emit(
                  "bid-accept",
                  {
                    caseId: caseId,
                    lawyerId: bid.lawyerId,
                    userId: userId,
                  },
                  (response) => {
                    if (response.success) {
                      console.log("Bid accepted:", response.updatedCase);
                      // Update your UI here
                      window.location.reload();
                    } else {
                      console.error("Error:", response.message);
                      // Show error to user
                    }
                  }
                );
              }}
            />
          ))}

          {case_.bidding.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No responses yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseResponses;
