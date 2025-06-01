import { useEffect, useState } from "react";
import "./styles.css";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useSocket } from "../providers/SocketProvider";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const { socket } = useSocket();
  const { userId } = useAuth();
  const { user } = useUser();
  const [userType, setUserType] = useState(null);
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [barAssociationId, setBarAssociationId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket || !userId) return;
    const role = user?.publicMetadata?.role;
    console.log(role);
    if (role === "lawyer" || role === "client") {
      navigate("/dashboard");
    }
  }, [socket, userId]);

  useEffect(() => {
    if (!socket) return;

    // Handle successful user creation
    socket.on("userCreateSuccess", (data) => {
      console.log("User created successfully:", data);
      setSubmitted(true);
      navigate("/dashboard");
    });

    return () => {
      socket.off("userCreateSuccess");
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    // Generate complete user profile data
    const userData = {
      // Would typically come from your database
      clerkUserId: userId,
      email: user.primaryEmailAddress?.emailAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        name: user.fullName,
        avatar: user.imageUrl,
        bio:
          bio ||
          (userType === "lawyer"
            ? "Corporate lawyer specializing in IP law"
            : "Legal client seeking services"),
        location: `${place}, ${country}`,
        phone: phone,
        specialization: userType === "lawyer" ? specialization : undefined,
        barAssociationId: userType === "lawyer" ? barAssociationId : undefined,
        email: user.primaryEmailAddress?.emailAddress,
      },
      stats:
        userType === "lawyer"
          ? {
              caseCount: 0,
              postCount: 0,
              activeCases: 0,
              completedCases: 0,
            }
          : undefined,
      activities: [],
      cases: [],
      connections: [],
    };

    console.log("Sending user data:", userData);

    // Emit the user data to the backend
    socket.emit("createUser", userData, userType);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (submitted) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="checkmark">✓</div>
          <h2>Registration Successful!</h2>
          <p>Thank you for joining our legal network.</p>
          <p>Your profile is now complete.</p>
          <div className="console-note">
            <small>Check browser console for the complete data structure</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`progress-line ${step >= 2 ? "active" : ""}`}></div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`progress-line ${step >= 3 ? "active" : ""}`}></div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        <div className="card-header">
          <h1>Complete Your Profile</h1>
          <p>Help us understand your legal needs</p>
        </div>

        {step === 1 && (
          <div className="step-content">
            <h2>I am a...</h2>
            <div className="user-type-selector">
              <div
                className={`user-type-card ${
                  userType === "client" ? "selected" : ""
                }`}
                onClick={() => setUserType("client")}
              >
                <div className="user-icon">👤</div>
                <h3>Client</h3>
                <p>Looking for legal services</p>
              </div>
              <div
                className={`user-type-card ${
                  userType === "lawyer" ? "selected" : ""
                }`}
                onClick={() => setUserType("lawyer")}
              >
                <div className="user-icon">⚖️</div>
                <h3>Lawyer</h3>
                <p>Providing legal services</p>
              </div>
            </div>
            <button
              className="next-btn"
              onClick={nextStep}
              disabled={!userType}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <form className="step-content">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8901"
                required
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself ..."
                required
              />
              <div
                className={`char-counter ${bio.length > 250 ? "limit" : ""}`}
              >
                {bio.length}/250
              </div>
              <div className="bio-hint">
                {userType === "lawyer"
                  ? "Describe your legal expertise and experience"
                  : "Tell us about your legal needs"}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="New York"
                  required
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="United States"
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="back-btn" onClick={prevStep}>
                Back
              </button>
              <button type="button" className="next-btn" onClick={nextStep}>
                Continue
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="step-content">
            <h2>Professional Details</h2>
            {userType === "lawyer" && (
              <>
                <div className="form-group">
                  <label>Specialization</label>
                  <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="Intellectual Property, Corporate Law, etc."
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Bar Association ID</label>
                  <input
                    type="text"
                    value={barAssociationId}
                    onChange={(e) => setBarAssociationId(e.target.value)}
                    placeholder="NYBAR-12345"
                    required
                  />
                </div>
              </>
            )}
            <div className="form-group checkbox-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
            <div className="form-actions">
              <button type="button" className="back-btn" onClick={prevStep}>
                Back
              </button>
              <button type="submit" className="submit-btn">
                Complete Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
