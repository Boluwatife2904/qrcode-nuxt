import type { DataModulesNeighbours, DataModulesStyle, Modules } from '../types'
import { isFinderPatternInnerModule } from './finder-patterns-inner'
import { isFinderPatternOuterModule } from './finder-patterns-outer'

export const dataModuleCanBeRandomSize = (style: DataModulesStyle): boolean =>
  style === 'square' ||
  style === 'pinched-square' ||
  style === 'circle' ||
  style === 'star' ||
  style === 'heart' ||
  style === 'diamond' ||
  style === 'hashtag'

export const getScaleFactor = ({
  style,
  isRandom,
  size = 1,
  x,
  y,
  seed,
}: {
  style: string
  isRandom: boolean
  size?: number
  x: number
  y: number
  seed: string
}) => {
  if (style === 'square-sm') {
    return 0.75
  } else if (isRandom) {
    return deterministicRandom(`${seed}:${x}:${y}`) * 0.25 + 0.75
  } else if (dataModuleCanBeRandomSize(style as DataModulesStyle)) {
    return size
  }
  return 1
}

const deterministicRandom = (input: string) => {
  let hash = 2166136261
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0) / 4294967295
}

export const getModuleNeighbours = (
  x: number,
  y: number,
  modules: Modules,
): DataModulesNeighbours => {
  const sides = {
    left: x === 0 ? false : modules[y][x - 1],
    right: x === modules[y].length - 1 ? false : modules[y][x + 1],
    top: y === 0 ? false : modules[y - 1][x],
    bottom: y === modules.length - 1 ? false : modules[y + 1][x],
  }

  return {
    ...sides,
    count: Object.values(sides).filter(Boolean).length,
  }
}

export const isRenderableDataModule = ({
  x,
  y,
  modules,
  numCells,
}: {
  x: number
  y: number
  modules: Modules
  numCells: number
}) => {
  return (
    y >= 0 &&
    y < modules.length &&
    x >= 0 &&
    x < modules[y].length &&
    modules[y][x] &&
    !isFinderPatternOuterModule({ x, y, numCells }) &&
    !isFinderPatternInnerModule({ x, y, numCells })
  )
}

export const getRenderableDataModuleNeighbours = (
  x: number,
  y: number,
  modules: Modules,
  numCells: number,
): DataModulesNeighbours => {
  const sides = {
    left: isRenderableDataModule({ x: x - 1, y, modules, numCells }),
    right: isRenderableDataModule({ x: x + 1, y, modules, numCells }),
    top: isRenderableDataModule({ x, y: y - 1, modules, numCells }),
    bottom: isRenderableDataModule({ x, y: y + 1, modules, numCells }),
  }

  return {
    ...sides,
    count: Object.values(sides).filter(Boolean).length,
  }
}

export const rect = (x: number, y: number, width: number, height: number) =>
  `M${x},${y}h${width}v${height}h${-width}Z`

export const square = (x: number, y: number, size: number) => rect(x, y, size, size)

export const circle = (x: number, y: number, size: number) =>
  `M${x},${y + size / 2}a${size / 2},${size / 2} 0 1,0 ${size},0a${size / 2},${size / 2} 0 1,0 -${size},0Z`

export const diamond = (x: number, y: number, size: number) =>
  `M${x},${y + size / 2}l${size / 2},-${size / 2}l${size / 2},${size / 2}l-${size / 2},${size / 2}Z`

export const circuitBoardPad = (cx: number, cy: number, radius: number) =>
  `M${cx - radius},${cy}a${radius},${radius} 0 1,1 ${radius * 2},0a${radius},${radius} 0 1,1 ${-radius * 2},0Z`

export const circuitBoardShouldDrawPad = ({ count }: DataModulesNeighbours) => count === 1

export const topRightRounded = (x: number, y: number) =>
  `M ${x} ${y} v 1 h 1 v -0.5 a 0.5 0.5, 0, 0, 0, -0.5 -0.5`

export const topLeftRounded = (x: number, y: number) =>
  `M ${x + 1} ${y} v 1 h -1 v -0.5 a 0.5 0.5, 0, 0, 1, 0.5 -0.5`

export const bottomRightRounded = (x: number, y: number) =>
  `M ${x} ${y} v 1 h 0.5 a 0.5 0.5, 0, 0, 0, 0.5 -0.5 v -0.5 h -1`

