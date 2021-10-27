export default class BinaryReader {
  private idx = 0

  constructor(private data: Buffer) {}

  setPos(idx: number) {
    this.idx = idx
  }

  readByte(): number {
    return this.data.readUInt8(this.idx++)
  }

  readShort(): number {
    const res = this.data.readInt16BE(this.idx)
    this.idx += 2
    return res
  }

  readInt(): number {
    const res = this.data.readInt32BE(this.idx)
    this.idx += 4
    return res
  }

  readUInt(): number {
    const res = this.data.readUInt32BE(this.idx)
    this.idx += 4
    return res
  }
}
