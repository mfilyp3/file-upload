import { FileUpload } from "../../components/FileUpload";
import { Container, Content } from "./styles";
import { FilesList } from "../../components/FilesList";
import { useState } from "react";
import filesize from "filesize";
import { v4 as uuid } from "uuid";
import { IFileUploadProps } from "../../interfaces/IFileUpload.interface";

export function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<IFileUploadProps[]>([]);

  function handleUpload(files?: File[]): void {
    if (!files) return;

    const filesUploaded = files.map((file) => ({
      file,
      id: uuid(),
      name: file.name,
      readableSize: filesize(file.size),
      previewURL: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles((prev: any[]) => {
      return prev.concat(filesUploaded);
    });

    uploadedFiles.forEach();
  }

  function allProcessUpload(uploadedFile: IFileUploadProps) {
    const data = new FormData();
    data.append("file", uploadedFile.files, uploadedFile.name);

    // TODO Send to backend
  }

  return (
    <Container>
      <Content>
        <FileUpload onUpload={handleUpload} />
        {!!uploadedFiles.length && <FilesList files={uploadedFiles} />}
      </Content>
    </Container>
  );
}
