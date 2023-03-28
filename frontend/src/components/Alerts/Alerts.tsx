import {
  Alert as MuiAlert,
  AlertProps,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "../../context/AppContext";
import { useAlerts } from "./";

const AlertWithClosing: React.FC<AlertProps & { msg: string }> = ({
  ...props
}) => {
  const { alertsDispatch } = useAppContext();
  return (
    <MuiAlert
      {...props}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            alertsDispatch({ type: "REMOVE", payload: { message: props.msg } });
          }}
          sx={{ marginRight: "auto" }}
        >
          <CloseIcon fontSize="inherit" />
          {props.closeText}
        </IconButton>
      }
    >
      {props?.children}
    </MuiAlert>
  );
};

const Alert: React.FC<AlertProps> = ({ ...props }) => (
  <MuiAlert {...props}>{props?.children}</MuiAlert>
);

const Alerts = () => {
  const alerts = useAlerts();

  return (
    <Stack sx={{ width: "100%", minHeight: "50px" }} spacing={2}>
      {alerts.map((alert, idx) =>
        alert?.closeText ? (
          <AlertWithClosing
            key={idx}
            severity={alert.severity}
            closeText={alert.closeText}
            msg={alert.message}
          >
            {alert.message}
          </AlertWithClosing>
        ) : (
          <Alert key={idx} severity={alert.severity}>
            {alert.message}
          </Alert>
        )
      )}
    </Stack>
  );
};

export default Alerts;
