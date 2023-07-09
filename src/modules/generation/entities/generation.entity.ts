import { Timestamp } from "@google-cloud/firestore";
import { GeneratedImage } from "./generated-image.entities";

export class Generation {
  id: string;
  generatedImage?: GeneratedImage;
  progress: number;
  prompt: string;
  createdAt: Timestamp;

  public constructor(id: string, generatedImage: GeneratedImage | null, progress: number = 0, prompt: string, createdAt: Timestamp = Timestamp.now()) {
    this.id = id;
    this.generatedImage = generatedImage;
    this.progress = progress;
    this.prompt = prompt;
    this.createdAt = createdAt;
  }

  static fromFirestoreDocument(id: any, data: any): Generation {
    return new Generation(id, data.generatedImage, data.progress, data.prompt, data.createdAt);
  }

  static fromJson(data: any): Generation {
    return new Generation(data.id, data.generatedImage, data.progress, data.prompt, data.createdAt);
  }

  toFirestoreDocument(): any {
    return {
      id: this.id,
      generatedImage: (this.generatedImage == null) ? null : this.generatedImage.toJSON(),
      progress: this.progress,
      prompt: this.prompt,
      createdAt: this.createdAt
    };
  }

  toJson(): any {
    return {
      id: this.id,
      generatedImage: (this.generatedImage == null) ? null : this.generatedImage.toJSON(),
      progress: this.progress,
      prompt: this.prompt,
      createdAt: this.createdAt
    };
  }
}
