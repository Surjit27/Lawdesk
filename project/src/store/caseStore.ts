import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Case, Bid, LawyerProfile } from "../types/case";

interface CaseState {
  cases: Case[];
  lawyers: LawyerProfile[];
  addCase: (
    caseData: Omit<Case, "id" | "createdAt" | "bids" | "status">
  ) => void;
  addBid: (bid: Omit<Bid, "id" | "createdAt" | "status">) => void;
  updateLawyerAvailability: (lawyerId: string, available: boolean) => void;
  getCaseById: (id: string) => Case | undefined;
  addComment: (caseId: string, bidId: string, comment: string) => void;
  connectWithLawyer: (caseId: string, bidId: string) => void;
}

// Sample lawyers data
const sampleLawyers: LawyerProfile[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    type: "lawyer",
    specialization: "Corporate Law",
    experience: 15,
    rating: 4.8,
    casesWon: 127,
    totalCases: 150,
    available: true,
    profileImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: "2",
    name: "Priya Sharma",
    type: "lawyer",
    specialization: "Civil Litigation",
    experience: 12,
    rating: 4.9,
    casesWon: 98,
    totalCases: 110,
    available: true,
    profileImage:
      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=400&h=400",
  },
];

export const useCaseStore = create<CaseState>()(
  persist(
    (set, get) => ({
      cases: [],
      lawyers: sampleLawyers,
      getCaseById: (id: string) => get().cases.find((c) => c.id === id),

      addCase: (caseData) => {
        set((state) => ({
          cases: [
            ...state.cases,
            {
              ...caseData,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
              status: "open",
              bids: [],
            },
          ],
        }));
      },

      addBid: (bidData) => {
        set((state) => ({
          cases: state.cases.map((case_) => {
            if (case_.id === bidData.caseId) {
              return {
                ...case_,
                bids: [
                  ...case_.bids,
                  {
                    ...bidData,
                    id: Math.random().toString(36).substr(2, 9),
                    createdAt: new Date().toISOString(),
                    status: "pending",
                    comments: [],
                    read: false,
                  },
                ],
              };
            }
            return case_;
          }),
        }));
      },

      addComment: (caseId, bidId, comment) => {
        set((state) => ({
          cases: state.cases.map((case_) => {
            if (case_.id === caseId) {
              return {
                ...case_,
                bids: case_.bids.map((bid) => {
                  if (bid.id === bidId) {
                    return {
                      ...bid,
                      comments: [...(bid.comments || []), comment],
                    };
                  }
                  return bid;
                }),
              };
            }
            return case_;
          }),
        }));
      },

      updateLawyerAvailability: (lawyerId, available) => {
        set((state) => ({
          lawyers: state.lawyers.map((lawyer) =>
            lawyer.id === lawyerId ? { ...lawyer, available } : lawyer
          ),
        }));
      },

      connectWithLawyer: (caseId, bidId) => {
        set((state) => ({
          cases: state.cases.map((case_) => {
            if (case_.id === caseId) {
              return {
                ...case_,
                bids: case_.bids.map((bid) => {
                  if (bid.id === bidId) {
                    return {
                      ...bid,
                      status: "accepted",
                      comments: [
                        ...(bid.comments || []),
                        "Client has accepted your proposal. Let's connect to discuss further details.",
                      ],
                    };
                  }
                  return bid;
                }),
              };
            }
            return case_;
          }),
        }));
      },
    }),
    {
      name: "case-storage",
      partialize: (state) => ({ cases: state.cases }),
    }
  )
);
