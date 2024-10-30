
import { ConformeType } from "@mapstudio/utils/enums"

export type Conforme = {
    type: typeof ConformeType[number];
    firstName: string,
    middleName: string,
    lastName: string,
    extension: string,
}

export type Representative = {
    relationship: string,
    firstName: string,
    middleName: string,
    lastName: string,
    extension: string
}

export type UploadedFile = {
    id: string;
    name: string;
    fileName: string;
    url: string;
}
