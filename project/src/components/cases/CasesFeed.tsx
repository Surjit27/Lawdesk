import { motion } from "framer-motion";
import { Bell, Clock, DollarSign, MapPin } from "lucide-react";

const CasesFeed = ({ cases = [], filter = "all" }) => {
  let recentCases = [...cases];

  if (filter !== "all") {
    recentCases = recentCases.filter((case_) => case_.status === filter);
  }

  // Sorting and limiting results to 5
  recentCases = recentCases
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="w-5 h-5 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold">Recent Updates</h2>
        </div>
        <button className="text-sm text-green-500 hover:text-green-600 font-medium">
          View All
        </button>
      </div>

      {recentCases.length > 0 ? (
        <div className="space-y-4">
          {recentCases.map((case_, index) => (
            <motion.div
              key={case_._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{case_.title}</p>
                <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                  {case_.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(case_.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>₹{case_.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{case_.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm text-center">No cases found.</p>
      )}
    </div>
  );
};

export default CasesFeed;
