// src/providers/AuthSocketWrapper.tsx
import { ClerkProvider } from "@clerk/clerk-react";
import { SocketProvider } from "./SocketProvider";

export const AuthSocketWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ClerkProvider
      publishableKey="pk_test_ZmxleGlibGUtc3dhbi01NS5jbGVyay5hY2NvdW50cy5kZXYk"
      appearance={{
        variables: {
          colorPrimary: "#4f46e5",
        },
      }}
    >
      <SocketProvider>{children}</SocketProvider>
    </ClerkProvider>
  );
};
