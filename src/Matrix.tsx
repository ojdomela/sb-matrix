import { useEffect, useRef, useState } from 'react'
import { Container } from './components/Container'
import {Controls} from './components/Controls'
import MatrixState, { useWindowSize } from './utils'

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
    controls?: boolean;
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
        width?: string;
        height?: string;
    }
}

export const Matrix = (props: MatrixProps) => {
    const options: MatrixOptions = {
        fontSize: props.fontSize ?? 18,
        fontFamily: props.fontFamily ?? 'roboto',
        animationSpeed: props.animationSpeed ?? 12,
        chars: props.chars ?? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}",
        dropPercentage: props.dropPercentage ?? 25,
        charChangeRate: props.charChangeRate ?? 0,
        opacityChangeRate: props.opacityChangeRate ?? 4,
        fadedPercentage: props.fadedPercentage ?? 25,
        hiddenPercentage: props.hiddenPercentage ?? 25,
        colors: {
            background: props.backgroundColor ?? '#000',
            primary: props.primaryColor ?? "rgb(55,255,55)",
            flashed: props.flashedColor ?? "#fff",
        }
    }
    const [matrix, setMatrix] = useState<MatrixState | null>(null)
    const canvas = useRef<HTMLCanvasElement>(null)
    const container = useRef<HTMLDivElement>(null)
    const size = useWindowSize();

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
    }, [props, size])

    useEffect(() => {
        if (!matrix) return
        matrix.clear()
    },[matrix])

    return (
        <>
            <Container ref={container} dimensions={props.dimensions}>
                <canvas ref={canvas} style={{ display: 'block' }}>
                </canvas>
                {props.controls && matrix && <Controls colors={options.colors} matrix={matrix} />}
            </Container>
        </>
    )
}
