import React from "react";
import styled from "styled-components";

interface Props {
    dimensions?: {
        width?: number;
        height?: number;
    }
    children?: React.ReactNode;
}

const Wrapper = styled.div`
    width: ${(props: Props) => props.dimensions?.width ? props.dimensions.width : "100%"};
    height: ${(props: Props) => props.dimensions?.height ? props.dimensions.height : "100%"};
    position: relative;
`;

export const Container = React.forwardRef((props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return <Wrapper ref={ref} {...props}>{props.children}</Wrapper>;
})