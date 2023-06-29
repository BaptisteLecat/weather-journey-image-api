import { Injectable } from '@nestjs/common';
import { Midjourney } from 'midjourney';
import { GeneratedImage } from '../entities/generated-image.entities';

@Injectable()
export class ImageGeneratorService {

    async generateImage(prompt: string) {
        const client = new Midjourney({
            ServerId: process.env.DISCORD_SERVER_ID,
            ChannelId: process.env.DISCORD_CHANNEL_ID,
            SalaiToken: process.env.DISCORD_SALAI_TOKEN,
            Debug: false,
            Ws: true,
        });
        await client.init();
        await client.Fast();
        //add --aspect 4:7 to the prompt string.
        prompt = prompt + " --aspect 4:7";
        const msg = await client.Imagine(prompt, (uri: string, progress: string) => {
            console.log("loading", uri, "progress", progress);
        });
        if (!msg || !msg.id || !msg.hash || !msg.content) {
            console.log("no message");
            return;
        }
        const upscaleResult = await client.Upscale({
            index: 1, msgId: msg.id, hash: msg.hash, content: msg.content, flags: 0, loading: (uri: string, progress: string) => {
                console.log("loading", uri, "progress", progress);
            }
        });
        console.log(upscaleResult);
        client.Close();
        return GeneratedImage.fromJSON(upscaleResult);
    }
}
