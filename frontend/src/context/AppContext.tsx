import { useContext, createContext, useReducer } from "react";
import { AlertProps } from "@mui/material";

interface Alert {
  message: string;
  severity?: AlertProps["severity"];
  closeText?: string;
}

type State = Alert[];

type Action =
  | { type: "ADD"; payload: Alert }
  | { type: "REMOVE"; payload: Partial<Alert> }
  | { type: "POP" }
  | { type: "CLEAR" };

function isMessageExist(state: State, msg: string): boolean {
    // check if the msg already exists in alerts
  return state.find((alert) => alert.message === msg) ? true : false;
}

function alertsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      const shouldAdd = !isMessageExist(state, action.payload.message);
      if (!shouldAdd) return state;
      return [...state, { ...action.payload }];

    case "REMOVE":
      return state.filter((state) => state.message !== action.payload.message);

    case "POP":
      return state.slice(0, -1);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

type AppReducer = { alerts: State; alertsDispatch: React.Dispatch<Action> };
export const AppContext = createContext<AppReducer>({} as AppReducer);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alerts, alertsDispatch] = useReducer(alertsReducer, []);

  return (
    <AppContext.Provider value={{ alerts, alertsDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  return { ...appContext };
};