export const bottomLeftRounded = (x: number, y: number) =>
  `M ${x + 1} ${y} v 1 h -0.5 a 0.5 0.5, 0, 0, 1, -0.5 -0.5 v -0.5 h 1`

export const rightRounded = (x: number, y: number, w = 1) => {
  const cy = y + 0.5
  const r = w / 2
  const straight = 1 - r
  return `M ${x} ${cy - r} v ${w} h ${straight} a ${r} ${r}, 0, 0, 0, 0 -${w}`
}

export const leftRounded = (x: number, y: number, w = 1) => {
  const cy = y + 0.5
  const r = w / 2
  const straight = 1 - r
  return `M ${x + 1} ${cy - r} v ${w} h -${straight} a ${r} ${r}, 0, 0, 1, 0 -${w}`
}

export const topRounded = (x: number, y: number, w = 1) => {
  const cx = x + 0.5
  const r = w / 2
  const straight = 1 - r
  return `M ${cx - r} ${y + 1} h ${w} v -${straight} a ${r} ${r}, 0, 0, 0, -${w} 0`
}

export const bottomRounded = (x: number, y: number, w = 1) => {
  const cx = x + 0.5
  const r = w / 2
  const straight = 1 - r
  return `M ${cx - r} ${y} h ${w} v ${straight} a ${r} ${r}, 0, 0, 1, -${w} 0`
}

export const roundedDataModule = (
  x: number,
  y: number,
  lw: number,
  neighbours: Omit<DataModulesNeighbours, 'count'>,
) => {
  const { left, right, top, bottom } = neighbours
  const cx = x + 0.5
  const cy = y + 0.5
  const r = lw / 2

  const tlExpanded = !top && !left
  const trExpanded = !top && !right
  const brExpanded = !bottom && !right
  const blExpanded = !bottom && !left

  const topY = top ? y : cy - r
  const rightX = right ? x + 1 : cx + r
  const bottomY = bottom ? y + 1 : cy + r
  const leftX = left ? x : cx - r

  const segments: string[] = [`M ${tlExpanded ? cx : cx - r} ${topY}`]
  segments.push(`L ${trExpanded ? cx : cx + r} ${topY}`)
  if (trExpanded) segments.push(`A ${r} ${r} 0 0 1 ${cx + r} ${cy}`)
  else if (top && right) segments.push(`L ${cx + r} ${cy - r} L ${x + 1} ${cy - r}`)
  else if (top) segments.push(`L ${cx + r} ${cy - r}`)
  else if (right) segments.push(`L ${x + 1} ${cy - r}`)

  segments.push(`L ${rightX} ${brExpanded ? cy : cy + r}`)
  if (brExpanded) segments.push(`A ${r} ${r} 0 0 1 ${cx} ${cy + r}`)
  else if (right && bottom) segments.push(`L ${cx + r} ${cy + r} L ${cx + r} ${y + 1}`)
  else if (right) segments.push(`L ${cx + r} ${cy + r}`)
  else if (bottom) segments.push(`L ${cx + r} ${y + 1}`)

  segments.push(`L ${blExpanded ? cx : cx - r} ${bottomY}`)
  if (blExpanded) segments.push(`A ${r} ${r} 0 0 1 ${cx - r} ${cy}`)
  else if (bottom && left) segments.push(`L ${cx - r} ${cy + r} L ${x} ${cy + r}`)
  else if (bottom) segments.push(`L ${cx - r} ${cy + r}`)
  else if (left) segments.push(`L ${x} ${cy + r}`)

  segments.push(`L ${leftX} ${tlExpanded ? cy : cy - r}`)
  if (tlExpanded) segments.push(`A ${r} ${r} 0 0 1 ${cx} ${cy - r}`)
  else if (left && top) segments.push(`L ${cx - r} ${cy - r} L ${cx - r} ${y}`)
  else if (left) segments.push(`L ${cx - r} ${cy - r}`)
  else if (top) segments.push(`L ${cx - r} ${y}`)
  segments.push('Z')
  return segments.join(' ')
}

export const leaf = (x: number, y: number, size: number) => {
  return (
    `M ${x + 1} ${y}` +
    `h -${size / 2}` +
    `a ${size / 2.5} ${size / 2.5}, 0, 0, 0, ${-size / 2.5} ${size / 2.5}` +
    `v ${size / 2}` +
    `h ${size / 2}` +
    `a ${size / 2.5} ${size / 2.5}, 0, 0, 0, ${size / 2.5} ${-size / 2.5}` +
    'Z'
  )
}
