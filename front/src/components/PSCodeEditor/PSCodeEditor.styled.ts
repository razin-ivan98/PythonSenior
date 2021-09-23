import { resetGlobalState } from "mobx/lib/internal";
import styled from "styled-components";

interface ConsoleWrapperProps {
  show?: boolean
}

export const MainContainer = styled.div`
  overflow: hidden;
  height: 100%;
`
interface WrapperProps {
  showConsole?: boolean
}

export const ConsoleWrapper = styled.div<ConsoleWrapperProps>`
  padding: 1em;
  height: 30%;
  background-color: #1e1e1e;
  font-family: sans-serif;
  overflow: visible;
  border-top: 2px solid white;
  position: relative;
`;

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  box-sizing: border-box;
  background-color: #011627;
  padding-left: 30px;
  font-family: sans-serif;
  height: ${({showConsole}) => showConsole ? "70%" : "100%"};
  transition: ease 0.3s height;
`;

export const Pre = styled.div`
  overflow: visible;
`;

interface LineProps {
  errored?: boolean;
  isEmpty?: boolean;
}

export const Line = styled.div<LineProps>`
  background-color: ${({errored}) => errored ? "rgba(255, 0, 0, 0.4)" : "unset"};
  /* opacity: ${error => error ? "0.4" : "0"}; */
  min-height: 18px;
  height: ${({isEmpty}) => isEmpty ? "18px" : "unset"};
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
  right: 60px;
  top: 27px;
  border: 1px solid red;
  border-radius: 5px;
  padding: 0.5em;
  color: white;
  overflow: visible;
  text-align: right;
  background-color: rgb(120, 0 ,0);
  z-index: 700;
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
  height: calc(100% - 2em);
  top: 1em;
  right: 1em;
  z-index: 1000;
`

export const ConsoleErrorWrapper = styled.div`
  background-color: rgb(120, 0 ,0);
`


export const ConsoleLabel = styled.div`
    display: block;
    border-radius: 5px 5px 0 0;
    position: absolute;
    background-color: #1e1e1e;
    padding: 0.1em 0.8em;
    color: white;
    top: -1.54em;
    left: 1em;
    border: 2px solid;
    border-color: white white transparent white;
`
