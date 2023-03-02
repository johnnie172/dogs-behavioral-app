import React from "react";
import { Box, Container } from "@mui/material";
import { SectionData } from "sections";
import { SectionDetails } from "./";
import { QuestionnaireForm } from "../QuestionnaireForm";
import { useAxiosFetch } from "../../hooks";

interface SectionPageProps {
  sectionApi: string;
}

const SectionPage:React.FC<SectionPageProps> = ({sectionApi}) => {
  const { data, loading, error } = useAxiosFetch<SectionData>({
    api: sectionApi,
    withCredentials: false,
  });
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
