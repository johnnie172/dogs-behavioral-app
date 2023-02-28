import React from "react";
import { Box, styled } from "@mui/material";
import { Answer } from "sections";
import { AnswerTypography } from "./";

interface HeaderProps {
  answers: Answer[];
}

const StyledBox = styled(Box)(() => ({
  width: "50%",
  marginLeft: "auto",
  display: "flex",
  flexDirection: "row",
}));

const Header: React.FC<HeaderProps> = ({ answers }) => {
  const size = `${100 / answers.length}%`;

  return (
    // TODO: change the div
    <StyledBox>
      {answers.map((answer) => (
        <AnswerTypography
          key={answer.id}
          text={answer.content}
          size={size}
        ></AnswerTypography>
      ))}
    </StyledBox>
  );
};

export default Header;
