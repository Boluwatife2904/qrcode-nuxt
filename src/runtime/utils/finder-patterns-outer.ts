import { FINDER_PATTERN_OUTER_MASK, FINDER_PATTERN_SIZE } from '../constants'

export const isFinderPatternOuterModule = ({
  x,
  y,
  numCells,
}: {
  x: number
  y: number
  numCells: number
}): boolean => {
  return Boolean(
    FINDER_PATTERN_OUTER_MASK[x]?.[y] ||
      FINDER_PATTERN_OUTER_MASK[x - numCells + 7]?.[y] ||
      FINDER_PATTERN_OUTER_MASK[x]?.[y - numCells + 7],
  )
}

export const finderPatternsOuterRoundedSquare = ({
  x,
  y,
  radius,
}: {
  x: number
  y: number
  radius: number
}) => {
  const size = FINDER_PATTERN_SIZE - radius
  const arc = radius / 2
  return (
    `M ${x} ${y + arc}` +
    `v ${size}` +
    `a ${arc} ${arc}, 0, 0, 0, ${arc} ${arc}` +
    `h ${size}` +
    `a ${arc} ${arc}, 0, 0, 0, ${arc} ${-arc}` +
    `v ${-size}` +
    `a ${arc} ${arc}, 0, 0, 0, ${-arc} ${-arc}` +
    `h ${-size}` +
    `a ${arc} ${arc}, 0, 0, 0, ${-arc} ${arc}` +
    `M ${x + arc} ${y + 1}` +
    `h ${size}` +
    `a ${arc - 1} ${arc - 1}, 0, 0, 1, ${arc - 1} ${arc - 1}` +
    `v ${size}` +
    `a ${arc - 1} ${arc - 1}, 0, 0, 1, ${-(arc - 1)} ${arc - 1}` +
    `h ${-size}` +
    `a ${arc - 1} ${arc - 1}, 0, 0, 1, ${-(arc - 1)} ${-(arc - 1)}` +
    `v ${-size}` +
    `a ${arc - 1} ${arc - 1}, 0, 0, 1, ${arc - 1} ${-(arc - 1)}`
  )
}

export const finderPatternsOuterLeaf = ({
  x,
  y,
  radius,
}: {
  x: number
  y: number
  radius: number
}) => {
  const size = FINDER_PATTERN_SIZE - radius
  const arc = radius / 2
  const arcSize = FINDER_PATTERN_SIZE - arc
  return (
    `M ${x} ${y + arc}` +
    `v ${size}` +
    `a ${arc} ${arc}, 0, 0, 0, ${arc} ${arc}` +
    `h ${arcSize}` +
    `v ${-arcSize}` +
    `a ${arc} ${arc}, 0, 0, 0, ${-arc} ${-arc}` +
    `h ${-size}` +
    `H ${x}` +
    'z' +
    `M ${x + arc} ${y + 1}` +
    `h ${size}` +
    `a ${arc - 1} ${arc - 1}, 0, 0, 1, ${arc - 1} ${arc - 1}` +
    `v ${arcSize - 1}` +
    `h ${-(arcSize - 1)}` +
    `a ${arc - 1} ${arc - 1}, 0, 0, 1, ${-(arc - 1)} ${-(arc - 1)}` +
    `v ${-(arcSize - 1)}` +
    'z'
  )
}

export const finderPatternsOuterInOutPoint = ({
  x,
  y,
  radius,
}: {
  x: number
  y: number
  radius: number
}) => {
  const size = FINDER_PATTERN_SIZE - radius
  const arc = radius / 2
  const arcSize = FINDER_PATTERN_SIZE - arc
  return (
    `M ${x} ${y + arc}` +
    `v ${size}` +
    `a ${arc} ${arc}, 0, 0, 0, ${arc} ${arc}` +
    `h ${arcSize}` +
    `v ${-arcSize}` +
    `a ${arc} ${arc}, 0, 0, 0, ${-arc} ${-arc}` +
    `h ${-size}` +
    `a ${arc} ${arc}, 0, 0, 0, ${-arc} ${arc}` +
    `M ${x + arc} ${y + 1}` +
    `h ${size}` +
    `a ${arc - 1} ${arc - 1}, 0, 0, 1, ${arc - 1} ${arc - 1}` +
    `v ${arcSize - 1}` +
    `h ${-(arcSize - 1)}` +
    `a ${arc - 1} ${arc - 1}, 0, 0, 1, ${-(arc - 1)} ${-(arc - 1)}` +
    `v ${-size}` +
    `a ${arc - 1} ${arc - 1}, 0, 0, 1, ${arc - 1} ${-(arc - 1)}`
  )
}
