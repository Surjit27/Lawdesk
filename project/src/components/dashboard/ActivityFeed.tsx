import React from "react";

const ActivityFeed = ({ activities }) => {
  const getActivityColor = (type) => {
    switch (type) {
      case "case":
        return "bg-blue-500";
      case "post":
        return "bg-green-500";
      case "alert":
        return "bg-red-500";
      default:
        return "bg-purple-500";
    }
  };

  return (
    <div className="space-y-4">
      {activities && activities.length > 0 ? (
        activities.map((activity, index) => (
          <div
            key={activity.createdAt || index}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div
              className={`w-2 h-2 rounded-full mt-2 ${getActivityColor(
                activity.type
              )}`}
            />
            <div>
              <p className="text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">
                {new Date(activity.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-4">No recent activities</p>
      )}
    </div>
  );
};

export default ActivityFeed;
