import React from "react";
import { Section } from "sections";
import { Box, Container, Typography } from "@mui/material";
interface SectionPageProps {
  section: Section;
  children?: React.ReactNode;
}

const SectionDetails: React.FC<SectionPageProps> = ({ children, section }) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography variant="h3" className="h3-section-title">
        {section.title}
      </Typography>
      <Typography variant="body1" className="body-section-description">
        {section.description}
      </Typography>
    </Box>
  );
};

export default SectionDetails;
