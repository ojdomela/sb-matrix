import React from "react"
import styled from "styled-components"
import MatrixState from "../utils"

interface Props {
    matrix: MatrixState
    colors: {
        primary: string;
        background: string;
        flashed: string;
    }
}

const Button = styled.button`
    border: none;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    font-size: 1.2em;
`

const Wrapper = styled.div`
    width: 80%;
    height: 10%;
    position: absolute;
    top: 10%;
    left: 10%;
    border-radius: 5px;
    display: flex;
`

const StartButton = ({ onClick }: { onClick: React.MouseEventHandler }) => {
    return <Button onClick={onClick}>Start</Button>
}

const FinishButton = ({ onClick }: { onClick: React.MouseEventHandler }) => {
    return <Button onClick={onClick}>Finish</Button>
}

const StopButton = ({ onClick }: { onClick: React.MouseEventHandler }) => {
    return <Button onClick={onClick}>Stop</Button>
}

const Controls = ({ matrix, colors }: Props) => {
    const handleStart = () => {
        matrix.ending = false
        matrix.run()
    }
    return (
        <Wrapper>
            <StartButton onClick={handleStart}/>
            <FinishButton onClick={() => matrix.disable()}/>
            <StopButton onClick={() => matrix.stop()}/>
        </Wrapper>
    )
}

export default styled(Controls)`

`