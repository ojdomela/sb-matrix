import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Controls from './controls'
import MatrixState from './utils'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

export type MatrixOptions = {
    fontSize: number;
    fontFamily: string;
    animationSpeed: number;
    chars: string;
    dropPercentage: number;
    charChangeRate: number;
    opacityChangeRate: number;
    fadedPercentage: number;
    hiddenPercentage: number;
    colors: {
        primary: string;
        background: string;
        flashed: string;
    }
}

export const Matrix = () => {
    const [options, setOptions] = useState<MatrixOptions>({
        fontSize: 20,
        fontFamily: 'roboto',
        animationSpeed: 75,
        chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}",
        dropPercentage: 75,
        charChangeRate: 16,
        opacityChangeRate: 4,
        fadedPercentage: 25,
        hiddenPercentage: 25,
        colors: {
            background: "#000000",
            primary: "rgb(55,255,55)",
            flashed: "#ffffff"
        }
    })
    const [matrix, setMatrix] = useState<MatrixState | null>(null)
    const canvas = useRef<HTMLCanvasElement>(null)
    const wrapperSize = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!canvas.current) return
        const style = window.getComputedStyle(wrapperSize.current!)
        const height = Number(style.height.slice(0, style.height.length - 2))
        const width = Number(style.width.slice(0, style.width.length - 2))
        canvas.current.height = height
        canvas.current.width = width
        const ratio = height / width;
        setMatrix(new MatrixState(options, canvas.current, ratio)) 

        return () => {
            if (!canvas.current || !matrix) return
            matrix.stop()
        }
    }, [options])

    return (
        <>
            <Wrapper ref={wrapperSize}>
                <canvas ref={canvas} style={{display: 'block'}}>
                </canvas>
                {matrix && <Controls colors={options.colors} matrix={matrix}/>}
            </Wrapper>
        </>
    )
}
