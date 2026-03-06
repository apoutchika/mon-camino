// Value Object: Photo (peut aussi être une vidéo)
export class Photo {
  private constructor(
    public readonly type: "photo" | "video",
    public readonly src: string,
    public readonly alt: string,
    public readonly caption?: string,
    public readonly width?: number,
    public readonly height?: number,
    public readonly poster?: string, // Pour les vidéos : image de prévisualisation
    public readonly duration?: number // Pour les vidéos : durée en secondes
  ) {}

  static create(
    src: string,
    alt: string,
    type: "photo" | "video" = "photo",
    caption?: string,
    width?: number,
    height?: number,
    poster?: string,
    duration?: number
  ): Photo {
    if (!src.trim()) {
      throw new Error("Photo/Video src cannot be empty");
    }
    return new Photo(type, src, alt, caption, width, height, poster, duration);
  }

  static fromPlain(data: {
    type?: "photo" | "video";
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
    poster?: string;
    duration?: number;
  }): Photo {
    return Photo.create(
      data.src,
      data.alt,
      data.type || "photo",
      data.caption,
      data.width,
      data.height,
      data.poster,
      data.duration
    );
  }

  isVideo(): boolean {
    return this.type === "video";
  }

  isPhoto(): boolean {
    return this.type === "photo";
  }

  hasCaption(): boolean {
    return !!this.caption;
  }

  hasDimensions(): boolean {
    return this.width !== undefined && this.height !== undefined;
  }

  hasPoster(): boolean {
    return !!this.poster;
  }
}
