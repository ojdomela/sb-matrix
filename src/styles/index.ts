import { createGlobalStyle } from "styled-components";

export const globals = {
  backgroundColor: "#131a22",
  primaryColor: "#FFAC61",
  secondaryColor: "#FCD7B6",
};

export default createGlobalStyle`
    *,*::before,*::after{
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif; 
    }

    body {
        margin: 0;
    }

    #root{
        height: 100vh;
        background-color: ${globals.backgroundColor};
        display: flex;
        flex-direction: column;
    }
`;
