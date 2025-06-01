import React, { useState, useEffect } from "react";
import { Case } from "../../types/case";
import CaseFilterBar from "./filters/CaseFilterBar";
import CaseCard from "./cards/CaseCard";
import { useUser } from "@clerk/clerk-react";

type CaseFilter = "all" | "open" | "myCases" | "closed";

interface CaseManagementProps {
  cases: Case[];
  onFilterChange?: (filter: CaseFilter) => void;
  onBidChange?: (case_: Case) => void; // Fixed the prop name to be consistent with TypeScript conventions
}

const CaseManagement: React.FC<CaseManagementProps> = ({
  onFilterChange,
  cases,
  onBidChange, // Fixed the prop name here as well
}) => {
  const { user } = useUser();
  const [filter, setFilter] = useState<CaseFilter>("all");

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
  }, [filter, onFilterChange]);

  // Filter cases based on the selected filter
  const filteredCases = cases;

  return (
    <div className="space-y-6">
      <CaseFilterBar currentFilter={filter} onFilterChange={setFilter} />

      {filteredCases.length > 0 ? (
        filteredCases.map((case_, index) => (
          <CaseCard
            key={case_._id}
            case_={case_}
            index={index}
            onBidClick={() => {
              if (onBidChange) {
                onBidChange(case_);
              }
            }}
          />
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">
            {filter === "all"
              ? "No cases available"
              : `No ${filter} cases found`}
          </p>
        </div>
      )}
    </div>
  );
};

export default CaseManagement;
