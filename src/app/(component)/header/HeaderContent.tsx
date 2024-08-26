"use client";

import styled from "styled-components";
import ShareButton from "@app/(component)/commons/ShareButton";
import media from "@/src/styles/media";

const Content = styled.div`
  flex: 1;
`;

const ContentUl = styled.ul`
  display: flex;
  align-items: center;

  ${media.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

const ContentLi = styled.li`
  margin-left: 4px;

  ${media.mobile`
    margin-left: 0;
    margin-bottom: 8px;
  `}
`;

export default function HeaderContent() {
  return (
    <Content>
      <ContentUl>
        <ContentLi>
          <ShareButton />
        </ContentLi>
        <ContentLi>
          <ShareButton />
        </ContentLi>
        <ContentLi>
          <ShareButton />
        </ContentLi>
        <ContentLi>
          <ShareButton />
        </ContentLi>
      </ContentUl>
    </Content>
  );
}
