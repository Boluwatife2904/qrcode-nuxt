import type {
  CalculatedImageSettings,
  DownloadFileFormat,
  ImageSettings,
} from '../types'

export const downloadSVG = ({
  svg,
  fileSize,
  fileName,
}: {
  svg: SVGSVGElement | null
  fileSize: number
  fileName: string
}) => {
  if (!svg || typeof document === 'undefined') return

  const clonedSvg = svg.cloneNode(true) as SVGSVGElement
  clonedSvg.setAttribute('width', fileSize.toString())
  clonedSvg.setAttribute('height', fileSize.toString())

  const serializer = new XMLSerializer()
  const svgBlob = new Blob([serializer.serializeToString(clonedSvg)], {
    type: 'image/svg+xml',
  })
  const url = URL.createObjectURL(svgBlob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName}.svg`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const downloadRaster = ({
  svg,
  fileSize,
  fileName,
  fileFormat,
  imageSettings,
  calculatedImageSettings,
  size,
  numCells,
  margin,
}: {
  svg: SVGSVGElement | null
  fileSize: number
  fileName: string
  fileFormat: DownloadFileFormat
  imageSettings: ImageSettings | undefined
  calculatedImageSettings: CalculatedImageSettings | null
  size: number
  numCells: number
  margin: number
}) => {
  if (!svg || typeof document === 'undefined') return

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = fileSize
  canvas.height = fileSize

  const svgData = new XMLSerializer().serializeToString(svg)
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob)

  const qrImg = new Image()
  qrImg.crossOrigin = 'anonymous'
  qrImg.src = svgUrl

  qrImg.onload = () => {
    ctx.drawImage(qrImg, 0, 0, fileSize, fileSize)
    URL.revokeObjectURL(svgUrl)

    if (imageSettings?.src && calculatedImageSettings) {
      const logoImg = new Image()
      logoImg.crossOrigin = imageSettings.crossOrigin || 'anonymous'
      logoImg.src = imageSettings.src

      logoImg.onload = () => {
        const ratio = fileSize / size
        const scale = numCells / fileSize

        const logoWidth = calculatedImageSettings.w / scale
        const logoHeight = calculatedImageSettings.h / scale
        const logoX =
          imageSettings.x != null
            ? (calculatedImageSettings.x + margin) / scale
            : (fileSize - imageSettings.width * ratio) / 2
        const logoY =
          imageSettings.y != null
            ? (calculatedImageSettings.y + margin) / scale
            : (fileSize - imageSettings.height * ratio) / 2

        ctx.globalAlpha = calculatedImageSettings.opacity
        ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight)
        ctx.globalAlpha = 1
        triggerRasterDownload(canvas, fileFormat, fileName)
      }
    } else {
      triggerRasterDownload(canvas, fileFormat, fileName)
    }
  }
}

const triggerRasterDownload = (
  canvas: HTMLCanvasElement,
  fileFormat: DownloadFileFormat,
  fileName: string,
) => {
  const imageType = fileFormat === 'png' ? 'image/png' : 'image/jpeg'
  const a = document.createElement('a')
  a.href = canvas.toDataURL(imageType)
  a.download = `${fileName}.${fileFormat}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
