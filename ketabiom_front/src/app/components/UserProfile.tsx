import React from "react";
import Libraries from "./Libraries";
import Notes from "./Notes";
import Excerpts from "./Excerpts";
import ProfHeader from "./ProfHeader";
import Profile from "./Profile";

export default function UserProfile() {
  return (
    <div className="bg-background min-h-screen text-foreground" dir="rtl">
      <ProfHeader />
      <div className="max-w-3xl mx-auto md:border-x md:border-border min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)] bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10">
          <Profile />
          <Libraries />
          <Notes />
          <Excerpts />
        </div>
      </div>
    </div>
  );
}