import {  SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <header className="justify-center items-align">
      <SignIn/>
    </header>
  );
}