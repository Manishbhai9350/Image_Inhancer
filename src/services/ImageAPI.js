import Axios from "axios";

export const InhanceImage = async (File) => {
  try {
    const API_KEY = import.meta.env.VITE_pic_wish_api;
    const PicWishBaseUrl = import.meta.env.VITE_pic_wish_base_url;

    const form = new FormData();
    form.append("image_file", File, "image_file");

    const UploadedResult = await Axios.post(
      `${PicWishBaseUrl}/api/tasks/visual/scale`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": API_KEY,
        },
      }
    );

    const TaskId = UploadedResult?.data?.data?.task_id;
    if (!TaskId) throw new Error("Task ID missing, something went wrong.");

    console.log("Task submitted. ID:", TaskId);

    const FinalImage = await pollForImage(TaskId, API_KEY, PicWishBaseUrl);
    console.log("Final Image Result:", FinalImage);
    return FinalImage;
  } catch (error) {
    console.error("Enhance Image Error:", error);
  }
};

const pollForImage = async (TaskId, API_KEY, PicWishBaseUrl) => {
  const maxAttempts = 5;
  const interval = 3000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`Checking image status... Attempt ${attempt}`);
    const Result = await Axios.get(
      `${PicWishBaseUrl}/api/tasks/visual/scale/${TaskId}`,
      {
        headers: {
          "X-API-KEY": API_KEY,
        },
      }
    );

    const status = Result?.data?.data?.state_detail;
    if (status == "Complete") {
      console.log("Image processing complete.");
      return Result;
    }

    if (status !== "Processing") {
      throw new Error(`Unexpected state: ${status}`);
    }

    // Wait for 3 seconds before next attempt
    await new Promise((res) => setTimeout(res, interval));
  }

  throw new Error("Image processing timeout after multiple attempts.");
};



// {
//     "data": {
//         "status": 200,
//         "data": {
//             "completed_at": 1743943039,
//             "created_at": 1743943038,
//             "download_time": 0,
//             "image": "https://wxtechhk.oss-cn-hongkong.aliyuncs.com/tasks/output/scale/f1acd233-02e9-46f3-94ab-586138626208.png?x-oss-credential=LTAI5tGjJnh66c1txANiRBQN/20250406/cn-hongkong/oss/aliyun_v4_request&x-oss-date=20250406T123719Z&x-oss-expires=3600&x-oss-signature=c8c6888d09528ab6aac01ad6c90765cecebb309508db7baca6d9eb880819d4b8&x-oss-signature-version=OSS4-HMAC-SHA256",
//             "image_height": 1079,
//             "image_width": 1919,
//             "processed_at": 1743943038,
//             "progress": 100,
//             "return_type": 1,
//             "state": 1,
//             "state_detail": "Complete",
//             "task_id": "f1acd233-02e9-46f3-94ab-586138626208",
//             "time_elapsed": 637.8300170898438,
//             "type": "clean"
//         }
//     },
//     "status": 200,
//     "statusText": "OK",
//     "headers": {
//         "cache-control": "public,max-age=1",
//         "content-length": "710",
//         "content-type": "application/json"
//     },
//     "config": {
//         "transitional": {
//             "silentJSONParsing": true,
//             "forcedJSONParsing": true,
//             "clarifyTimeoutError": false
//         },
//         "adapter": [
//             "xhr",
//             "http",
//             "fetch"
//         ],
//         "transformRequest": [
//             null
//         ],
//         "transformResponse": [
//             null
//         ],
//         "timeout": 0,
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN",
//         "maxContentLength": -1,
//         "maxBodyLength": -1,
//         "env": {},
//         "headers": {
//             "Accept": "application/json, text/plain, */*",
//             "X-API-KEY": "wxipzr4p2v11o8m0b"
//         },
//         "method": "get",
//         "url": "https://techhk.aoscdn.com/api/tasks/visual/scale/f1acd233-02e9-46f3-94ab-586138626208",
//         "allowAbsoluteUrls": true
//     },
//     "request": {}
// }