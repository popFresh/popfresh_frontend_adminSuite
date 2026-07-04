import integrations from "../../data/integrationData";
import IntegrationCard from "./IntegrationCard";

const IntegrationSettings = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {integrations.map((integration) => (
        <IntegrationCard
          key={integration.id}
          integration={integration}
        />
      ))}
    </div>
  );
};

export default IntegrationSettings;