import {
  CIRCUIT_BOARD_PAD_RADIUS,
  DEFAULT_NUM_STAR_POINTS,
  FINDER_PATTERN_INNER_RADIUSES,
  FINDER_PATTERN_INNER_SIZE,
  FINDER_PATTERN_OUTER_RADIUSES,
  FINDER_PATTERN_OUTER_ROTATIONS,
  FINDER_PATTERN_SIZE,
} from '../constants'
import type {
  DataModulesSettings,
  FinderPatternInnerSettings,
  FinderPatternInnerStyle,
  FinderPatternOuterSettings,
  FinderPatternOuterStyle,
  GradientSettings,
  Modules,
} from '../types'
import {
  bottomLeftRounded,
  bottomRightRounded,
  bottomRounded,
  circle,
  circuitBoardPad,
  circuitBoardShouldDrawPad,
  dataModuleCanBeRandomSize,
  diamond,
  getModuleNeighbours,
  getRenderableDataModuleNeighbours,
  getScaleFactor,
  leaf,
  leftRounded,
  rect,
  rightRounded,
  roundedDataModule,
  square,
  topLeftRounded,
  topRightRounded,
  topRounded,
} from './data-modules'
import { isFinderPatternInnerModule } from './finder-patterns-inner'
import {
  finderPatternsInnerInOutPoint,
  finderPatternsInnerLeaf,
} from './finder-patterns-inner'
import { isFinderPatternOuterModule } from './finder-patterns-outer'
import {
  finderPatternsOuterInOutPoint,
  finderPatternsOuterLeaf,
  finderPatternsOuterRoundedSquare,
} from './finder-patterns-outer'
import {
  sanitizeDataModulesSettings,
  sanitizeFinderPatternInnerSettings,
  sanitizeFinderPatternOuterSettings,
} from './settings'
import { hashtag, heart, microchip, pinchedSquare, star } from './svg'

export type SvgElementDescriptor =
  | {
      type: 'path'
      d: string
      fill: string
      style?: Record<string, string>
      shapeRendering?: 'crispEdges' | 'geometricPrecision'
    }
  | {
      type: 'rect'
      x: number
      y: number
      width: number
      height: number
      fill: string
      rx?: number
      style?: Record<string, string>
    }

type PathDescriptor = Extract<SvgElementDescriptor, { type: 'path' }>
type FinderPatternOuterDirectionalStyle = Extract<
  FinderPatternOuterStyle,
  keyof typeof FINDER_PATTERN_OUTER_ROTATIONS
>
type FinderPatternInnerRoundedStyle = Extract<
  FinderPatternInnerStyle,
  keyof typeof FINDER_PATTERN_INNER_RADIUSES
>
type FinderPatternInnerDirectionalStyle = Extract<
  FinderPatternInnerStyle,
  keyof typeof FINDER_PATTERN_OUTER_ROTATIONS
>

const paint = (
  gradient: GradientSettings | undefined,
  gradientId: string,
  color: string,
) => (gradient ? `url(#${gradientId})` : color)

