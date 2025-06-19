import { avisspeechV1 } from "@/features/avisspeech/aivisSpeach";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = Buffer;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const message = req.body.message;
  //const speakerX = req.body.speakerX;
  //const speakerY = req.body.speakerY;
  const speaker_id = 888753761; //あとで環境変数にする
  //const apiKey = req.body.apiKey;

  const voice = await avisspeechV1(
    message,
    //speakerX,
    //speakerY,
    speaker_id,
    //apiKey
  );

  const response = voice.avisRes;
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  res.setHeader("Content-Type", "audio/wav"); // 必要に応じて変更
  res.status(200).send(buffer);
}
