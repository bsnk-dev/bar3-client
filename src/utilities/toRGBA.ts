export default function toRGBA(rgb: string, alpha: number) {
  return rgb.substring(0, rgb.length - 1) + `,${alpha})`;
}