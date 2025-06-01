import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Bidding from "./pages/Bidding";
import Cases from "./pages/Cases";
import Chat from "./pages/Chat";
import AIChat from "./pages/AIChat";
import Dashboard from "./pages/Dashboard";
import LawLibrary from "./pages/LawLibrary";
import LawyerProfile from "./pages/LawyerProfile";
import OnboardingPage from "./pages/Onboarding";
import CaseResponses from "./pages/CaseResponses";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/feed"
            element={
              <>
                <SignedIn>
                  <Feed />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/user-onboarding"
            element={
              <>
                <SignedIn>
                  <OnboardingPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/bidding"
            element={
              <>
                <SignedIn>
                  <Bidding />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/lawyer/:id"
            element={
              <>
                <SignedIn>
                  <LawyerProfile />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/cases"
            element={
              <>
                <SignedIn>
                  <Cases />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/case/:caseId/responses"
            element={
              <>
                <SignedIn>
                  <Cases />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/chat"
            element={
              <>
                <SignedIn>
                  <Chat />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/ai-chat"
            element={
              <>
                <SignedIn>
                  <AIChat />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/law-library"
            element={
              <>
                <SignedIn>
                  <LawLibrary />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/case-responses/:caseId/responses"
            element={
              <>
                <SignedIn>
                  <CaseResponses />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
