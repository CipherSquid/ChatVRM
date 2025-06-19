import { Console } from "console";
import { TalkStyle } from "../messages/messages";

// speakerのプレロード（初回生成時高速化）
export async function init_speaker(
  speaker: number
) {
  
}

// 音声合成用のクエリを生成する
export async function create_query(
  message: string,
  speaker_id: number
) {
  const param = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  console.log("create_query called")
  const encoded_msg = encodeURIComponent(message);

  const avis_query = await fetch(
    "http://127.0.0.1:10101/audio_query?text="+encoded_msg+"&speaker="+speaker_id,
    param
  );

  const query = (await avis_query.json()) as any;

  return { query };
}

// 合成音声を生成する
export async function avisspeechV1(
  message: string,
  speaker_id: number
) {
  console.log("avisspeechV1 called")
  const req_query = await create_query(message, speaker_id);

  const param = {
    method: "POST",
    body: JSON.stringify(req_query.query),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "accept": "audio/wav",
    },
  };

  console.log(param)

  const avisRes = await fetch(
    "http://127.0.0.1:10101/synthesis?speaker="+speaker_id,
    param
  );

  console.log(avisRes.status)
  console.log(avisRes)

  //const data = avisRes.json();

  //console.log(data)

  return {avisRes};
}