export const createDataModulesPath = ({
  modules,
  margin,
  settings,
  valueSeed,
}: {
  modules: Modules
  margin: number
  settings?: DataModulesSettings
  valueSeed: string
}) => {
  const { style, randomSize, size: moduleSize, lineWidth } =
    sanitizeDataModulesSettings(settings)
  const ops: string[] = []
  const numCells = modules.length
  const isRandom = dataModuleCanBeRandomSize(style) && randomSize

  modules.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (
        !cell ||
        isFinderPatternOuterModule({ x, y, numCells }) ||
        isFinderPatternInnerModule({ x, y, numCells })
      ) {
        return
      }

      const scale = getScaleFactor({
        style,
        isRandom,
        size: moduleSize,
        x,
        y,
        seed: valueSeed,
      })
      const size = scale
      const posOffset = (1 - scale) / 2
      const baseX = x + margin
      const baseY = y + margin
      const xPos = baseX + posOffset
      const yPos = baseY + posOffset
      const lwOffset = (1 - lineWidth) / 2

      if (style === 'circuit-board') {
        const cx = baseX + 0.5
        const cy = baseY + 0.5
        const traceHalf = lineWidth / 2
        const traceLength = 1 + lineWidth
        const neighbours = getRenderableDataModuleNeighbours(x, y, modules, numCells)

        if (neighbours.right) ops.push(rect(cx - traceHalf, cy - traceHalf, traceLength, lineWidth))
        if (neighbours.bottom) ops.push(rect(cx - traceHalf, cy - traceHalf, lineWidth, traceLength))
        if (neighbours.count === 0) {
          ops.push(square(baseX + 0.125, baseY + 0.125, 0.75))
        } else if (circuitBoardShouldDrawPad(neighbours)) {
          ops.push(circuitBoardPad(cx, cy, CIRCUIT_BOARD_PAD_RADIUS))
        }
      } else if (style === 'square' || style === 'square-sm') {
        ops.push(square(xPos, yPos, size))
      } else if (style === 'pinched-square') {
        ops.push(pinchedSquare(xPos, yPos, size, 0.25))
      } else if (style === 'circle') {
        ops.push(circle(xPos, yPos, size))
      } else if (style === 'diamond') {
        ops.push(diamond(xPos, yPos, size))
      } else if (style === 'star') {
        ops.push(star(xPos + size / 2, yPos + size / 2, size * 1.1, DEFAULT_NUM_STAR_POINTS))
      } else if (style === 'heart') {
        ops.push(heart(xPos, yPos, size))
      } else if (style === 'hashtag') {
        ops.push(hashtag(xPos, yPos, size))
      } else if (style === 'rounded') {
        const neighbours = getModuleNeighbours(x, y, modules)
        const { left, right, top, bottom, count } = neighbours

        if (lineWidth === 1) {
          if (count === 0) ops.push(circle(xPos, yPos, 1))
          else if (count > 2 || (left && right) || (top && bottom)) ops.push(square(xPos, yPos, 1))
          else if (count === 2) {
            if (left && top) ops.push(bottomRightRounded(xPos, yPos))
            else if (top && right) ops.push(bottomLeftRounded(xPos, yPos))
            else if (right && bottom) ops.push(topLeftRounded(xPos, yPos))
            else ops.push(topRightRounded(xPos, yPos))
          } else if (top) ops.push(bottomRounded(xPos, yPos))
          else if (right) ops.push(leftRounded(xPos, yPos))
          else if (bottom) ops.push(topRounded(xPos, yPos))
          else ops.push(rightRounded(xPos, yPos))
        } else {
          ops.push(roundedDataModule(baseX, baseY, lineWidth, neighbours))
        }
      } else if (style === 'leaf') {
        const { left, right, top, bottom, count } = getModuleNeighbours(x, y, modules)

        if (count === 0) ops.push(leaf(xPos, yPos, size))
        else if (!left && !top) ops.push(topLeftRounded(xPos, yPos))
        else if (!right && !bottom) ops.push(bottomRightRounded(xPos, yPos))
        else ops.push(square(xPos, yPos, 1))
      } else if (style === 'vertical-line') {
        const { left, right, top, bottom, count } = getModuleNeighbours(x, y, modules)

        if (count === 0 || (left && !(top || bottom)) || (right && !(top || bottom))) {
          ops.push(circle(baseX + lwOffset, baseY + lwOffset, lineWidth))
        } else if (top && bottom) {
          ops.push(rect(baseX + lwOffset, baseY, lineWidth, 1))
        } else if (top && !bottom) {
          ops.push(bottomRounded(baseX, baseY, lineWidth))
        } else if (bottom && !top) {
          ops.push(topRounded(baseX, baseY, lineWidth))
        }
      } else if (style === 'horizontal-line') {
        const { left, right, top, bottom, count } = getModuleNeighbours(x, y, modules)

        if (count === 0 || (top && !(left || right)) || (bottom && !(left || right))) {
          ops.push(circle(baseX + lwOffset, baseY + lwOffset, lineWidth))
        } else if (left && right) {
          ops.push(rect(baseX, baseY + lwOffset, 1, lineWidth))
        } else if (left && !right) {
          ops.push(rightRounded(baseX, baseY, lineWidth))
        } else if (right && !left) {
          ops.push(leftRounded(baseX, baseY, lineWidth))
        }
      }
    })
  })

  return ops.join('')
}

export const createDataModulesDescriptor = ({
  modules,
  margin,
  settings,
  gradient,
  gradientId,
  valueSeed,
}: {
  modules: Modules
  margin: number
  settings?: DataModulesSettings
  gradient?: GradientSettings
  gradientId: string
  valueSeed: string
}): PathDescriptor => {
  const { color, style } = sanitizeDataModulesSettings(settings)
  return {
    type: 'path',
    fill: paint(gradient, gradientId, color),
    d: createDataModulesPath({ modules, margin, settings, valueSeed }),
    shapeRendering: style === 'square' ? 'crispEdges' : 'geometricPrecision',
  }
}

