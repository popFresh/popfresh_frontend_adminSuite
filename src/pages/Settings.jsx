import { useState } from "react";

import SettingsHero from "../components/settings/SettingsHero";
import SettingsTabs from "../components/settings/SettingsTabs";

import GeneralSettings from "../components/settings/GeneralSettings";
import CouponSettings from "../components/settings/CouponSettings";
import IntegrationSettings from "../components/settings/IntegrationSettings";
import ShippingSettings from "../components/settings/ShippingSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <>
      {/* Hero */}

      <SettingsHero />

      {/* Tabs */}

      <SettingsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Content */}

      <div className="mt-8">

        {activeTab === "general" && (
          <GeneralSettings />
        )}

        {activeTab === "coupons" && (
          <CouponSettings />
        )}

        {activeTab === "shipping" && (
  <ShippingSettings />
)}
        
        {activeTab === "integrations" && (
          <IntegrationSettings />
        )}

      </div>
    </>
  );
};

export default Settings;