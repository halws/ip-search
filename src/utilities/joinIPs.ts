export function joinIPs(rawIPs: string) {
  return rawIPs
    .replace(/ /g, '')
    .split(',')
    .map(ip => ip.replace(/ /g, ''))
}
