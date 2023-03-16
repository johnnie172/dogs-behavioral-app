import React from "react";
import { Box, Container } from "@mui/material";
import { SectionDetails } from "./";
import { QuestionnaireForm } from "../QuestionnaireForm";
import { useFetch } from "../../hooks";
import { getSectionById } from "../../services/questionService";
import { FetchComponent } from "../FetchComponent";

interface SectionPageProps {
  sectionId: number;
}

const SectionPage: React.FC<SectionPageProps> = ({ sectionId }) => {
  const { data, loading, error } = useFetch(() => getSectionById(sectionId));
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <FetchComponent loading={loading} error={error}>
        {data && (
          <Container>
            <SectionDetails section={data?.section}></SectionDetails>
            <QuestionnaireForm sectionData={data} />
          </Container>
        )}
      </FetchComponent>
    </Box>
  );
};

export default SectionPage;
