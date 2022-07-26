import { useEffect, useRef, useState } from 'react'
import { Container } from './components/Container'
import { Controls } from './components/Controls'
import MatrixState from './utils'

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

export type MatrixProps = {
    fontSize?: number;
    fontFamily?: string;
    animationSpeed?: number;
    chars?: string;
    dropPercentage?: number;
    charChangeRate?: number;
    opacityChangeRate?: number;
    fadedPercentage?: number;
    hiddenPercentage?: number;
    primaryColor?: string;
    backgroundColor?: string;
    flashedColor?: string;
    dimensions?: {
        width?: number;
        height?: number;
    }
}

export const Matrix = (props: MatrixProps) => {
    const options: MatrixOptions = {
        fontSize: props.fontSize ? props.fontSize : 20,
        fontFamily: props.fontFamily ? props.fontFamily : 'roboto',
        animationSpeed: props.animationSpeed ? props.animationSpeed : 75,
        chars: props.chars ? props.chars : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}",
        dropPercentage: props.dropPercentage ? props.dropPercentage : 50,
        charChangeRate: props.charChangeRate ? props.charChangeRate : 16,
        opacityChangeRate: props.opacityChangeRate ? props.opacityChangeRate : 4,
        fadedPercentage: props.fadedPercentage ? props.fadedPercentage : 25,
        hiddenPercentage: props.hiddenPercentage ? props.hiddenPercentage : 25,
        colors: {
            background: props.backgroundColor ? props.backgroundColor : '#000',
            primary: props.primaryColor ? props.primaryColor : "rgb(55,255,55)",
            flashed: props.flashedColor ? props.flashedColor : "#fff",
        }
    }
    const [matrix, setMatrix] = useState<MatrixState | null>(null)
    const canvas = useRef<HTMLCanvasElement>(null)
    const container = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!canvas.current) return
        const style = window.getComputedStyle(container.current!)
        const width = Number(style.width.slice(0, style.width.length - 2))
        const height = Number(style.height.slice(0, style.height.length - 2))
        canvas.current.width = width
        canvas.current.height = height
        const ratio = width / height;
        setMatrix(new MatrixState(options, canvas.current, ratio))

        return () => {
            if (!canvas.current || !matrix) return
            matrix.stop()
        }
    }, [props])

    useEffect(() => {
        if (!matrix) return
        matrix.clear()
    }, [matrix])

    return (
        <>
            <Container ref={container} dimensions={props.dimensions}>
                <canvas ref={canvas} style={{ display: 'block' }}>
                </canvas>
                {matrix && <Controls colors={options.colors} matrix={matrix} />}
            </Container>
        </>
    )
}