export const createFinderPatternOuterDescriptors = ({
  modules,
  margin,
  settings,
  gradient,
  gradientId,
}: {
  modules: Modules
  margin: number
  settings?: FinderPatternOuterSettings
  gradient?: GradientSettings
  gradientId: string
}): SvgElementDescriptor[] => {
  const { style, color } = sanitizeFinderPatternOuterSettings(settings)
  const fill = paint(gradient, gradientId, color)
  const coordinates = [
    { x: margin, y: margin },
    { x: modules.length + margin - FINDER_PATTERN_SIZE, y: margin },
    { x: margin, y: modules.length + margin - FINDER_PATTERN_SIZE },
  ]

  if (['rounded-sm', 'rounded', 'rounded-lg', 'circle', 'square', 'pinched-square'].includes(style)) {
    const ops = coordinates.map(({ x, y }) => {
      if (style === 'rounded-sm' || style === 'rounded' || style === 'rounded-lg') {
        return finderPatternsOuterRoundedSquare({
          x,
          y,
          radius: FINDER_PATTERN_OUTER_RADIUSES[style],
        })
      }
      if (style === 'circle') {
        return (
          `M ${x + FINDER_PATTERN_SIZE / 2} ${y}` +
          `a ${FINDER_PATTERN_SIZE / 2} ${FINDER_PATTERN_SIZE / 2} 0 1 0 0.01 0z` +
          'z' +
          'm 0 1' +
          `a ${FINDER_PATTERN_SIZE / 2 - 1} ${FINDER_PATTERN_SIZE / 2 - 1} 0 1 1 -0.01 0` +
          'Z'
        )
      }
      if (style === 'pinched-square') {
        const pinch = 0.5
        const inner = 1.25
        return (
          `M ${x} ${y}` +
          `Q ${x + pinch} ${y + FINDER_PATTERN_SIZE / 2}, ${x} ${y + FINDER_PATTERN_SIZE}` +
          `Q ${x + FINDER_PATTERN_SIZE / 2} ${y + FINDER_PATTERN_SIZE - pinch}, ${x + FINDER_PATTERN_SIZE} ${y + FINDER_PATTERN_SIZE}` +
          `Q ${x + FINDER_PATTERN_SIZE - pinch} ${y + FINDER_PATTERN_SIZE / 2}, ${x + FINDER_PATTERN_SIZE} ${y}` +
          `Q ${x + FINDER_PATTERN_SIZE / 2} ${y + pinch}, ${x} ${y}` +
          'z' +
          `M ${x + 1} ${y + 1}` +
          `Q ${x + FINDER_PATTERN_SIZE / 2} ${y + inner}, ${x + FINDER_PATTERN_SIZE - 1} ${y + 1}` +
          `Q ${x + FINDER_PATTERN_SIZE - inner} ${y + FINDER_PATTERN_SIZE / 2}, ${x + FINDER_PATTERN_SIZE - 1} ${y + FINDER_PATTERN_SIZE - 1}` +
          `Q ${x + FINDER_PATTERN_SIZE / 2} ${y + FINDER_PATTERN_SIZE - inner}, ${x + 1} ${y + FINDER_PATTERN_SIZE - 1}` +
          `Q ${x + inner} ${y + FINDER_PATTERN_SIZE / 2}, ${x + 1} ${y + 1}` +
          'z'
        )
      }
      return (
        `M ${x} ${y}` +
        `v ${FINDER_PATTERN_SIZE}` +
        `h ${FINDER_PATTERN_SIZE}` +
        `v ${-FINDER_PATTERN_SIZE}` +
        'z' +
        `M ${x + 1} ${y + 1}` +
        `h ${FINDER_PATTERN_SIZE - 2}` +
        `v ${FINDER_PATTERN_SIZE - 2}` +
        `h ${-FINDER_PATTERN_SIZE + 2}` +
        'z'
      )
    })

    return [{ type: 'path', fill, d: ops.join('') }]
  }

  const pathFn = style.startsWith('leaf') ? finderPatternsOuterLeaf : finderPatternsOuterInOutPoint
  const directionalStyle = style as FinderPatternOuterDirectionalStyle
  return coordinates.map((coordinate, index) => ({
    type: 'path',
    fill,
    d: pathFn({ ...coordinate, radius: FINDER_PATTERN_OUTER_RADIUSES[directionalStyle] }),
    style: rotateStyle(FINDER_PATTERN_OUTER_ROTATIONS[directionalStyle][index]),
  }))
}

