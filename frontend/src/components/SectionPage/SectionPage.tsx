import React from 'react'
import { Section } from "sections"
import { Box, Container, Typography } from '@mui/material';
interface SectionPageProps {
  section: Section
  children?: React.ReactNode;
}

const SectionPage: React.FC<SectionPageProps> = ({ children, section }) => {
  return (
    <Box sx={{width: "100%", height:"100%"}}>
      <Typography variant="h3" > {section.title} </Typography>
      <Typography variant="body1" > {section.description} </Typography>
    </Box>
  )
}

export default SectionPage