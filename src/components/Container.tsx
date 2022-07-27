import React from "react";
import styled from "styled-components";

interface Props {
    dimensions?: {
        width?: string;
        height?: string;
    }
    children?: React.ReactNode;
}

const Wrapper = styled.div`
    width: ${(props: Props) => props.dimensions?.width ?? "100%"};
    height: ${(props: Props) => props.dimensions?.height ?? "100%"};
    position: relative;
`;

export const Container = React.forwardRef((props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return <Wrapper ref={ref} {...props}>{props.children}</Wrapper>;
})