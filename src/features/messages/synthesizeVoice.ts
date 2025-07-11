import { reduceTalkStyle } from "@/utils/reduceTalkStyle";
import { TalkStyle } from "../messages/messages";
import { create_query } from "@/features/avisspeech/aivisSpeach";

export async function synthesizeVoiceApi(
  message: string,
  //speakerX: number,
  //speakerY: number,
  style: TalkStyle,
  //apiKey: string
) {
  // Free向けに感情を制限する
  //const reducedStyle = reduceTalkStyle(style);
  const speaker_id = 888753761; // あとで環境変数にする
  //const req_query = await create_query(message, speaker_id);

  const body = {
    message: message,
    //speakerX: speakerX,
    //speakerY: speakerY,
    style: speaker_id,
    //apiKey: apiKey,
  };

  const res = await fetch("/api/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.blob();

  return { audio: data };
}
