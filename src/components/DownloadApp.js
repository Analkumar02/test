import Container from "./Container";
import styled from "styled-components";
import { useImagePath } from "../context/ImagePathContext";

const DownloadApp = () => {
  const { imagePath } = useImagePath();

  return <Container></Container>;
};

export default DownloadApp;
