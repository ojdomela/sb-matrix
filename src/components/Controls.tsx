import React from "react"
import styled from "styled-components"
import MatrixState from "../utils"

interface ControlProps {
    matrix: MatrixState
    colors: {
        primary: string;
        background: string;
        flashed: string;
    }
}

interface WrapperProps {
    colors: {
        primary: string;
        background: string;
        flashed: string;
    }
}

interface ButtonProps {
    colors?: {
        primary: string;
        background: string;
        flashed: string;
    }
    onClick: React.MouseEventHandler
    children?: React.ReactNode
}

const Button = styled.button`
    border-radius: 1rem;
    padding: 0.8rem;
    margin: 0.2rem;
    font-size: 1.2rem;
    appearance: none;
    background: ${(props: ButtonProps) => props.colors?.background ? props.colors.background : "#000"};
    color: ${(props) => props.colors?.primary ? props.colors.primary : "rgb(55,255,55)"};
`

const Wrapper = styled.div`
    min-height: 1.2rem;
    position: absolute;
    top: 7.5%;
    left: 7.5%;
    border-radius: 5px;
    display: flex;
    opacity: 0.9;
    background-color: ${(props: WrapperProps) => props.colors?.background ? props.colors.background : "rgb(55,255,55, 0.5)"};
    outline: 1px solid ${(props) => props.colors?.primary ? props.colors.primary : "rgb(55,255,55, 0.5)"};
`

const StartButton = ({ onClick, colors }: ButtonProps) => {
    return <Button colors={colors} onClick={onClick}>Start</Button>
}

const FinishButton = ({ onClick, colors }: ButtonProps) => {
    return <Button colors={colors} onClick={onClick}>Finish</Button>
}

const StopButton = ({ onClick, colors }: ButtonProps) => {
    return <Button colors={colors} onClick={onClick}>Stop</Button>
}

export const Controls = ({ matrix, colors }: ControlProps) => {
    const handleStart = () => {
        matrix.ending = false
        matrix.run()
    }
    return (
        <Wrapper colors={colors}>
            <StartButton colors={colors} onClick={handleStart}/>
            <FinishButton colors={colors} onClick={() => matrix.disable()}/>
            <StopButton colors={colors} onClick={() => matrix.stop()}/>
        </Wrapper>
    )
}
