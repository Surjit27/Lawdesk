import React from "react";
import { Bid } from "../../../types/case";

interface BidResponseProps {
  bid: Bid;
}

const BidResponse: React.FC<BidResponseProps> = ({ bid }) => {
  console.log("Bidinjsxjsbhj", bid);
  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">Your Response</span>
        <span
          className={`text-sm ${
            bid.status === "pending"
              ? "text-yellow-600"
              : bid.status === "accepted"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
        </span>
      </div>
      <p className="text-gray-600 text-sm">{bid.proposal}</p>
      <div className="mt-2 text-sm text-gray-500">
        Quoted Amount: ₹{bid.amount.toLocaleString()}
      </div>
    </div>
  );
};

export default BidResponse;