export const createFinderPatternInnerDescriptors = ({
  modules,
  margin,
  settings,
  gradient,
  gradientId,
}: {
  modules: Modules
  margin: number
  settings?: FinderPatternInnerSettings
  gradient?: GradientSettings
  gradientId: string
}): SvgElementDescriptor[] => {
  const { color, style } = sanitizeFinderPatternInnerSettings(settings)
  const fill = paint(gradient, gradientId, color)
  const coordinates = [
    { x: margin + 2, y: margin + 2 },
    { x: modules.length + margin - FINDER_PATTERN_SIZE + 2, y: margin + 2 },
    { x: margin + 2, y: modules.length + margin - FINDER_PATTERN_SIZE + 2 },
  ]

  if (['rounded-sm', 'rounded', 'rounded-lg', 'circle', 'square'].includes(style)) {
    const roundedStyle = style as FinderPatternInnerRoundedStyle
    return coordinates.map(({ x, y }) => ({
      type: 'rect',
      x,
      y,
      width: FINDER_PATTERN_INNER_SIZE,
      height: FINDER_PATTERN_INNER_SIZE,
      fill,
      rx: FINDER_PATTERN_INNER_RADIUSES[roundedStyle],
    }))
  }

  if (style === 'pinched-square') {
    return coordinates.map(({ x, y }) => ({
      type: 'path',
      fill,
      d: pinchedSquare(x, y, FINDER_PATTERN_INNER_SIZE, 0.25),
    }))
  }

  if (style === 'diamond') {
    return coordinates.map(({ x, y }) => {
      const sizeDiff = Math.sqrt(1.5)
      const size = FINDER_PATTERN_INNER_SIZE / sizeDiff
      const posDiff = size - size / sizeDiff
      return {
        type: 'rect',
        x: x + posDiff / 2,
        y: y + posDiff / 2,
        width: size,
        height: size,
        fill,
        style: rotateStyle(45),
      }
    })
  }

  if (
    style === 'inpoint-sm' ||
    style === 'inpoint' ||
    style === 'inpoint-lg' ||
    style === 'outpoint-sm' ||
    style === 'outpoint' ||
    style === 'outpoint-lg' ||
    style === 'leaf-sm' ||
    style === 'leaf' ||
    style === 'leaf-lg'
  ) {
    const pathFn = style.startsWith('leaf') ? finderPatternsInnerLeaf : finderPatternsInnerInOutPoint
    const directionalStyle = style as FinderPatternInnerDirectionalStyle
    return coordinates.map((coordinate, index) => ({
      type: 'path',
      fill,
      d: pathFn({ ...coordinate, radius: FINDER_PATTERN_INNER_RADIUSES[directionalStyle] }),
      style: rotateStyle(FINDER_PATTERN_OUTER_ROTATIONS[directionalStyle][index]),
    }))
  }

  if (style === 'heart') {
    return coordinates.map(({ x, y }) => ({
      type: 'path',
      fill,
      d: heart(x, y, FINDER_PATTERN_INNER_SIZE),
    }))
  }

  if (style === 'star') {
    return coordinates.map(({ x, y }) => ({
      type: 'path',
      fill,
      d: star(
        x + FINDER_PATTERN_INNER_SIZE / 2,
        y + FINDER_PATTERN_INNER_SIZE / 2,
        FINDER_PATTERN_INNER_SIZE * 1.2,
        DEFAULT_NUM_STAR_POINTS,
      ),
    }))
  }

  if (style === 'microchip') {
    return coordinates.map(({ x, y }) => ({
      type: 'path',
      fill,
      d: microchip(x, y, FINDER_PATTERN_INNER_SIZE),
    }))
  }

  return coordinates.map(({ x, y }) => ({
    type: 'path',
    fill,
    d: hashtag(x - 0.25, y - 0.25, 3.5),
  }))
}

const rotateStyle = (rotation: number) => ({
  transform: `rotate(${rotation}deg)`,
  transformOrigin: 'center',
  transformBox: 'fill-box',
})
