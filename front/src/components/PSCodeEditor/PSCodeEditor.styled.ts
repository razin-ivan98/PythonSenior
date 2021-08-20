import { resetGlobalState } from "mobx/lib/internal";
import styled from "styled-components";

export const ConsoleWrapper = styled.div`
  padding: 1em;
  height: 30vh;
  background-color: #272822;
  font-family: sans-serif;
`;

export const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  background-color: #011627;
  padding-left: 30px;
  font-family: sans-serif;
`;

export const Pre = styled.div`
  overflow: visible;
`;

interface LineProps {
  errored?: boolean;
}

export const Line = styled.div<LineProps>`
  background-color: ${({errored}) => errored ? "rgba(255, 0, 0, 0.4)" : "unset"};
  /* opacity: ${error => error ? "0.4" : "0"}; */
  height: 18px;
  position: relative;
  overflow: visible;
`;

export const LineNo = styled.div`
  position: absolute;
  color: gray;
  left: -30px;
`;

export const ErrorWrapper = styled.div`
  max-width: 300px;
  position: absolute;
  right: 10px;
  top: 27px;
  border: 1px solid red;
  border-radius: 5px;
  padding: 0.5em;
  color: white;
  overflow: visible;
  text-align: right;
  background-color: rgb(120, 0 ,0);
  &:before { 
    content: ''; 
    position: absolute; 
    width: 0; 
    height: 0; 
    right: 10px; 
    top: -17px; 
    border: 8px solid;
    border-color: transparent transparent red transparent; 
  }
`

export const LineContent = styled.div`
`;

export const ButtonWrapper = styled.div`
  width: fit-content;
  position: absolute;
  bottom: 1em;
  right: 1em;
`
