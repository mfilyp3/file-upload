import { FileUpload } from "../../components/FileUpload";
import { Container, Content } from "./styles";
import { FilesList } from "../../components/FilesList";
import { useState } from "react";
import filesize from "filesize";
import { v4 as uuid } from "uuid";
import { IFileUploadProps } from "../../interfaces/IFileUpload.interface";
import { api } from "../../services/api";

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

    uploadedFiles.forEach(allProcessUpload);
  }

  const updateProgressFiles = (id: string = "", payload: any) => {
    const newUploadedFiles = uploadedFiles.map((file) => {
      return id === file.id ? { ...file, ...payload } : file;
    });

    setUploadedFiles(newUploadedFiles);
  };

  function allProcessUpload(uploadedFile: IFileUploadProps) {
    if (uploadedFile.progress >= 100 || uploadedFile.uploaded) return;

    const data = new FormData();
    data.append("image", uploadedFile.file);

    api
      .post("3/image", data, {
        onUploadProgress: (e) => {
          const progress = Number(Math.round((e.loaded * 100) / e.total));
          updateProgressFiles(uploadedFile.id, { progress });
        },
      })
      .then((response) => {
        const {
          data: { data },
        } = response;

        updateProgressFiles(uploadedFile.id, {
          uploaded: true,
          id: data.id,
          url: data.link,
        });
      });
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
