import React from "react";
import { Typography, Container, LinearProgress } from "@mui/material";

interface FetchComponentProps {
  children?: React.ReactNode;
  loading?: boolean;
  error?: string;
}

const FetchComponent: React.FC<FetchComponentProps> = ({
  children,
  loading,
  error,
}) => {
  return (
    <Container>
      {loading ? (
        <LinearProgress />
      ) : error ? (
        <Typography variant="h2" color="error">
          ERROR!
        </Typography>
      ) : (
        children
      )}
    </Container>
  );
};

export default FetchComponent;
