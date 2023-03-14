import React from "react";
import { Box, Container } from "@mui/material";
import { SectionData } from "sections";
import { SectionDetails } from "./";
import { QuestionnaireForm } from "../QuestionnaireForm";
import { useGetData } from "../../hooks";
import { getSectionById } from "../../services/questionService";

interface SectionPageProps {
  sectionId: number;
}

const SectionPage: React.FC<SectionPageProps> = ({ sectionId }) => {
  const { data, loading } = useGetData(() => getSectionById(sectionId));
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {loading && "Loading"}

      {data && (
        <Container>
          <SectionDetails section={data?.section}></SectionDetails>
          <QuestionnaireForm sectionData={data} />
        </Container>
      )}
    </Box>
  );
};

export default SectionPage;
