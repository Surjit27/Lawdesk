import React from "react";

const statCards = [
  {
    key: "casesInvolved",
    title: "Cases",
    icon: "📋",
    color: "bg-blue-100 text-blue-600",
  },
  {
    key: "totalPosts",
    title: "Posts",
    icon: "✍️",
    color: "bg-green-100 text-green-600",
  },
  {
    key: "acceptedCases",
    title: "Accepted Case",
    icon: "💬",
    color: "bg-purple-100 text-purple-600",
  },
];

const ProfileStats = ({ stats }) => {
  console.log("Stats", stats);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statCards.map((stat) => (
        <div key={stat.key} className={`p-4 rounded-xl ${stat.color}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">
                {stats?.[stat.key] || 0}
              </p>
            </div>
            <span className="text-2xl">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;
