import { Typography } from "@mui/material";
import { Answer } from "sections";

interface AnswerProps {
  text: Answer["content"];
  size: string;
}
const AnswerTypography: React.FC<AnswerProps> = ({ text, size }) => (
  <Typography textAlign="center" sx={{ width: size }}>
    {text}
  </Typography>
);

export default AnswerTypography;
