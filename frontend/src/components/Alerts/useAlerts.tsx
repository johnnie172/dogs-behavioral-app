import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

const useAlerts = () => {
  // hook to set alert timeout when needed
  const { alerts, alertsDispatch } = useAppContext();
  const alertsToPop = alerts.filter(function (alert) {
    return alert?.closeText === undefined;
  });

  useEffect(() => {
    if (alertsToPop.length === 0) return;

    const timer = setTimeout(() => {
      alertsDispatch({ type: "POP" });
    }, 5000);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [alerts]);

  return alerts;
};

export default useAlerts;
