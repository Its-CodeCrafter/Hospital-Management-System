import { useState } from "react";
import { notificationSettings } from "./setting/ettingsData";
import ProfileSettings from "./setting/ProfileSettings";
import SettingsSection from "./setting/SettingsSection";

export default function SettingsPage() {
  const [toggles, setToggles] = useState({
    email: true,
    push: false,
    reminders: true,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account preferences and notifications
        </p>
      </div>

      {/* Profile */}
      <ProfileSettings />

      {/* Notifications */}
      <SettingsSection
        title="Notifications"
        description="Control how you receive notifications"
        items={notificationSettings}
        values={toggles}
        onToggle={handleToggle}
      />
    </div>
  );
}
