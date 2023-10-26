import HTMLtoDOCX from "html-to-docx";
import { saveAs } from "file-saver";

const generate_docx = async (question, answer, filename) => {
  const lineBreak = document.createElement("br");

  // Preparing The Question Body
  const questionDiv = document.createElement("div");
  const questionTitle = document.createElement("h5");
  questionTitle.innerText = "Question:";
  questionDiv.appendChild(questionTitle);
  questionDiv.appendChild(lineBreak);
  questionDiv.insertAdjacentHTML("beforeend", question);

  // Preparing The Answer Body
  const answerDiv = document.createElement("div");
  const answerTitle = document.createElement("h5");
  answerTitle.innerText = "Answer:";
  answerDiv.appendChild(answerTitle);
  answerDiv.appendChild(lineBreak);
  answerDiv.insertAdjacentHTML("beforeend", answer);

  // Merging Answer & Question Body
  const docHtml = document.createElement("html");
  const docBody = document.createElement("body");

  docHtml.appendChild(docBody);
  docBody.appendChild(questionDiv);
  docBody.appendChild(lineBreak);
  docBody.appendChild(answerDiv);

  const docImages = docHtml.getElementsByTagName("img");
  let dataUri = "";

  // replacing imaging source of s3 link with base64 data
  for (let i = 0; i < docImages.length; i++) {
    let img = docImages[i];
    dataUri = await wrapper_base64(img.src.replace("https", "http"));
    img.setAttribute("src", dataUri);
  }
  await download(docHtml.innerHTML, filename);
};

const download = async (content, filename) => {
  // configurations/styles of the docx file
  const docx_config = {
    font: "Georgia",
  };
  // data of the file
  const data = await HTMLtoDOCX(content, null, docx_config);
  saveAs(data, filename + ".docx");
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const wrapper_base64 = async (imageUrl) => {
  // fetches image and converts to base64
  try {
    let res = await fetch(imageUrl, { method: "GET" });
    res = await res.blob();
    const promise = await toBase64(res);
    return promise;
  } catch (error) {
    console.log(error);
  }
};

export { generate_docx, download, toBase64, wrapper_base64 };
