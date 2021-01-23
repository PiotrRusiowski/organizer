import React from "react";
import WalletsHistory from "../components/budgetComponents/WalletsHistory/WalletsHistory";
import styled from "styled-components";

const WalletsHistoryView = () => {
  const StyledWalledHistory = styled.div`
    padding: 20px;
  `;
  return (
    <StyledWalledHistory>
      <WalletsHistory />
    </StyledWalledHistory>
  );
};

export default WalletsHistoryView;
