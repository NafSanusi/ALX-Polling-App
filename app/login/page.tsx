import React from "react";
import { LoginForm } from "./LoginForm";

const page = () => {
  return (
    <main className="p-8 border max-w-[400px] mt-20 m-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
      <LoginForm />
    </main>
  );
};

export default page;
